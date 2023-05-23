import { Box, Button, MenuItem, Pagination, Paper, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { DrawerRight } from "../DrawerRight/DrawerRight";
import { PageHead } from "../PageHead/PageHead";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { MyTabPanel } from "../MyTabPanel/MyTabPanel";


export const Groups = () => {
    const [groupDrawer, setGroupDrawer] = useState(false)
	const {page} = useParams()
    const [nowPage, setNowPage] = useState(page || 1)
	const navigate = useNavigate()
	const [value, setValue] = useState(0);

	const handleChangePage = (event, newPage) => {
		setNowPage(newPage)
		navigate(`/groups/${newPage}`)
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};


	const [groups, setGroups] = useState([])
	const [courses, setCourses] = useState([])
	const [teachers, setTeachers] = useState([])

	// GROUP POST INPUT REF
	const nameRef = useRef(); 
	const teacherRef = useRef(); 
	const roomRef = useRef(); 
	const categoryRef = useRef(); 
	const dayRef = useRef(); 
	const startTimeRef = useRef(); 
	const endTimeRef = useRef(); 

	const getAllGroups = () => {
		axios.get("https://crm-c3xh.onrender.com/api/crm/groups").then(data => {
			setGroups(data.data?.data)
			
		}).catch(err => console.log(err))
	}

	const hendelSubmit = () => {
		axios.post("https://crm-c3xh.onrender.com/api/crm/groups", {
			gropName: nameRef.current.value,
			teacher: teacherRef.current.value,
			room: roomRef.current.value,
			category: categoryRef.current.value,
			day: dayRef.current.value,
			startTime: startTimeRef.current.value.split("T")[1],
			startGroup: startTimeRef.current.value.split("T")[0],
			endGroup: endTimeRef.current.value
		}).then(data => {
			getAllGroups()
			setGroupDrawer(false)
			console.log(data);
		}).catch(err => console.log(err));
	}

	useEffect(() => {
		// GROUPS 
		getAllGroups()

		// COURSES 
		axios.get("https://crm-c3xh.onrender.com/api/crm/category").then(data => {
			setCourses(data.data?.data)
		}).catch(err => console.log(err))

		// TEACHERS 
		axios.get("https://crm-c3xh.onrender.com/api/crm/teacher").then(data => {
			setTeachers(data.data?.data)
		}).catch(err => console.log(err))

		// axios.get(`${nowPage}`).then(data => console.log(data)).catch(err => console.log(err))
	}, [page]);

    return (
		<>
			<Box sx={{ ml: '160px', p: '28px' }}>
				<PageHead
					setIsDrawerOpen={setGroupDrawer}
					Title={'Guruhlar'}
				/>

				{/* ORIGINAL FORM  */}
				{/* <DrawerRight
					isDrawerOpen={groupDrawer}
					setIsDrawerOpen={setGroupDrawer}
					Title={"Yangi xodim qo'shish"}
				>
					<form
						onSubmit={(evt) => {
							evt.preventDefault();
						}}
					>
						<Stack spacing={3}>
							<TextField
								type='text'
								label='Nomi'
								variant='outlined'
								size='small'
								fullWidth
                                required
							/>

                            <TextField
                                id='outlined-select-currency'
                                select
                                label='Kursni tanlang'
                                size='small'
                                fullWidth
                                required
                            >
                                <MenuItem value='Targetolog'>Targetolog</MenuItem>
                                <MenuItem value='Web'>Web</MenuItem>
                                <MenuItem value='Web site qilish'>Web site qilish</MenuItem>
                                <MenuItem value='English beginer'>English beginer</MenuItem>
                                <MenuItem value='Rus tili'>Rus tili</MenuItem>
                                <MenuItem value='SMM'>SMM</MenuItem>
                                <MenuItem value="3D's MAX">3D's MAX</MenuItem>
                                <MenuItem value='Web'>Web</MenuItem>
                            </TextField>

							<TextField
								id='outlined-select-currency'
								select
								label="O'qituvchini tanlang"
								size='small'
								fullWidth
                                required
							>
								<MenuItem value='Fotima Yuldasheva'>Fotima Yuldasheva</MenuItem>
								<MenuItem value='Muhammadillo Xakimov'>Muhammadillo Xakimov</MenuItem>
								<MenuItem value='Asal Ileysboyeva'>Asal Ileysboyeva</MenuItem>
								<MenuItem value='Ahmad shox'>Ahmad shox </MenuItem>
								<MenuItem value='Shaxzoda Abdullayeva'>Shaxzoda Abdullayeva</MenuItem>
								<MenuItem value='Ezoza Abdullayeva'>Ezoza Abdullayeva</MenuItem>
								<MenuItem value='Nafisa Ahmadaliyeva'>Nafisa Ahmadaliyeva</MenuItem>
								<MenuItem value='Malika Elnazarova'>Malika Elnazarova</MenuItem>
							</TextField>

							<TextField
								id='outlined-select-currency'
								select
								label='Kunlar'
								size='small'
								fullWidth
                                required
							>
								<MenuItem value='Juft kunlar'>Juft kunlar</MenuItem>
								<MenuItem value='Toq kunlar'>Toq kunlar</MenuItem>
								<MenuItem value='Dam olish kuni'>Dam olish kuni</MenuItem>
								<MenuItem value='Har kuni'>Har kuni</MenuItem>
								<MenuItem value='Boshqa'>Boshqa</MenuItem>
							</TextField>

							<TextField
								id='outlined-select-currency'
								select
								label='Xona tanlang'
								size='small'
								fullWidth
                                required
							>
								<MenuItem value='1-xona'>
									1-xona
								</MenuItem>
								<MenuItem value='2-xona'>2-xona</MenuItem>
								<MenuItem value='3-xona'>3-xona</MenuItem>
								<MenuItem value='4-xona'>4-xona</MenuItem>
								<MenuItem value='5-xona'>5-xona</MenuItem>
							</TextField>

							<TextField
								type='datetime-local'
								label="Guruhni boshlash vaqti"
								variant='outlined'
								size='small'
								fullWidth
								InputLabelProps={{ shrink: true }}
                                required
							/>

                            <Button variant="contained" type="submit" sx={{
                                maxWidth: "150px",
                                '&.MuiButtonBase-root': {
                                    backgroundColor: "#2196F3",
                                }
                            }}>YUBORISH</Button>
						</Stack>
					</form>
				</DrawerRight> */}

				{/* MY CUSTOM FORM  */}
				<DrawerRight
					isDrawerOpen={groupDrawer}
					setIsDrawerOpen={setGroupDrawer}
					Title={"Yangi guruh qo'shish"}
				>
					<form
						onSubmit={(evt) => {
							evt.preventDefault();
							hendelSubmit()
						}}
					>
						<Stack spacing={3}>
							<TextField
								type='text'
								label='Nomi'
								variant='outlined'
								size='small'
								inputRef={nameRef}
								fullWidth
                                required
							/>

                            <TextField
                                id='outlined-select-currency'
                                select
                                label='Kursni tanlang'
                                size='small'
								inputRef={categoryRef}
                                fullWidth
                                required
                            >
								{courses.map((item, i) => (
									<MenuItem value={item.title} key={i}>{item.title}</MenuItem>
								))}
                            </TextField>

							<TextField
								id='outlined-select-currency'
								select
								label="O'qituvchini tanlang"
								size='small'
								inputRef={teacherRef}
								fullWidth
                                required
							>
								{teachers.map((item, i) => (
									<MenuItem value={item.name} key={i}>{item.name}</MenuItem>
								))}
							</TextField>

							<TextField
								id='outlined-select-currency'
								select
								label='Kunlar'
								size='small'
								inputRef={dayRef}
								fullWidth
                                required
							>
								<MenuItem value='Juft'>Juft kunlar</MenuItem>
								<MenuItem value='Toq'>Toq kunlar</MenuItem>
								<MenuItem value='Dam'>Dam olish kuni</MenuItem>
								<MenuItem value='Har kuni'>Har kuni</MenuItem>
								<MenuItem value='Boshqa'>Boshqa</MenuItem>
							</TextField>

							<TextField
								id='outlined-select-currency'
								select
								label='Xona tanlang'
								size='small'
								inputRef={roomRef}
								fullWidth
                                required
							>
								<MenuItem value='1-xona'>
									1-xona
								</MenuItem>
								<MenuItem value='2-xona'>2-xona</MenuItem>
								<MenuItem value='3-xona'>3-xona</MenuItem>
								<MenuItem value='4-xona'>4-xona</MenuItem>
								<MenuItem value='5-xona'>5-xona</MenuItem>
							</TextField>

							<TextField
								type='datetime-local'
								label="Guruhni boshlash vaqti"
								variant='outlined'
								size='small'
								inputRef={startTimeRef}
								fullWidth
								InputLabelProps={{ shrink: true }}
                                required
							/>

							<TextField
								type='date'
								label="Guruhni tugash sanasi"
								variant='outlined'
								size='small'
								inputRef={endTimeRef}
								fullWidth
								InputLabelProps={{ shrink: true }}
                                required
							/>

                            <Button variant="contained" type="submit" sx={{
                                maxWidth: "150px",
                                '&.MuiButtonBase-root': {
                                    backgroundColor: "#2196F3",
                                }
                            }}>YUBORISH</Button>
						</Stack>
					</form>
				</DrawerRight>

				<TableContainer component={Paper} sx={{
					mt: "12px",
					p: "8px",
					borderRadius: "12px",
				}}>
					<Box>
						<Tabs sx={{
							p: "4px",
							borderRadius: "8px",
							backgroundColor: "#F4F5F7",

							'& .MuiTabs-indicator': {
								zIndex: "1",
								height: "100%",
								backgroundColor: "#fff",
								borderRadius: "6px",
							}
						}} value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
							<Tab sx={{
								position: "relative",
								zIndex: "2",
								py: "0",
								color: "#263238",

								'&.Mui-selected': {
									color: "#263238",
								},
							}} label="Active" disableRipple={true}/>
							<Tab sx={{
								position: "relative",
								zIndex: "2",
								py: "0",
								color: "#263238",

								'&.Mui-selected': {
									color: "#263238",
								},
							}} label="Archive" disableRipple={true}/>
						</Tabs>
					</Box>

					<MyTabPanel value={value} index={0}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table"> 
							<TableHead>
								<TableRow>
									<TableCell width="8%">Id</TableCell>
									<TableCell width="12%">Nomi</TableCell>
									<TableCell width="15%">O'qituvchi</TableCell>
									<TableCell width="8%">Vaqt</TableCell>
									<TableCell width="11%">Kunlar</TableCell>
									<TableCell width="46%">Holat</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{groups.map((item, i) => (
									<TableRow key={i}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell scope="row">{item._id}</TableCell>
										<TableCell scope="row">{item.category}</TableCell>
										<TableCell scope="row">{item.teacher}</TableCell>
										<TableCell scope="row">{item.startTime}</TableCell>
										<TableCell scope="row">{item.day}</TableCell>
										<TableCell scope="row">
											<Link to={`/groups/single/${item._id}`}>
												<EditIcon sx={{color: "#000"}}/>
											</Link>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>

						<Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mt: "8px"}}>
							<Typography variant="h6" sx={{color: "#616161"}}>Ma`lumotlar 15 dan 35 gacha, 234 ta dan</Typography>
							<Pagination  count={10} page={nowPage} color="primary" onChange={handleChangePage} />
						</Box>
					</MyTabPanel>

					<MyTabPanel value={value} index={1}>	
						<Table sx={{ minWidth: 650 }} aria-label="simple table"> 
							<TableHead>
								<TableRow>
									<TableCell width="8%">Id</TableCell>
									<TableCell width="12%">Nomi</TableCell>
									<TableCell width="15%">O'qituvchi</TableCell>
									<TableCell width="8%">Vaqt</TableCell>
									<TableCell width="11%">Kunlar</TableCell>
									<TableCell width="46%">Holat</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
							{groups.map((item, i) => (
								<TableRow key={i}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell scope="row">{item._id}</TableCell>
									<TableCell scope="row">{item.category}</TableCell>
									<TableCell scope="row">{item.teacher}</TableCell>
									<TableCell scope="row">{item.startTime}</TableCell>
									<TableCell scope="row">{item.day}</TableCell>
									<TableCell scope="row">
										<Link to={`/groups/single/${item._id}`}>
											<EditIcon sx={{color: "#000"}}/>
										</Link>
									</TableCell>
								</TableRow>
							))}
							</TableBody>
						</Table>

						<Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mt: "8px"}}>
							<Typography variant="h6" sx={{color: "#616161"}}>Ma`lumotlar 15 dan 35 gacha, 234 ta dan</Typography>
							<Pagination  count={10} page={nowPage} color="primary" onChange={handleChangePage} />
						</Box>
					</MyTabPanel>
					
				</TableContainer>
			</Box>
		</>
	);
}
