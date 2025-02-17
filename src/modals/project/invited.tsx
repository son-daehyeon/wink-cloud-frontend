import * as React from 'react';
import { useCallback } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { useApiWithToast } from '@/hooks/use-api';

import Api from '@/lib/api';
import Project from '@/lib/api/type/schema/project';
import { useModalStore } from '@/lib/store/modal';

import { DynamicIcon, IconName, iconNames } from 'lucide-react/dynamic';

export interface ProjectInvitedProps {
  project: Project;
  onAccept: (project: Project) => void;
  onDecline: (project: Project) => void;
}

export default function ProjectInvitedModal({ project, onAccept, onDecline }: ProjectInvitedProps) {
  const [isApi, startApi] = useApiWithToast();

  const { close } = useModalStore();

  const _onAccept = useCallback(
    (project: Project) => {
      startApi(
        async () => {
          await Api.Domain.Project.Index.acceptInvite(project.id);
          onAccept(project);
        },
        {
          loading: '프로젝트 초대를 수락하고 있습니다.',
          success: '프로젝트 초대를 수락했습니다.',
          finally: () => close(),
        },
      );
    },
    [onAccept],
  );

  const _onDecline = useCallback(
    (project: Project) => {
      startApi(
        async () => {
          await Api.Domain.Project.Index.declineInvite(project.id);
          onDecline(project);
        },
        {
          loading: '프로젝트 초대를 거절하고 있습니다.',
          success: '프로젝트 초대를 거절했습니다.',
          finally: () => close(),
        },
      );
    },
    [onDecline],
  );

  return (
    <>
      <DialogHeader>
        <DialogTitle>프로젝트 초대장</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex size-18 items-center justify-center rounded-sm border">
            <DynamicIcon
              name={
                iconNames.includes(project.icon as IconName) ? (project.icon as IconName) : 'box'
              }
              className="size-8 shrink-0"
            />
          </div>
          <p className="text-lg font-medium">{project.name}</p>
        </div>
        <Separator />
        <div className="flex flex-wrap justify-center gap-2">
          {project.participants.map((user) => (
            <div key={user.id} className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">{user.name}</AvatarFallback>
              </Avatar>
              <p>{user.name}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled={isApi} onClick={() => _onDecline(project)}>
            초대 거부
          </Button>
          <Button disabled={isApi} onClick={() => _onAccept(project)}>
            초대 수락
          </Button>
        </div>
      </div>
    </>
  );
}
