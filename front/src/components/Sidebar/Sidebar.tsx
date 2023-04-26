import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar } from '@mui/material';


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  backgroundColor:'#091018',

  maxHeight:'100%',
  marginTop:'64px',
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor:'#091018',
  maxHeight:'100%',
  marginTop:'64px',
 
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const  Sidebar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Box sx={{ display: 'flex'}} >
      <Drawer variant="permanent" anchor='left' onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}  open={open}>
        <List>
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  mb:'30px',
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <Avatar src='img/wallet/metamask.png'></Avatar>
                </ListItemIcon>
                
                <ListItemText primary="Coin Flip" sx={{ opacity: open ? 1 : 0 ,color:'#fff'}} />
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <Avatar src='img/wallet/phantom.jpg'></Avatar>
                </ListItemIcon>
                
                <ListItemText primary="Crash" sx={{ opacity: open ? 1 : 0,color:'#fff' }} />
              </ListItemButton>
            </ListItem>
        </List>      
      </Drawer>
    </Box>
  );
}