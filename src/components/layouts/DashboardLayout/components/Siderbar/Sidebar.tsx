import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
import {
  Box,
  List,
  Drawer,
  Avatar,
  Hidden,
  Typography,
  ListSubheader
} from '@mui/material';

import { useCustomSelector } from '@/redux/store';
import ScrollBar from '@/components/ScrollBar';

import MenuLinks, { type SideConfigProps } from './utils/SidebarConfig';
import SidebarItem from './components/SidebarItem';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper
  },
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  margin: theme.spacing(3, 2.5, 4),
  borderRadius: theme.shape.borderRadius * 2,
  border: `solid 1px ${theme.palette.grey[300]}`
}));

// ----------------------------------------------------------------------

const reduceChild = ({
  array,
  item,
  pathname,
  level
}: {
  array: SideConfigProps[];
  item: SideConfigProps;
  pathname: string;
  level: number;
}) => {
  const key = `${item.href}${level}`;

  if (item.items != null) {
    // const match = pathname.match(item.href as string);
    const match = pathname === item.href;

    return [
      ...array,
      <SidebarItem
        key={key}
        level={level}
        icon={item.icon}
        info={item.info}
        href={item.href}
        title={item.title as string}
        open={Boolean(match)}
      >
        {renderSidebarItems({
          pathname,
          level: level + 1,
          items: item.items
        })}
      </SidebarItem>
    ];
  }
  return [
    ...array,
    <SidebarItem
      key={key}
      level={level}
      href={item.href}
      icon={item.icon}
      info={item.info}
      title={item.title as string}
    />
  ];
};

const renderSidebarItems = ({
  items,
  pathname,
  level = 0
}: {
  items: SideConfigProps[] | undefined;
  pathname: string;
  level?: number;
}) => (
  <List disablePadding>
    {
      items?.reduce(
        (array, item) => reduceChild({ array, item, pathname, level }) as any,
        []
      ) as any
    }
  </List>
);

interface DashboardSidebarProps {
  isOpenSidebar?: boolean;
  onCloseSidebar?: () => void;
}

const DashboardSidebar = ({
  isOpenSidebar = false,
  onCloseSidebar = () => {}
}: DashboardSidebarProps) => {
  const { user } = useCustomSelector((state) => state.auth);

  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <ScrollBar>
      <AccountStyle>
        <Avatar src={''} alt="user avatar" />
        <Box sx={{ ml: 2 }}>
          <Typography variant="body1">{(user as any)?.firstName}</Typography>
        </Box>
      </AccountStyle>

      {MenuLinks.map((list, index) => (
        <List
          disablePadding
          key={index}
          subheader={
            <ListSubheader
              disableSticky
              disableGutters
              sx={{
                mt: 3,
                mb: 2,
                pl: 5,
                color: 'text.primary',
                typography: 'overline'
              }}
            >
              {list.subheader}
            </ListSubheader>
          }
        >
          {renderSidebarItems({
            items: list.items,
            pathname
          })}
        </List>
      ))}
    </ScrollBar>
  );

  return (
    <RootStyle>
      <Hidden lgUp>
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: { width: DRAWER_WIDTH, bgcolor: 'background.default' }
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </RootStyle>
  );
};

export default DashboardSidebar;
