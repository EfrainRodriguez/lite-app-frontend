import React from 'react';
import {
  Home,
  People,
  Settings,
  Apartment,
  Workspaces,
  AccountBox,
  MiscellaneousServices,
  ProductionQuantityLimits
} from '@mui/icons-material';

// ----------------------------------------------------------------------

export interface SideConfigProps {
  title?: string;
  subheader?: string;
  info?: string;
  icon?: React.ReactNode;
  href?: string;
  items?: SideConfigProps[];
}

export const ICONS = {
  home: <Home />,
  person: <People />,
  profile: <AccountBox />,
  services: <MiscellaneousServices />,
  product: <ProductionQuantityLimits />,
  company: <Apartment />,
  settings: <Settings />,
  workspace: <Workspaces />
};

const sidebarConfig: SideConfigProps[] = [
  {
    items: [
      {
        title: 'Home',
        icon: ICONS.home,
        href: '/'
      },
      {
        title: 'Productos',
        icon: ICONS.product,
        href: '/products'
      }
    ]
  }
];

export default sidebarConfig;
