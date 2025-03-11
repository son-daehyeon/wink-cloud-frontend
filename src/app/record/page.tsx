'use client';

import { useEffect, useState } from 'react';

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
import Record from '@/lib/api/type/schema/record';
import { useModalStore } from '@/lib/store/modal';

import { RecordCreateProps } from '@/modals/record/create';
import { RecordUpdateProps } from '@/modals/record/update';

export default function RecordPage() {
  const [isApi, startApi] = useApi();

  const { open } = useModalStore();

  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    startApi(async () => {
      const { records } = await Api.Domain.Record.getRecords();
      setRecords(records);
    });
  }, []);

  if (isApi) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      <Button
        size="lg"
        className="self-end"
        onClick={() =>
          open<RecordCreateProps>('record:create', {
            onCreate: (record) => setRecords((prev) => [...prev, record]),
          })
        }
      >
        레코드 추가
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>종류</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>TTL</TableHead>
            <TableHead>레코드</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length > 0 ? (
            records.map((record) => (
              <TableRow
                key={record.id}
                className="h-14 cursor-pointer"
                onClick={() =>
                  open<RecordUpdateProps>('record:update', {
                    record,
                    onUpdate: (record) =>
                      setRecords((prev) => prev.map((p) => (p.id === record.id ? record : p))),
                    onDelete: (recordId) =>
                      setRecords((prev) => prev.filter((p) => p.id !== recordId)),
                  })
                }
              >
                <TableCell>{record.type}</TableCell>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.ttl}</TableCell>
                <TableCell className="whitespace-pre-line">{record.record.join('\n')}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={99} className="text-center text-neutral-500">
                레코드 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
