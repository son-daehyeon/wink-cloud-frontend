'use client';

import * as React from 'react';
import { Fragment, useCallback, useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

import { useApi } from '@/hooks/use-api';

import Api from '@/lib/api';
import Project from '@/lib/api/type/schema/project';
import { useModalStore } from '@/lib/store/modal';
import { useProjectStore } from '@/lib/store/project';
import { useUserStore } from '@/lib/store/user';

import { InviteProjectProps } from '@/modals/project/invite';
import { ProjectInvitedProps } from '@/modals/project/invited';
import { NewProjectProps } from '@/modals/project/new';
import { ChevronsUpDown, Plus } from 'lucide-react';
import { DynamicIcon, IconName, iconNames } from 'lucide-react/dynamic';

export default function ProjectSwitch() {
  const { isMobile } = useSidebar();

  const { user } = useUserStore();
  const { open } = useModalStore();
  const { project: currentProject, setProject: setCurrentProject } = useProjectStore();

  const [isApi, startApi] = useApi();

  const [projects, setProjects] = useState<Project[]>([]);
  const [invitedProjects, setInvitedProjects] = useState<Project[]>([]);

  const formatParticipantString = useCallback(
    (project: Project, pending: boolean = true) =>
      `${project.participants.length}명 참가중` +
      (pending && project.pending.length > 0 ? ` (대기: ${project.pending.length}명)` : ''),
    [],
  );

  useEffect(() => {
    if (!user) return;

    startApi(async () => {
      const { projects } = await Api.Domain.Project.Index.myProjects();
      const { projects: invitedProjects } = await Api.Domain.Project.Index.invitedProjects();

      setProjects(projects);
      setInvitedProjects(invitedProjects);

      if (!currentProject || !projects.find((project) => project.id === currentProject))
        setCurrentProject(projects[0].id);
    });
  }, [user]);

  if (isApi || !currentProject) return <ProjectSwitchSkeleton />;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {projects
                .filter((project) => project.id === currentProject)
                .map((project) => (
                  <Fragment key={project.id}>
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <DynamicIcon
                        name={
                          iconNames.includes(project.icon as IconName)
                            ? (project.icon as IconName)
                            : 'box'
                        }
                        className="size-4"
                      />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{project.name}</span>
                      <span className="truncate text-xs">{formatParticipantString(project)}</span>
                    </div>
                  </Fragment>
                ))}
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              프로젝트
            </DropdownMenuLabel>
            {projects.map((project) => (
              <DropdownMenuItem
                key={project.id}
                onClick={() => setCurrentProject(project.id)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <DynamicIcon
                    name={
                      iconNames.includes(project.icon as IconName)
                        ? (project.icon as IconName)
                        : 'box'
                    }
                    className="size-4 shrink-0"
                  />
                </div>
                {project.name}
                <DropdownMenuShortcut>
                  {formatParticipantString(project, false)}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              초대된 프로젝트
            </DropdownMenuLabel>
            {invitedProjects.map((project) => (
              <DropdownMenuItem
                key={project.id}
                onClick={() =>
                  open<ProjectInvitedProps>('project:invited', {
                    project,
                    onAccept: (project: Project) => {
                      setInvitedProjects((prev) => prev.filter((p) => p.id !== project.id));
                      setProjects((prev) => [...prev, project]);
                      setCurrentProject(project.id);
                    },
                    onDecline: (project: Project) => {
                      setInvitedProjects((prev) => prev.filter((p) => p.id !== project.id));
                    },
                  })
                }
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <DynamicIcon
                    name={
                      iconNames.includes(project.icon as IconName)
                        ? (project.icon as IconName)
                        : 'box'
                    }
                    className="size-4 shrink-0"
                  />
                </div>
                {project.name}
                <DropdownMenuShortcut>
                  {formatParticipantString(project, false)}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            {invitedProjects.length > 0 && <DropdownMenuSeparator />}
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() =>
                open<NewProjectProps>('project:new', {
                  onCreate: (project: Project) => {
                    setProjects((prev) => [...prev, project]);
                    setCurrentProject(project.id);
                    setTimeout(() => {
                      open<InviteProjectProps>('project:invite', {
                        project: project,
                        onUpdate: (project: Project) => {
                          setProjects((prev) =>
                            prev.map((p) => (p.id === project.id ? project : p)),
                          );
                        },
                      });
                    }, 100);
                  },
                })
              }
            >
              <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">프로젝트 추가</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function ProjectSwitchSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground" />
          <div className="grid flex-1 space-y-0.5 text-left text-sm leading-tight">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-16 h-3" />
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
