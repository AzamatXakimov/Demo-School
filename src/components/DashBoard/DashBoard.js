import { Box, Paper, Stack, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import CountUp from "react-countup";
import { Calendar } from "../Calendar/Calendar";



export const DashBoard = () => {
	return <>
		<Box sx={{ml: "160px", p: "16px"}}>
			<Stack direction="row" spacing={1} sx={{display: "blcok", width: "100%"}} >
				<Paper sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" , flex: 1, p: "16px"}}>
					<Box display="flex" flexDirection="column" alignItems="center" mb="16px">
						<PersonOutlineOutlinedIcon sx={{fontSize: "40px"}}/>
						<Typography variant="body2" component="span">Faol lidlar</Typography>
					</Box>

					<Typography variant="h6" component="strong"><CountUp end={345} duration={2}/></Typography>
				</Paper>
				<Paper sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" , flex: 1, p: "16px"}}>
					<Box display="flex" flexDirection="column" alignItems="center" mb="16px">
						<SchoolOutlinedIcon sx={{fontSize: "40px"}}/>
						<Typography variant="body2" component="span">Faol talabalar</Typography>
					</Box>

					<Typography variant="h6" component="strong"><CountUp end={236} duration={2}/></Typography>
				</Paper>
				<Paper sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" , flex: 1, p: "16px"}}>
					<Box display="flex" flexDirection="column" alignItems="center" mb="16px">
						<GroupOutlinedIcon sx={{fontSize: "40px"}}/>
						<Typography variant="body2" component="span">Guruhlar</Typography>
					</Box>

					<Typography variant="h6" component="strong"><CountUp end={186} duration={2}/></Typography>
				</Paper>
				<Paper sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" , flex: 1, p: "16px"}}>
					<Box display="flex" flexDirection="column" alignItems="center" mb="16px">
						<GppMaybeOutlinedIcon sx={{fontSize: "40px"}}/>
						<Typography variant="body2" component="span">Qarzdorlar</Typography>
					</Box>

					<Typography variant="h6" component="strong"><CountUp end={155} duration={2}/></Typography>
					
				</Paper>

			</Stack>

			<Box sx={{
				mt: "8px",
			}}>
				<Calendar/>
			</Box>
		</Box>
	</>
}
