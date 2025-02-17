'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

import { NavMain } from '@/components/header/nav-main';
import { NavProjects } from '@/components/header/nav-projects';
import { NavUser } from '@/components/header/nav-user';
import { TeamSwitcher } from '@/components/header/team-switcher';
import Loader from '@/components/loader';
import ThemeProvider from '@/components/theme-provider';

import { useApi } from '@/hooks/use-api';

import { useSplashStore } from '@/lib/store/splash';
import { useTokenStore } from '@/lib/store/token';

import '@/style/global.css';

import __data__ from '@/__data__';

interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { initialize } = useTokenStore();
  const { first, started } = useSplashStore();

  const [isApi, startApi] = useApi();

  useEffect(() => {
    if (searchParams.has('token')) return;

    startApi(async () => {
      if (first) {
        await new Promise((res) => setTimeout(res, 2000));
        started();
      }

      const isInitialized = await initialize();

      if (!isInitialized)
        router.replace(
          'https://wink.daehyeon.cloud/application/67a9d0432d63d92ea91e05bd/oauth?callback=http://localhost:3000/callback',
        );
    });
  }, [first, searchParams.get('token')]);

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
                <TeamSwitcher teams={__data__.teams} />
              </SidebarHeader>
              <SidebarContent>
                <NavMain items={__data__.navMain} />
                <NavProjects projects={__data__.projects} />
              </SidebarContent>
              <SidebarFooter>
                <NavUser />
              </SidebarFooter>
              <SidebarRail />
            </Sidebar>
            <SidebarInset>
              <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-background/50 backdrop-blur">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <main className="min-h-[calc(100dvh-56px)] overflow-y-auto px-4 pt-2 pb-4 sm:px-8 sm:pt-4 sm:pb-6">
                {isApi ? <Loader /> : children}
              </main>
            </SidebarInset>
          </SidebarProvider>

          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
