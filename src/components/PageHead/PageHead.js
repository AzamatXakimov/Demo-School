import { Box, Button, Typography } from "@mui/material"

export const PageHead = ({setIsDrawerOpen, Title}) => {
    return <>
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: "12px",
            borderBottom: "2px solid #fff",
        }}>
            <Typography variant="h4" fontWeight="bold" component="h2">{Title}</Typography>

            <Button variant="contained" type="button" onClick={() => {
                setIsDrawerOpen(true)
            }} sx={{
                '&.MuiButtonBase-root': {
                    backgroundColor: "#2196F3",
                }
            }}>YANGISINI QO'SHISH</Button>
        </Box>
    </>
}
