import { Box, Button, FormControlLabel, IconButton, InputAdornment, MenuItem, Pagination, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageHead } from "../PageHead/PageHead";
import { DrawerRight } from "../DrawerRight/DrawerRight";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

export const Students = () => {
    const {page} = useParams()
    const [nowPage, setNowPage] = useState(page || 1)
    const [studentDrawer, setStudentDrawer] = useState(false)
	const navigate = useNavigate()

	const handleChangePage = (event, newPage) => {
		setNowPage(newPage)
		navigate(`/students/${newPage}`)
	};

	const [courses, setCourses] = useState([]);
	const [students, setStudents] = useState([]);

	const nameRef = useRef();
	const phoneRef = useRef();
	const ageRef = useRef();
	const categoryRef = useRef();

	const getStudents = () => {
		axios.get(`https://crm-c3xh.onrender.com/api/crm/student`).then(data => {
			setStudents(data.data?.data)
		}).catch(err => console.log(err))
	}

	const hendelSubmit = () => {
		axios.post(`https://crm-c3xh.onrender.com/api/crm/student`, {
			name: nameRef.current.value,
			age: ageRef.current.value,
			category: categoryRef.current.value,
			phoneNumber: `+998 ${phoneRef.current.value}`
		}).then(data => {
			getStudents()
			setStudentDrawer(false)
			console.log(data)
		}).catch(err => console.log(err))
	}


	useEffect(() => {
		getStudents()
		axios.get("https://crm-c3xh.onrender.com/api/crm/category").then(data => {
            setCourses(data.data?.data)
        }).catch(err => console.log(err))
	}, [page]);

    return (
		<>
			<Box sx={{ ml: '160px', p: '28px' }}>
				<PageHead
					setIsDrawerOpen={setStudentDrawer}
					Title={'Talabalar'}
				/>

				{/* ORIGINAL FORM  */}
				{/* <DrawerRight
					isDrawerOpen={studentDrawer}
					setIsDrawerOpen={setStudentDrawer}
					Title={"Yangi talaba qo'shish"}
				>
					<form
						onSubmit={(evt) => {
							evt.preventDefault();
						}}
					>
						<Stack spacing={3}>
							<TextField
								label='Telefon raqami'
								variant='outlined'
								size='small'
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											+998
										</InputAdornment>
									),
								}}
                                required
							/>

                            <TextField
								type='text'
								label='Ismi'
								variant='outlined'
								size='small'
								fullWidth
                                required
							/>

							<TextField
								type='date'
								label="Tug'ilgan sanasi"
								variant='outlined'
								size='small'
								fullWidth
								InputLabelProps={{ shrink: true }}
                                required
							/>

							<RadioGroup
								row
								aria-labelledby='demo-row-radio-buttons-group-label'
								name='row-radio-buttons-group'
                                defaultValue='male'
							>
								<FormControlLabel
									value='female'
									control={<Radio />}
									label='Erkak'
								/>
								<FormControlLabel
									value='male'
									control={<Radio />}
									label='Ayol'
								/>
							</RadioGroup>

                            <TextField
                                id="outlined-multiline-static"
                                label="Tavsir"
                                multiline
                                rows={3}
                                size='small'
								fullWidth
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
					isDrawerOpen={studentDrawer}
					setIsDrawerOpen={setStudentDrawer}
					Title={"Yangi talaba qo'shish"}
				>
					<form
						onSubmit={(evt) => {
							evt.preventDefault();
							hendelSubmit()
						}}
					>
						<Stack spacing={3}>
							<TextField
								label='Telefon raqami'
								variant='outlined'
								size='small'
								inputRef={phoneRef}
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											+998
										</InputAdornment>
									),
								}}
                                required
							/>

                            <TextField
								type='text'
								label='Ismi'
								variant='outlined'
								size='small'
								inputRef={nameRef}
								fullWidth
                                required
							/>

							<TextField
								type='number'
								label="Yosh"
								variant='outlined'
								size='small'
								inputRef={ageRef}
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
                            <Button variant="contained" type="submit" sx={{
                                maxWidth: "150px",
                                '&.MuiButtonBase-root': {
                                    backgroundColor: "#2196F3",
                                }
                            }}>YUBORISH</Button>
						</Stack>
					</form>
				</DrawerRight>

				<TableContainer  component={Paper} sx={{
					mt: "12px",
					p: "8px",
					borderRadius: "12px",
				}}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell width="10%">Id</TableCell>
								<TableCell width="10%">Nomi</TableCell>
								<TableCell width="15%">Phone</TableCell>
								<TableCell width="10%">Balance</TableCell>
								<TableCell width="55%">Holat</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{students.map((item, i) => (
								<TableRow key={i}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell scope="row">{item._id}</TableCell>
									<TableCell scope="row">{item.name}</TableCell>
									<TableCell scope="row">{item.phoneNumber}</TableCell>
									<TableCell scope="row">0</TableCell>
									<TableCell scope="row">
										<Link to={`/students/single/${item._id}`}>
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

				</TableContainer>
			</Box>
		</>
	);
}
