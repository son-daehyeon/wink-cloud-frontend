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
import ProjectSwitch from '@/components/header/project-switch';
import Loader from '@/components/loader';
import ModalManager from '@/components/modal-manager';
import ThemeProvider from '@/components/theme-provider';

import { useApi } from '@/hooks/use-api';

import { useTokenStore } from '@/lib/store/token';

import '@/style/global.css';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

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
        <NuqsAdapter>
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
        </NuqsAdapter>
      </body>
    </html>
  );
}
