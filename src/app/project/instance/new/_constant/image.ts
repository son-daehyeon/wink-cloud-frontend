import { IconType } from 'react-icons';
import { FaDebian, FaUbuntu } from 'react-icons/fa6';

import { OsType } from '@/lib/api/type/domain/project/instance';

type Os = 'Ubuntu' | 'Debian' | 'CentOS' | 'Rocky Linux' | 'AlmaLinux';

export interface ImageType {
  os: Os;
  icon: IconType;
  version: { name: string; raw: OsType }[];
}

export const images: ImageType[] = [
  {
    os: 'Ubuntu',
    icon: FaUbuntu,
    version: [
      {
        name: 'Ubuntu 24.10',
        raw: OsType.UBUNTU_24_10,
      },
      {
        name: 'Ubuntu 24.04',
        raw: OsType.UBUNTU_24_04,
      },
      {
        name: 'Ubuntu 22.04',
        raw: OsType.UBUNTU_22_04,
      },
    ],
  },
  {
    os: 'Debian',
    icon: FaDebian,
    version: [
      {
        name: 'Debian 12',
        raw: OsType.DEBIAN_12,
      },
      {
        name: 'Debian 11',
        raw: OsType.DEBIAN_11,
      },
    ],
  },
];
