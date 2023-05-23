import { Box, Paper, Typography } from "@mui/material";
import courseImg from "../../assets/images/course-img.png"

export const CoursesItem = ({obj}) => {
    return <>
        <Paper elevation="8" sx={{
            overflow: "hidden",
            maxWidth: "256px",
            width: "100%",
            backgroundColor: "#eee",
            borderRadius: "8px",
            pb: "31px"
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: "10px",
                backgroundColor: "orange",
            }}>
                <img src={courseImg} width="150" height="150" alt="Course Image" />
            </Box>

            <Box sx={{
                p: "12px",
            }}>
                <Typography variant="subtitle1" fontWeight="bold">{obj.title}</Typography>
                <Typography variant="subtitle2">{obj.price} UZS</Typography>
            </Box>
        </Paper>
    </>
}
