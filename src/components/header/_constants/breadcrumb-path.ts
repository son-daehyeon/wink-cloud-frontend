type BreadcrumbNode = {
  label: string;
  href: string;
  children?: Record<string, BreadcrumbNode>;
};

const BreadcrumbPath: Record<string, BreadcrumbNode> = {
  '/': {
    label: 'WINK Cloud',
    href: '/',
    children: {
      callback: { label: '로그인', href: '/callback' },
      dashboard: {
        label: '애플리케이션',
        href: '/application',
      },
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
