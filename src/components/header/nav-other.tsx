'use client';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { useModalStore } from '@/lib/store/modal';

import { Palette } from 'lucide-react';

const projects = [
  {
    name: '테마 설정',
    icon: Palette,
    onClick: () => {},
  },
];

export default function NavOther() {
  const { open } = useModalStore();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>기타</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton onClick={() => open('setting:theme')}>
              <item.icon />
              {item.name}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
