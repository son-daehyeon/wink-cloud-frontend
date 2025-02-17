type BreadcrumbNode = {
  label: string;
  href: string;
  children?: Record<string, BreadcrumbNode>;
};

const BreadcrumbPath: Record<string, BreadcrumbNode> = {
  '/': {
    label: 'WINK 클라우드',
    href: '/',
    children: {
      callback: { label: '로그인', href: 'callback' },
      instance: { label: '인스턴스', href: '/instance' },
      setting: { label: '설정', href: '/setting' },
    },
  },
};

export function getBreadcrumbs(pathname: string): { label: string; href: string }[] {
  const segments = pathname.split('/').filter(Boolean);
  let node = BreadcrumbPath['/'];
  const breadcrumbs = [{ label: node.label, href: node.href }];
  let currentPath = '';

  for (const segment of segments) {
    currentPath = currentPath ? `${currentPath}/${segment}` : segment;
    if (node.children && node.children[segment]) {
      node = node.children[segment];
      breadcrumbs.push({ label: node.label, href: `/${currentPath}` });
    } else {
      break;
    }
  }
  return breadcrumbs;
}
