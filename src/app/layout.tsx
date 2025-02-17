'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

import NavBreadcrumb from '@/components/header/nav-breadcrumb';
import NavMain from '@/components/header/nav-main';
import NavOther from '@/components/header/nav-other';
import NavUser from '@/components/header/nav-user';
import TeamSwitcher from '@/components/header/team-switcher';
import Loader from '@/components/loader';
import ModalManager from '@/components/modal-manager';
import ThemeProvider from '@/components/theme-provider';

import { useApi } from '@/hooks/use-api';

import { useTokenStore } from '@/lib/store/token';

import '@/style/global.css';

interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { initialize } = useTokenStore();

  const [isApi, startApi] = useApi();

  useEffect(() => {
    if (searchParams.has('token')) return;

    startApi(async () => {
      const isInitialized = await initialize();

      if (!isInitialized) {
        router.replace(
          `${process.env.NEXT_PUBLIC_WINK_HOSTNAME}/application/${process.env.NEXT_PUBLIC_WINK_APPLICATION_ID}/oauth?callback=${encodeURIComponent(process.env.NEXT_PUBLIC_WINK_CALLBACK_URL!)}`,
        );
      }
    });
  }, []);

  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader>
                <TeamSwitcher />
              </SidebarHeader>
              <SidebarContent>
                <NavMain />
                <NavOther />
              </SidebarContent>
              <SidebarFooter>
                <NavUser />
              </SidebarFooter>
              <SidebarRail />
            </Sidebar>
            <SidebarInset>
              <NavBreadcrumb />
              <main className="min-h-[calc(100dvh-56px)] overflow-y-auto px-4 pt-2 pb-4 md:px-8 md:pt-4 md:pb-6">
                {isApi ? <Loader /> : children}
              </main>
            </SidebarInset>
          </SidebarProvider>

          <ModalManager />
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
