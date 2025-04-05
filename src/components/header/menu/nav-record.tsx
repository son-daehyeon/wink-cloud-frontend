'use client';

import Link from 'next/link';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Rss } from 'lucide-react';

const items = [{ title: 'wink.io.kr', icon: Rss, url: '/dns' }];

export default function NavRecord() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>DNS</SidebarGroupLabel>
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
