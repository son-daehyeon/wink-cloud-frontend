'use client';

import { ReactNode, Suspense, useEffect } from 'react';

import { useRouter } from 'next/navigation';

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

import NavOther from '@/components/header/menu/nav-other';
import NavProject from '@/components/header/menu/nav-project';
import NavRecord from '@/components/header/menu/nav-record';
import NavBreadcrumb from '@/components/header/nav-breadcrumb';
import NavUser from '@/components/header/nav-user';
import ProjectSwitch from '@/components/header/project-switch';
import Loader from '@/components/loader';
import ModalManager from '@/components/modal-manager';
import ThemeProvider from '@/components/theme-provider';

import { useApi } from '@/hooks/use-api';

import { useProjectStore } from '@/lib/store/project';
import { useTokenStore } from '@/lib/store/token';

import '@/style/global.css';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const searchParams =
    typeof window === 'undefined'
      ? new URLSearchParams()
      : new URL(window.location.href).searchParams;

  const { initialize } = useTokenStore();
  const { project } = useProjectStore();

  const [isApi, startApi] = useApi();

  useEffect(() => {
    if (searchParams.has('token')) return;

    startApi(async () => {
      const isInitialized = await initialize();

      if (!isInitialized) {
        router.replace(
          `https://wink.kookmin.ac.kr/application/${process.env.NEXT_PUBLIC_WINK_APPLICATION_ID}/oauth?callback=${encodeURIComponent(process.env.NEXT_PUBLIC_WINK_CALLBACK_URL!)}`,
        );
      }
    });
  }, [searchParams.get('token')]);

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <title>WINK 클라우드</title>
        <meta
          name="description"
          content="국민대학교 소프트웨어융합대학 웹 학술 동아리 WINK 전용 클라우드 서비스"
        />
        <meta
          name="keywords"
          content="국민대학교, WINK, 웹 개발, 웹 동아리, 국민대 웹 동아리, WINK 클라우드"
        />
        <meta name="author" content="WINK - Web IN Kookmin" />
        <meta name="robots" content="index,nofollow" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
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
                <ProjectSwitch />
              </SidebarHeader>
              <SidebarContent>
                <NavProject />
                <NavRecord />
                <NavOther />
              </SidebarContent>
              <SidebarFooter>
                <NavUser />
              </SidebarFooter>
              <SidebarRail />
            </Sidebar>
            <SidebarInset>
              <NavBreadcrumb />
              <main className="min-h-[calc(100dvh-56px)] overflow-y-auto p-4 pt-0 md:p-6 md:pt-0">
                <NuqsAdapter>
                  <Suspense>
                    {isApi || (!searchParams.has('token') && !project) ? <Loader /> : children}
                  </Suspense>
                </NuqsAdapter>
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
