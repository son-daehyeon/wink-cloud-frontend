'use client';

import { useRouter } from 'next/navigation';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Archive, Settings2, TerminalSquare, Users } from 'lucide-react';

const items = [
  {
    title: '인스턴스',
    icon: TerminalSquare,
    url: '/instance',
  },
  {
    title: '스토리지',
    url: '/storage',
    icon: Archive,
  },
  {
    title: '팀원 관리',
    icon: Users,
    onClick: () => {},
  },
  {
    title: '일반 설정',
    icon: Settings2,
    onClick: () => {},
  },
];

export default function NavProject() {
  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>프로젝트</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              onClick={
                item?.onClick ||
                (() => {
                  router.push(item?.url);
                })
              }
            >
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
