'use client';

import { useRouter } from 'next/navigation';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Archive, Settings2, TerminalSquare } from 'lucide-react';

const items = [
  { title: '인스턴스', icon: TerminalSquare, url: '/instance' },
  { title: '스토리지', icon: Archive, url: '/storage' },
  { title: '설정', icon: Settings2, url: '/setting' },
];

export default function NavProject() {
  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>프로젝트</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton onClick={() => router.push(item.url)}>
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
