'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { formatMemory } from '@/app/instance/new/_util/format';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Loader from '@/components/loader';

import { useApi } from '@/hooks/use-api';

import Api from '@/lib/api';
import Instance from '@/lib/api/type/schema/project/instance';
import { useProjectStore } from '@/lib/store/project';

import { format } from 'date-fns';

export default function Page() {
  const router = useRouter();

  const { project } = useProjectStore();

  const [isApi, startApi] = useApi();

  const [instances, setInstances] = useState<Instance[]>([]);

  useEffect(() => {
    if (!project) return;

    startApi(async () => {
      const { instances } = await Api.Domain.Project.Instance.Index.myInstances(project.id);
      setInstances(instances);
    });
  }, [project]);

  if (isApi || !project) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      <Link href="/instance/new" className="self-end">
        <Button size="lg">새 인스턴스 생성</Button>
      </Link>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead className="hidden xl:table-cell">인스턴스 ID</TableHead>
            <TableHead>생성일</TableHead>
            <TableHead className="hidden lg:table-cell">코어</TableHead>
            <TableHead className="hidden lg:table-cell">메모리</TableHead>
            <TableHead className="hidden lg:table-cell">스왑</TableHead>
            <TableHead className="hidden lg:table-cell">디스크</TableHead>
            <TableHead className="hidden lg:table-cell">IP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {instances.length > 0 ? (
            instances.map((instance) => (
              <TableRow
                key={instance.id}
                className="h-14 cursor-pointer"
                onClick={() => router.push(`/instance/${instance.id}`)}
              >
                <TableCell>{instance.name}</TableCell>
                <TableCell className="hidden xl:table-cell">{instance.id}</TableCell>
                <TableCell>
                  {format(new Date(instance.createdAt), 'yyyy년 MM월 dd일 HH:mm')}
                </TableCell>
                <TableCell className="hidden lg:table-cell">{instance.core}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatMemory(instance.memory)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatMemory(instance.swap)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">{instance.disk}GB</TableCell>
                <TableCell className="hidden lg:table-cell">{instance.ip}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={99} className="text-center text-neutral-500">
                인스턴스가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
