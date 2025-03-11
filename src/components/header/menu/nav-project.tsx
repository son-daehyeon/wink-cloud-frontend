'use client';

import Link from 'next/link';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

import { useProjectStore } from '@/lib/store/project';

import { Settings2, TerminalSquare } from 'lucide-react';

const items = [
  { title: '인스턴스', icon: TerminalSquare, url: '/project/instance' },
  { title: '설정', icon: Settings2, url: '/project/setting' },
];

export default function NavProject() {
  const { project } = useProjectStore();

  if (!project) return <NavProjectSkeleton />;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>프로젝트</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url}>
              <SidebarMenuButton>
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NavProjectSkeleton() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>프로젝트</SidebarGroupLabel>
      <SidebarMenu>
        {Array.from({ length: items.length }).map((_, idx) => (
          <SidebarMenuItem key={idx}>
            <SidebarMenuButton>
              <Skeleton className="size-5" />
              <Skeleton className="w-12 h-3.5" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
