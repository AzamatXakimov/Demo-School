import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const LeadsItem = ({obj, delFn}) => {
    return <>
        <Paper sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: "8px",
            borderRadius: "6px",
        }}>
            <Box sx={{
                display: "flex", 
                alignItems: "center", 
            }}>
            <Tooltip title={obj.desc} placement="top">
                <MoreVertIcon/>
            </Tooltip>
                <Typography>{obj.name} / {obj.phoneNumber}</Typography>
            </Box>

            <IconButton aria-label="delete" size="small" onClick={() => {
                delFn(obj.id)
            }}>
                <DeleteOutlineRoundedIcon />
            </IconButton>
        </Paper>
    </>
}
