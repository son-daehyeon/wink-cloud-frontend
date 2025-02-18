import { IconType } from 'react-icons';
import { FaCentos, FaDebian, FaUbuntu } from 'react-icons/fa6';
import { SiAlmalinux, SiRockylinux } from 'react-icons/si';

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
  {
    os: 'CentOS',
    icon: FaCentos,
    version: [
      {
        name: 'CentOS Stream 10',
        raw: OsType.CENTOS_10,
      },
      {
        name: 'CentOS Stream 9',
        raw: OsType.CENTOS_9,
      },
    ],
  },
  {
    os: 'Rocky Linux',
    icon: SiRockylinux,
    version: [
      {
        name: 'Rocky Linux v9.5',
        raw: OsType.ROCKY_LINUX_9_5,
      },
      {
        name: 'Rocky Linux v8.10',
        raw: OsType.ROCKY_LINUX_8_10,
      },
    ],
  },
  {
    os: 'AlmaLinux',
    icon: SiAlmalinux,
    version: [
      {
        name: 'AlmaLinux 9.5',
        raw: OsType.ALMA_LINUX_9_5,
      },
      {
        name: 'AlmaLinux 8.10',
        raw: OsType.ALMA_LINUX_8_10,
      },
    ],
  },
];
