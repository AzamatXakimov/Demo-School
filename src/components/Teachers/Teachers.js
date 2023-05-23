import { Box, Button, FormControlLabel, InputAdornment, MenuItem, Pagination, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { PageHead } from "../PageHead/PageHead"
import { useEffect, useRef, useState } from "react"
import { DrawerRight } from "../DrawerRight/DrawerRight"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

export const Teachers = () => {
	const {page} = useParams()
    const [nowPage, setNowPage] = useState(page || 1)
    const [teacherDrawer, setTeacherDrawer] = useState(false)
	const navigate = useNavigate()

	const handleChangePage = (event, newPage) => {
		setNowPage(newPage)
		navigate(`/teachers/${newPage}`)
	};


	const [teachers, setTeachers] = useState([]);
	const [categories, setCategories] = useState([]);
	
	const nameRef = useRef() 
	const ageRef = useRef() 
	const categorysRef = useRef() 
	const gropsRef = useRef() 

	const getAllTeachers = () => {
		axios.get("https://crm-c3xh.onrender.com/api/crm/teacher").then(data => {
			setTeachers(data.data?.data)
		}).catch(err => console.log(err))
	}

	const hendelSubmit =() => {
		axios.post("https://crm-c3xh.onrender.com/api/crm/teacher", {
			name: nameRef.current.value,
			age: ageRef.current.value,
			categorys: categorysRef.current.value,
			grops: gropsRef.current.value
		}).then(data => {
			console.log(data);
			getAllTeachers()
			setTeacherDrawer(false)
		}).catch(err => console.log(err))
	}

	useEffect(() => {
		getAllTeachers()
		
		axios.get("https://crm-c3xh.onrender.com/api/crm/category").then(data => {
			setCategories(data.data?.data)
		}).catch(err => console.log(err))
		// axios.get(`https://crm-c3xh.onrender.com/api/crm/teacher`).then(data => console.log(data)).catch(err => console.log(err))
	}, [page]);

    return (
		<>
			<Box sx={{ ml: '160px', p: '28px' }}>
				<PageHead
					setIsDrawerOpen={setTeacherDrawer}
					Title={"O'qituvchilar"}
				/>

				{/* ORIGINAL FORM  */}
				{/* <DrawerRight
					isDrawerOpen={teacherDrawer}
					setIsDrawerOpen={setTeacherDrawer}
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
								label='Ismi'
								variant='outlined'
								size='small'
								fullWidth
                                required
							/>

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
								type='password'
								label='Parol'
								variant='outlined'
								size='small'
								fullWidth
                                required
							/>

							<TextField
								id='outlined-select-currency'
								select
								label='Rol tanlang'
								size='small'
								fullWidth
                                required
							>
								<MenuItem value='CEO direktor'>
									CEO direktor
								</MenuItem>
								<MenuItem value='Admin'>Admin</MenuItem>
								<MenuItem value='Kassir'>Kassir</MenuItem>
								<MenuItem value='Operator'>Operator</MenuItem>
								<MenuItem value='Teacher'>Teacher</MenuItem>
							</TextField>

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
								type='file'
								label="Foto surat"
								variant='outlined'
								size='small'
								fullWidth
								InputLabelProps={{ shrink: true }}
                                required
							/>

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
					isDrawerOpen={teacherDrawer}
					setIsDrawerOpen={setTeacherDrawer}
					Title={"Yangi oqituvchi qo'shish"}
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
								label='Ismi'
								variant='outlined'
								size='small'
								inputRef={nameRef}
								fullWidth
                                required
							/>

							<TextField
								label='Yosh'
								type="number"
								variant='outlined'
								size='small'
								inputRef={ageRef}
								fullWidth
                                required
							/>

							<TextField
								type='number'
								label='Guruhlar'
								variant='outlined'
								size='small'
								inputRef={gropsRef}
								fullWidth
                                required
							/>

							<TextField
								id='outlined-select-currency'
								select
								label='Category tanlang'
								size='small'
								inputRef={categorysRef}
								fullWidth
                                required
							>
								{categories.map((item, i) => (
									<MenuItem value={item.title} key={i}>
										{item.title}
									</MenuItem>
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

				<TableContainer component={Paper} sx={{
					mt: "12px",
					p: "8px",
					borderRadius: "12px",
				}}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell width="5%">Id</TableCell>
								<TableCell width="20%">Nomi</TableCell>
								<TableCell width="75%">Categorys</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{teachers.map((item, i) => (
								<TableRow key={i}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell scope="row">{item._id}</TableCell>
									<TableCell scope="row">{item.name}</TableCell>
									<TableCell scope="row">{item.categorys}</TableCell>
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
