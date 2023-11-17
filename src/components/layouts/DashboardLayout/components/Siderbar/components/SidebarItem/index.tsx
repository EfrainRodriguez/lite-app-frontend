import React, { useState } from 'react';

import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { alpha, experimentalStyled as styled } from '@mui/material/styles';
import {
  Box,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  ...theme.typography.body2,
  height: 49,
  fontSize: theme.typography.pxToRem(16),
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  '&.isActiveRoot': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      position: 'absolute',
      backgroundColor: theme.palette.primary.main
    }
  },
  '&.isNoItemsActiveRoot': {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0),
    '& .Mui-selected': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity
      ),
      '&:before': {
        top: 0,
        right: 0,
        width: 3,
        bottom: 0,
        content: "''",
        position: 'absolute',
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  '&.isActiveSub': {
    '&:hover': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity
      )
    },
    '& .MuiListItemButton-root': {
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    '& .Mui-selected': {
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightMedium,
      '&.MuiListItemButton-root': {
        backgroundColor: 'transparent'
      },
      '& .subIcon:before': {
        transform: 'scale(2)',
        backgroundColor: theme.palette.primary.main
      }
    }
  }
}));

const SubIconStyle = styled('span')(({ theme }) => ({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:before': {
    width: 4,
    height: 4,
    content: "''",
    display: 'block',
    borderRadius: '50%',
    backgroundColor: theme.palette.text.disabled,
    transition: theme.transitions.create('transform')
  }
}));

// ----------------------------------------------------------------------

interface SidebarItemProps {
  level: number;
  title: string;
  href?: string;
  info?: string;
  icon?: React.ReactNode;
  open?: boolean;
  children?: React.ReactNode;
}

const SidebarItem = ({
  level,
  title,
  href,
  info,
  icon,
  open = false,
  children
}: SidebarItemProps) => {
  const [show, setShow] = useState(open);

  const { pathname } = useLocation();

  const isSubItem = level > 0;

  const handleShow = () => {
    setShow(() => !show);
  };

  if (children as boolean) {
    return (
      <>
        <ListItemStyle
          disableGutters
          className={open ? 'isActiveRoot' : ''}
          onClick={handleShow}
        >
          <ListItemIcon>{icon ?? icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          {info ?? info}
          <Box
            sx={{ width: 16, height: 16, ml: 1 }}
            component={show ? KeyboardArrowUp : KeyboardArrowDown}
          />
        </ListItemStyle>

        <Collapse in={show}>{children}</Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      disableGutters
      className={isSubItem ? 'isActiveSub' : 'isNoItemsActiveRoot'}
      {...{ component: RouterLink, to: href as string }}
    >
      <ListItemButton selected={pathname === href}>
        <ListItemIcon>
          {isSubItem ? <SubIconStyle className="subIcon" /> : icon}
        </ListItemIcon>
        <ListItemText disableTypography primary={title} />

        {info ?? info}
      </ListItemButton>
    </ListItemStyle>
  );
};

export default SidebarItem;
