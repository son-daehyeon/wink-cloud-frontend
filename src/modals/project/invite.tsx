import { useCallback, useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

import { useApi, useApiWithToast } from '@/hooks/use-api';

import Api from '@/lib/api';
import Project from '@/lib/api/type/schema/project';
import User from '@/lib/api/type/schema/user';
import { useModalStore } from '@/lib/store/modal';
import { cn } from '@/lib/utils';

import { Check, ChevronsUpDown } from 'lucide-react';
import { DynamicIcon, IconName, iconNames } from 'lucide-react/dynamic';

export interface InviteProjectProps {
  project: Project;
  onUpdate: (project: Project) => void;
}

export default function InviteProjectModal({ project, onUpdate }: InviteProjectProps) {
  const [isApi, startApi] = useApi();
  const [isApi2, startApi2] = useApiWithToast();

  const { close } = useModalStore();

  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const [open, setOpen] = useState(false);

  const invite = useCallback((project: Project, users: string[]) => {
    if (users.length === 0) {
      close();
      return;
    }

    startApi2(
      async () => {
        const { project: _project } = await Api.Domain.Project.Index.inviteProject(project.id, {
          users,
        });
        onUpdate(_project);
      },
      {
        loading: `${users.length}명의 유저를 초대하고 있습니다.`,
        success: `${users.length}명의 유저를 초대했습니다.`,
        finally: () => close(),
      },
    );
  }, []);

  useEffect(() => {
    startApi(async () => {
      const { users } = await Api.Domain.User.all();
      setUsers(users);
    });
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>프로젝트 초대</DialogTitle>
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
        <Popover open={open} onOpenChange={setOpen} modal={true}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {selected.length > 0 ? `${selected.length}명 선택됨` : '유저를 선택해주세요.'}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="유저 검색" className="h-9" />
              <CommandList>
                <CommandEmpty>유저를 찾을 수 없습니다.</CommandEmpty>
                <CommandGroup>
                  {users
                    .filter((u) => !project.participants.find((uu) => uu.id === u.id))
                    .filter((u) => !project.pending.find((uu) => uu.id === u.id))
                    .map((user) => (
                      <CommandItem
                        key={user.id}
                        value={user.id}
                        onSelect={(currentValue) => {
                          setSelected((prev) =>
                            prev.includes(currentValue)
                              ? prev.filter((u) => u !== currentValue)
                              : [...prev, currentValue],
                          );
                        }}
                      >
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="rounded-lg">{user.name.at(0)}</AvatarFallback>
                        </Avatar>
                        {user.name}
                        <Check
                          className={cn(
                            'ml-auto',
                            selected.includes(user.id) ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="flex gap-2">
          <Button disabled={isApi || isApi2} onClick={() => invite(project, selected)}>
            {selected.length > 0 ? `${selected.length}명 초대하기` : '건너뛰기'}
          </Button>
        </div>
      </div>
    </>
  );
}
