'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { useApiWithToast } from '@/hooks/use-api';

import Api from '@/lib/api';
import Project from '@/lib/api/type/schema/project';
import { useModalStore } from '@/lib/store/modal';
import { useProjectStore } from '@/lib/store/project';

import { InviteProjectProps } from '@/modals/project/invite';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

export default function MemberSetting() {
  const [isApi, startApi] = useApiWithToast();

  const { open } = useModalStore();
  const { project, setProject } = useProjectStore();

  const [query, setQuery] = useState('');

  if (!project) return null;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>멤버 관리</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-6">
        <div className="flex space-x-2">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="검색" />
          <Button
            onClick={() =>
              open<InviteProjectProps>('project:invite', {
                project,
                onUpdate: (project: Project) => {
                  setProject(project);
                },
              })
            }
          >
            초대
          </Button>
        </div>
        <div className="space-y-4">
          {project.participants
            .filter((user) => user.name.includes(query) || user.email.includes(query))
            .map((user) => (
              <div key={user.id} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">멤버</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      disabled={isApi}
                      onClick={() =>
                        startApi(
                          async () => {
                            const { project: _project } =
                              await Api.Domain.Project.Index.deleteMember(project.id, user.id);
                            setProject(_project);
                          },
                          {
                            loading: '멤버를 삭제하고 있습니다.',
                            success: '멤버를 삭제했습니다.',
                          },
                        )
                      }
                    >
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          {project.pending.length > 0 && <Separator />}
          {project.pending
            .filter((user) => user.name.includes(query) || user.email.includes(query))
            .map((user) => (
              <div key={user.id} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">초대됨</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      disabled={isApi}
                      onClick={() =>
                        startApi(
                          async () => {
                            const { project: _project } =
                              await Api.Domain.Project.Index.deleteInvite(project.id, user.id);
                            setProject(_project);
                          },
                          {
                            loading: '초대를 삭제하고 있습니다.',
                            success: '초대를 삭제했습니다.',
                          },
                        )
                      }
                    >
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
