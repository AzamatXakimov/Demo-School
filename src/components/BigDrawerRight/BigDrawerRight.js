import { Box, Drawer, Icon, IconButton, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';

export const BigDrawerRight = ({isDrawerOpen, setIsDrawerOpen, Title, children}) => {
    return <>

        <Drawer anchor="right" open={isDrawerOpen} onClose={() => {
        setIsDrawerOpen(false)
        }} sx={{
            '& .MuiPaper-root': {
                maxWidth: "530px", 
                width:"100%",
            }
        }}>
            <Box sx={{ p:"16px",}}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: "16px",
                    pb: "16px",
                    borderBottom: "2px solid #eee"
                }}>
                    <Typography fontWeight="bold"  sx={{
                        display: 'flex', 
                        alignItems: 'center',
                        fontSize: "14px",
                        color: "#9E9E9E"
                    }}><Icon sx={{
                        display: 'flex', 
                        alignItems: 'center',
                        width: "16px", 
                        height: "16px",
                        mr: 1,
                    }}><ErrorIcon sx={{width: "16px", height: "16px", color: "#9E9E9E"}} /></Icon>{Title}</Typography>

                    <IconButton onClick={() => {
                        setIsDrawerOpen(false)
                    }} color="inherit" sx={{
                        p: "6px",
                        borderRadius: "8px",

                        '&:hover svg':{
                            color: "#000"
                        } 
                    }}>
                        <CloseIcon sx={{width: "20px", height: "20px", color: "#9E9E9E", transition: "color 0.25s ease"}}/>
                    </IconButton>
                </Box>
                {children}
            </Box>
        </Drawer>
    </>
}
