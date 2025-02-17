'use client';

import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useApiWithToast } from '@/hooks/use-api';

import Api from '@/lib/api';
import { CreateProjectRequest } from '@/lib/api/type/domain/project';
import Project from '@/lib/api/type/schema/project';
import { useProjectStore } from '@/lib/store/project';

import { IconSelector } from '@/modals/project/new';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';

export default function GeneralSetting() {
  const [isApi, startApi] = useApiWithToast();

  const { project, setProject } = useProjectStore();

  const [iconSelectOpen, setIconSelectOpen] = useState(false);

  const [icon, setIcon] = useState('box');
  const [name, setName] = useState('');

  const onSave = useCallback((project: Project, values: CreateProjectRequest) => {
    startApi(
      async () => {
        const { project: _project } = await Api.Domain.Project.Index.updateProject(
          project.id,
          values,
        );
        setProject(_project);
      },
      {
        loading: '프로젝트를 수정하고 있습니다.',
        success: '프로젝트를 수정했습니다.',
      },
    );
  }, []);

  const onDelete = useCallback((project: Project) => {
    startApi(
      async () => {
        await Api.Domain.Project.Index.deleteProject(project.id);
      },
      {
        loading: '프로젝트를 삭제하고 있습니다.',
        success: '프로젝트를 삭제했습니다.',
      },
    );
  }, []);

  useEffect(() => {
    if (!project) return;

    setIcon(project.icon);
    setName(project.name);
  }, [project]);

  if (!project) return null;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>일반 설정</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Popover open={iconSelectOpen} onOpenChange={setIconSelectOpen}>
            <PopoverTrigger asChild>
              <div className="flex size-18 items-center justify-center rounded-sm border cursor-pointer hover:bg-accent">
                <DynamicIcon name={icon as IconName} className="size-8 shrink-0" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[307px]">
              <IconSelector
                onSelect={(icon) => {
                  setIcon(icon);
                  setIconSelectOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
          <div className="w-full flex flex-col gap-2">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <div className="flex space-x-2 self-end">
              <Button variant="destructive" disabled={isApi} onClick={() => onDelete(project)}>
                삭제
              </Button>
              <Button disabled={isApi} onClick={() => onSave(project, { icon, name })}>
                저장
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
