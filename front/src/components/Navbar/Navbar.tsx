import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

/* import { sideBarContext } from '../../context/isSideBar' */




function ResponsiveAppBar() {
    /* const { isOpen, setOpen } = React.useContext(sideBarContext) */
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [open, setOpens] = React.useState(false);
    const handleOpen = () => setOpens(true);
    const handleClose = () => setOpens(false);

    const phantomRef = React.useRef<HTMLLIElement>(null)
    const metaMaskRef = React.useRef<HTMLLIElement>(null)
    const torusRef = React.useRef<HTMLLIElement>(null)



    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const mouseHandlePhantomLeave = () => {
        if (phantomRef.current) {
            phantomRef.current.style.backgroundColor = ''
        }
    }
    const mouseHandlePhantomEnter = () => {
        if (phantomRef.current) {
            phantomRef.current.style.backgroundColor = '#42D376'
        }
    }

    const mouseHandleMetaMaskEnter = () => {
        if (metaMaskRef.current) {
            metaMaskRef.current.style.backgroundColor = '#42D376'
        }
    }
    const mouseHandleMetaMaskLeave = () => {
        if (metaMaskRef.current) {
            metaMaskRef.current.style.backgroundColor = ''
        }
    }


    const mouseHandleTorusEnter = () => {
        if (torusRef.current) {
            torusRef.current.style.backgroundColor = '#42D376'
        }
    }
    const mouseHandleTorusLeave = () => {
        if (torusRef.current) {
            torusRef.current.style.backgroundColor = ''
        }
    }

    return (
        <AppBar position="absolute"  style={{ "background": "linear-gradient(90deg, rgb(26, 42, 62) 0%, rgb(11, 20, 30) 100%)" }}>
            <Container style={{ "maxWidth": "100%", "marginLeft": "2px" }}>
                <Toolbar disableGutters >
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">asd</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        <Button

                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >

                        </Button>

                    </Box>

                    <Box sx={{ flexGrow: 0 }} marginLeft="100vh">
                        <Tooltip title="Connect Wallet">
                            <Button onClick={handleOpen} sx={{ p: 0 }}>
                                <Avatar style={{ "width": "30vh", "fontSize": "13px", "paddingTop": "3px", "fontWeight": "bold", "borderRadius": "20px", "background": "linear-gradient(90deg, rgb(26, 42, 62) 0%, rgb(11, 20, 30) 100%)", "border": "solid 2px #42D376" }} variant="rounded" >
                                    Connect Wallet
                                </Avatar>
                            </Button>
                        </Tooltip>
                        <Menu
                            style={{ "width": "25vh", "marginLeft": "-5vh" }}
                            sx={{ mt: '55px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    height: 430,
                    bgcolor: '#0b141e',
                    border: '2px solid #0b141e',
                    boxShadow: 24,
                    color: "#fff",
                    borderRadius: "30px",
                    p: 5
                }}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#0b141e', p: 2, marginTop: -2, marginLeft: 2 }}>
                        <span style={{
                            fontSize: 45,
                            marginLeft: "5.3rem",
                            display: "block",
                            marginBottom: 30
                        }}>Wallets</span>
                        <ListItem onMouseEnter={mouseHandlePhantomEnter} onMouseLeave={mouseHandlePhantomLeave} ref={phantomRef} sx={{ p: 3, mb: 3, border: 2, borderColor: '#42D376', borderRadius: 10 }}>
                            <ListItemAvatar>
                                <Avatar src='img/wallet/phantom.jpg'></Avatar>
                            </ListItemAvatar>
                            <span style={{
                                fontSize: 25,
                                marginLeft: "1rem",
                                display: "block",
                                marginBottom: 5
                            }}>Phantom</span>
                        </ListItem>
                        <ListItem onMouseEnter={mouseHandleMetaMaskEnter} onMouseLeave={mouseHandleMetaMaskLeave} ref={metaMaskRef} sx={{ p: 3, border: 2, mb: 3, borderColor: '#42D376', borderRadius: 10 }}>
                            <ListItemAvatar>
                                <Avatar src='img/wallet/metamask.png'></Avatar>
                            </ListItemAvatar>
                            <span style={{
                                fontSize: 25,
                                marginLeft: "1rem",
                                display: "block",
                                marginBottom: 5
                            }}>MetaMask</span>
                        </ListItem>
                        <ListItem onMouseEnter={mouseHandleTorusEnter} onMouseLeave={mouseHandleTorusLeave} ref={torusRef} sx={{ p: 3, border: 2, mb: 3, borderColor: '#42D376', borderRadius: 10 }}>
                            <ListItemAvatar>
                                <Avatar src='img/wallet/torus.png'></Avatar>
                            </ListItemAvatar>
                            <span style={{
                                fontSize: 25,
                                marginLeft: "1rem",
                                display: "block",
                                marginBottom: 5
                            }}>Torus</span>
                        </ListItem>
                    </List>
                </Box>
            </Modal>
        </AppBar>
    );
}
export default ResponsiveAppBar;