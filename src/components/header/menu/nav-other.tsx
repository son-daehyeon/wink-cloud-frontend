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

const items = [
  {
    name: '테마 설정',
    icon: Palette,
    onClick: () => useModalStore.getState().open('setting:theme'),
  },
];

export default function NavOther() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>기타</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton onClick={item.onClick}>
              <item.icon />
              {item.name}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
