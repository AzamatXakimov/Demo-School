import {Box, List, ListItem, Typography,} from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import "./NavBar.scss"

export const NavBar = () => {
    return <>
        <Box position="fixed" component="nav" sx={{
            top: 0,
            left: 0,
            maxWidth: "160px",
            width: "100%",
            height: "100%",
            pt: "70px",
            backgroundColor: "#fff",
            overflowY: "auto", 
        }}>
            <List>
                <ListItem sx={{display: "block", mb: "8px", p: 0, borderBottom: "1px solid #eee"}}>
                    <NavLink to="/" className="navBar-link">
                        <HomeOutlinedIcon sx={{fontSize: "28px"}}/>
                        <Typography variant="subtitle1" component="span">
                            Bosh sahifa
                        </Typography>
                    </NavLink>
                </ListItem>

                <ListItem sx={{display: "block", mb: "8px", p: 0, borderBottom: "1px solid #eee"}}>
                    <NavLink className="navBar-link" to="students">
                        <SchoolOutlinedIcon sx={{fontSize: "28px"}}/>
                        <Typography variant="subtitle1" component="span">
                            Talabalar
                        </Typography>
                    </NavLink>
                </ListItem>

                <ListItem sx={{display: "block", mb: "8px", p: 0, borderBottom: "1px solid #eee"}}>
                    <NavLink className="navBar-link" to="teachers">
                        <GroupOutlinedIcon sx={{fontSize: "28px"}}/>
                        <Typography variant="subtitle1" component="span">
                            O'qituvchilar
                        </Typography>
                    </NavLink>
                </ListItem>

                <ListItem sx={{display: "block", mb: "8px", p: 0, borderBottom: "1px solid #eee"}}>
                    <NavLink className="navBar-link" to="courses">
                        <DesktopMacOutlinedIcon sx={{fontSize: "28px"}}/>
                        <Typography variant="subtitle1" component="span">
                            Kurslar
                        </Typography>
                    </NavLink>
                </ListItem>

                <ListItem sx={{display: "block", mb: "8px", p: 0, borderBottom: "1px solid #eee"}}>
                    <NavLink className="navBar-link" to="groups">
                        <GroupsOutlinedIcon sx={{fontSize: "28px"}}/>
                        <Typography variant="subtitle1" component="span">
                            Guruhlar
                        </Typography>
                    </NavLink>
                </ListItem>

                <ListItem sx={{display: "block", mb: "8px", p: 0, borderBottom: "1px solid #eee"}}>
                    <NavLink className="navBar-link" to="leads">
                        <FileDownloadOutlinedIcon sx={{fontSize: "28px"}}/>
                        <Typography variant="subtitle1" component="span">
                            Lidlar
                        </Typography>
                    </NavLink>
                </ListItem>

                <ListItem sx={{display: "block", mb: "8px", p: 0, borderBottom: "1px solid #eee"}}>
                    <NavLink className="navBar-link" to="settings">
                        <SettingsOutlinedIcon sx={{fontSize: "28px", color: "#F44336"}}/>
                        <Typography variant="subtitle1" component="span">
                            Sozlamalar
                        </Typography>
                    </NavLink>
                </ListItem>

            </List>
        </Box>
    </>
}
