import { AppBar, Avatar, Box, Button, ClickAwayListener, Icon, IconButton, InputAdornment, Menu, MenuItem, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from "react-router-dom";
import DemoSchoolLogo from "../../assets/images/Demo-School.png"
import { useState } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { useDispatch } from "react-redux";
import { deleteToken } from "../../redux/token/tokenActions";
import { Fullscreen } from "@mui/icons-material";
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fullScreen, setFullScreen] = useState(false)

    const [anchorElUser, setAnchorElUser] = useState();
    const [langMenu, setLangMenu] = useState();
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenLangMenu = (event) => {
        setLangMenu(event.currentTarget);
    };
    const handleCloseLangMenu = () => {
        setLangMenu(null);
    };

    const handleFullscreen = () => {
		if (fullScreen) {
			document.exitFullscreen();
            setFullScreen(false)
		} else {
			document.documentElement.requestFullscreen();
            setFullScreen(true)
		}
	};

    return <>
        <AppBar position="fixed">
            <Toolbar sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingY: "8px",
                paddingX: "32px",
                backgroundColor: "#fff",
            }}>
                <form onSubmit={evt => {
                    evt.preventDefault()
                }}>
                    <TextField 
                        label="Search" 
                        type={"search"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <SearchIcon sx={{cursor: "pointer"}}/>
                                </InputAdornment>
                            )
                        }}
                        size="small"
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: "30px",  
                            }
                        }}
                    />
                </form>

                <Link to="/">
                    <img src={DemoSchoolLogo} width="152"  alt="Demo School Logo" />
                </Link>

                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                }}>


                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton sx={{
                            mr: "8px"
                        }} onClick={handleOpenLangMenu}>
                            <DashboardCustomizeRoundedIcon sx={{color: "#000"}}/>
                        </IconButton>
                        <Menu
                            sx={{
                                mt: '45px',

                                '& .MuiList-root': {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    p: "12px",
                                },
                                '& .MuiPaper-root': {
                                    maxWidth: "180px",
                                    width: "100%",
                                }
                            }}
                            id="menu-appbar"
                            anchorEl={langMenu}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={Boolean(langMenu)}
                            onClose={handleCloseLangMenu}
                            >
                            <MenuItem onClick={handleCloseLangMenu} sx={{
                                display: "block",
                                px: "12px",
                                py: "9px", 
                                borderRadius: "6px",
                            }}>
                                <Typography  sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    fontSize: "14px",
                                    color: "#607d8b"
                                }}>ru</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseLangMenu} sx={{
                                display: "block",
                                px: "12px",
                                py: "9px", 
                                borderRadius: "6px",
                            }}>
                                <Typography  sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    fontSize: "14px",
                                    color: "#607d8b"
                                }}>uz</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseLangMenu} sx={{
                                display: "block",
                                px: "12px",
                                py: "9px", 
                                borderRadius: "6px",
                            }}>
                                <Typography  sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    fontSize: "14px",
                                    color: "#607d8b"
                                }}>en</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>


                    
                    <IconButton sx={{
                        mr: "16px"
                    }} onClick={handleFullscreen}>
                        {fullScreen ? <FullscreenExitIcon sx={{color: "#000"}} />  : <Fullscreen sx={{color: "#000"}} />}
                    </IconButton>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{
                                mt: '45px',

                                '& .MuiPaper-root': {
                                    maxWidth: "180px",
                                    width: "100%",
                                }
                            }}
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
                            <MenuItem onClick={handleCloseUserMenu} sx={{
                                display: "block",
                                px: "12px",
                                py: "9px",
                            }}>
                                <Typography  sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    fontSize: "14px",
                                    color: "#607d8b"
                                }}><Icon sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    width: "16px", 
                                    height: "16px",
                                    mr: 1,
                                }}><AccountCircleOutlinedIcon sx={{width: "16px", height: "16px", color: "#607d8b"}} /></Icon>My Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu} sx={{
                                display: "block",
                                px: "12px",
                                py: "9px",
                            }}>
                                <Typography  sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    fontSize: "14px",
                                    color: "#607d8b"
                                }}><Icon sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    width: "16px", 
                                    height: "16px",
                                    mr: 1,
                                }}><SettingsOutlinedIcon sx={{width: "16px", height: "16px", color: "#607d8b"}} /></Icon>Edit Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu} sx={{
                                display: "block",
                                px: "12px",
                                py: "9px",
                            }}>
                                <Typography  sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    fontSize: "14px",
                                    color: "#607d8b"
                                }}><Icon sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    width: "16px", 
                                    height: "16px",
                                    mr: 1,
                                }}><MoveToInboxOutlinedIcon sx={{width: "16px", height: "16px", color: "#607d8b"}} /></Icon>Inbox</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu} sx={{
                                display: "block",
                                px: "12px",
                                py: "9px",
                            }}>
                                <Typography  sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    fontSize: "14px",
                                    color: "#607d8b"
                                }}><Icon sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    width: "16px", 
                                    height: "16px",
                                    mr: 1,
                                }}><HelpOutlineOutlinedIcon sx={{width: "16px", height: "16px", color: "#607d8b"}} /></Icon>Help</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                dispatch(deleteToken())
                                localStorage.removeItem("token");
                                navigate("/")
                                handleCloseUserMenu()
                            }} sx={{
                                display: "block",
                                px: "12px",
                                py: "9px",

                                '&:hover': {
                                    backgroundColor: "#feeceb",
                                }
                            }}>
                                <Typography  sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    fontSize: "14px",
                                    color: "#f44336"
                                }}><Icon sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    width: "16px", 
                                    height: "16px",
                                    mr: 1,
                                }}><PowerSettingsNewOutlinedIcon sx={{width: "16px", height: "16px", color: "#f44336"}} /></Icon>Sing out</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    </>
}
