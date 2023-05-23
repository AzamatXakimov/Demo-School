import { Box } from "@mui/material";

export const  MyTabPanel = ({ value, index, children }) => {
	return (
		<>
			<div role='tabpanel' hidden={value !== index}>
				{value === index && <Box p={3}>{children}</Box>}
			</div>
		</>
	);
}