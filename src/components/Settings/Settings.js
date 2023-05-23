import {
	Box,
	Button,
	FormControlLabel,
	IconButton,
	InputAdornment,
	MenuItem,
	Pagination,
	Paper,
	Radio,
	RadioGroup,
	Stack,
	Switch,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	TextField,
	Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { PageHead } from '../PageHead/PageHead';
import { DrawerRight } from '../DrawerRight/DrawerRight';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { MyTabPanel } from '../MyTabPanel/MyTabPanel';
import { v4 as uuidv4 } from 'uuid';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import EditIcon from '@mui/icons-material/Edit';


export const Settings = () => {
	const [settingsDrawer, setSettingsDrawer] = useState(false);

	const { page } = useParams();
	const [nowPage, setNowPage] = useState(page || 1);
	const navigate = useNavigate();
	const [value, setValue] = useState(0);


	// INPUTS REFS || STATES
	const [smsTemplateInputValue, setSmsTemplateInputValue] = useState()


	const handleChangePage = (event, newPage) => {
		setNowPage(newPage);
		// navigate(`/groups/${newPage}`);
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// STAFFS 
	const [staffs, setStaffs] = useState([]);
	const staffNameRef = useRef()
	const staffPhoneRef = useRef()
	const staffPasswordRef = useRef()
	const staffRolRef = useRef()


	const getStaffs = () => {
		axios.get(`https://crm-c3xh.onrender.com/api/crm/staff`).then(data => {
			setStaffs(data.data?.data)
		}).catch(err => console.log(err))
	}


	const hendelStaffSubmit = () => {
		axios.post(`https://crm-c3xh.onrender.com/api/crm/staff`, {
			name: staffNameRef.current.value,
			rol: staffRolRef.current.value,
			password: staffPasswordRef.current.value,
			phoneNumber: staffPhoneRef.current.value
		}).then(data => {
			console.log(data);
			setSettingsDrawer(false);
			getStaffs()
		}).catch(err => console.log(err))
	}


	// ROOMS 
	const [rooms, setRooms] = useState([
		{
			id: 1,
			name: "1-xona"
		},
		{
			id: 2,
			name: "2-xona"
		},
		{
			id: 3,
			name: "3-xona"
		},
		{
			id: 4,
			name: "4-xona"
		},
		{
			id: 5,
			name: "5-xona"
		},
	]);

	const roomNameRef = useRef()
	const roomDescRef = useRef()

	const hendelRoomsSubmit = () => {
		const updateRooms = [...rooms];
		
		updateRooms.push({
			id: updateRooms.length + 1,
			name: roomNameRef.current.value
		})

		setRooms(updateRooms)
		setSettingsDrawer(false)
	}


	// AVTO SMS 
	const [avtoSmsValue, setAvtoSmsValue] = useState({
		title: "",
		text: ""
	})

	// SMS TEMPLATE 
	const [smsTemp, setSmsTemp] = useState([
		{
			id: 1,
			message: "Assalomu aleykum, iltimos to'lovni o'z vaqtida amalga oshiring",
		},
		{
			id: 2,
			message: "Assalomu aleykum, webinarda qatnashganingizdan hursandmiz",
		},
		{
			id: 3,
			message: "Assalomu aleykum, siz kutayotgan guruh ochildi! Batafsil: https://",
		},
		{
			id: 4,
			message: "Assalomu aleykum, bugungi bayram bilan sizni o'z jamoamiz bilan qutlaymiz",
		},
	])
	const [smsTempEditDrawer, setSmsTempEditDrawer] = useState(false);
	const [smsEditMessage, setSmsEditMessage] = useState({})
	

	const hendelSmsTempSubmit = () => {
		const updateSmsTemp = [...smsTemp];

		updateSmsTemp.push({
			id: uuidv4(),
			message: smsTemplateInputValue
		})

		setSmsTemp(updateSmsTemp)
		setSmsTemplateInputValue("")
		setSettingsDrawer(false)
	}

	const hendelSmsEdit = () => {
		const updateSmsTemp = [...smsTemp]
		const updateSmsTempIndex = updateSmsTemp.findIndex(item => item.id == smsEditMessage.id);

		updateSmsTemp.splice(updateSmsTempIndex, 1, {id: smsEditMessage.id, message: smsTemplateInputValue})
		setSmsTemp(updateSmsTemp)
		setSmsEditMessage({})
		setSmsTemplateInputValue("")
		setSmsTempEditDrawer(false)
	}

	const hendelDelete = (id) => {
		const updateSmsTemp = [...smsTemp]
		const updateSmsTempIndex = updateSmsTemp.findIndex(item => item.id == id);

		updateSmsTemp.splice(updateSmsTempIndex, 1)
		setSmsTemp(updateSmsTemp)
	}

	useEffect(() => {
		getStaffs()
		// axios.get(`${nowPage}`).then(data => console.log(data)).catch(err => console.log(err))
	}, [page]);

	return (
		<>
			<Box sx={{ ml: '160px', p: '16px' }}>
				<Box>
					<Tabs
						sx={{
							'& .MuiTabs-indicator': {
								zIndex: '1',
								height: '100%',
								backgroundColor: '#fff',
								borderRadius: '6px',
							},
						}}
						value={value}
						onChange={handleChange}
						variant='fullWidth'
						aria-label='basic tabs example'
					>
						<Tab
							sx={{
								position: 'relative',
								zIndex: '2',
								py: '0',
								color: '#263238',
								textTransform: "none",

								'&.Mui-selected': {
									color: '#263238',
								},
							}}
							label='Xodimlar'
							disableRipple={true}
						/>
						<Tab
							sx={{
								position: 'relative',
								zIndex: '2',
								py: '0',
								color: '#263238',
								textTransform: "none",

								'&.Mui-selected': {
									color: '#263238',
								},
							}}
							label='Xonalar'
							disableRipple={true}
						/>
						<Tab
							sx={{
								position: 'relative',
								zIndex: '2',
								py: '0',
								color: '#263238',
								textTransform: "none",

								'&.Mui-selected': {
									color: '#263238',
								},
							}}
							label='Avto-sms'
							disableRipple={true}
						/>
						<Tab
							sx={{
								position: 'relative',
								zIndex: '2',
								py: '0',
								color: '#263238',
								textTransform: "none",

								'&.Mui-selected': {
									color: '#263238',
								},
							}}
							label='SMS shablonlar'
							disableRipple={true}
						/>
					</Tabs>
				</Box>

				<MyTabPanel value={value} index={0}>
					<PageHead
						setIsDrawerOpen={setSettingsDrawer}
						Title={'Xodimlar'}
					/>

					{/* ORIGINAL FORM  */}
					{/* <DrawerRight
						isDrawerOpen={settingsDrawer}
						setIsDrawerOpen={setSettingsDrawer}
						Title={"Yangi xodim qo'shish"}
					>
						<form
							onSubmit={(evt) => {
								evt.preventDefault();
								hendelStaffSubmit()
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
									label='Foto surat'
									variant='outlined'
									size='small'
									fullWidth
									InputLabelProps={{ shrink: true }}
									required
								/>

								<TextField
									id='outlined-multiline-static'
									label='Tavsir'
									multiline
									rows={3}
									size='small'
									fullWidth
									required
								/>

								<Button
									variant='contained'
									type='submit'
									sx={{
										maxWidth: '150px',
										'&.MuiButtonBase-root': {
											backgroundColor: '#2196F3',
										},
									}}
								>
									YUBORISH
								</Button>
							</Stack>
						</form>
					</DrawerRight> */}

					{/* MY CUSTOM FORM  */}
					<DrawerRight
						isDrawerOpen={settingsDrawer}
						setIsDrawerOpen={setSettingsDrawer}
						Title={"Yangi xodim qo'shish"}
					>
						<form
							onSubmit={(evt) => {
								evt.preventDefault();
								hendelStaffSubmit()
							}}
						>
							<Stack spacing={3}>
								<TextField
									type='text'
									label='Ismi'
									variant='outlined'
									size='small'
									inputRef={staffNameRef}
									fullWidth
									required
								/>

								<TextField
									label='Telefon raqami'
									variant='outlined'
									size='small'
									inputRef={staffPhoneRef}
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
									inputRef={staffPasswordRef}
									fullWidth
									required
								/>

								<TextField
									id='outlined-select-currency'
									select
									label='Rol tanlang'
									size='small'
									inputRef={staffRolRef}
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

								<Button
									variant='contained'
									type='submit'
									sx={{
										maxWidth: '150px',
										'&.MuiButtonBase-root': {
											backgroundColor: '#2196F3',
										},
									}}
								>
									YUBORISH
								</Button>
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
									<TableCell width="15%">Nomi</TableCell>
									<TableCell width="15%">Phone</TableCell>
									<TableCell width="10%">Role</TableCell>
									{/* <TableCell width="10%">Tugilgan kuni</TableCell> */}
									<TableCell width="50%">Amallar</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{staffs.map((item, i) => (
									<TableRow key={i}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell scope="row">{item._id}</TableCell>
										<TableCell scope="row">{item.name}</TableCell>
										<TableCell scope="row">{item.phoneNumber}</TableCell>
										<TableCell scope="row">{item.rol}</TableCell>
										{/* <TableCell scope="row">{item.rol}</TableCell> */}
										<TableCell scope="row">
											<IconButton onClick={() => {

											}}>
												<DeleteIcon sx={{color: "#FF0000"}}/>
											</IconButton>
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
				</MyTabPanel>

				<MyTabPanel value={value} index={1}>
					<PageHead setIsDrawerOpen={setSettingsDrawer} Title={'Xonalar'}/>

					{/* ORIGINAL FORM  */}
					<DrawerRight
						isDrawerOpen={settingsDrawer}
						setIsDrawerOpen={setSettingsDrawer}
						Title={"Yangi xona qo'shish"}
					>
						<form
							onSubmit={(evt) => {
								evt.preventDefault();
								hendelRoomsSubmit()
							}}
						>
							<Stack spacing={3}>
								<TextField
									type='text'
									label='Nomi'
									variant='outlined'
									size='small'
									inputRef={roomNameRef}
									fullWidth
									required
								/>

								<TextField
									id='outlined-multiline-static'
									label='Tavsir'
									multiline
									rows={3}
									size='small'
									inputRef={roomDescRef}
									fullWidth
									required
								/>

								<Button
									variant='contained'
									type='submit'
									sx={{
										maxWidth: '150px',
										'&.MuiButtonBase-root': {
											backgroundColor: '#2196F3',
										},
									}}
								>
									YUBORISH
								</Button>
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
									<TableCell width="5%">Id</TableCell>
									<TableCell width="95%">Nomi</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{rooms.map((item, i) => (
									<TableRow key={i}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell scope="row">{item.id}</TableCell>
										<TableCell scope="row">{item.name}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>

						<Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mt: "8px"}}>
							<Typography variant="h6" sx={{color: "#616161"}}>Ma`lumotlar 15 dan 35 gacha, 234 ta dan</Typography>
							<Pagination  count={10} page={nowPage} color="primary" onChange={handleChangePage} />
						</Box>

					</TableContainer>
				</MyTabPanel>

				<MyTabPanel value={value} index={2}>
					<Box sx={{
						display: "flex",
						alignItems: "start",
						justifyContent: "space-between"
					}}>
						<Box sx={{maxWidth: "424px", width: "100%", mr: "20px"}}>
							<Typography variant='h6' fontWeight="bold" sx={{color: "#616161"}}>SMS turi</Typography>

							<Paper elevation="4" sx={{display: "flex", alignItems: "center", justifyContent: "space-between", my: "12px", p: "12px"}}>
								<Button variant="text" sx={{
									color: "#616161",
									textTransform: "none",
								}}  endIcon={<AdsClickIcon />} onClick={() => {
									setAvtoSmsValue({
										title: "To'lov amalga oshirildi",
										text: "Assalomu aleykum, sizning to'lovingiz amalga oshirildi"
									})
								}}>
									To'lov amalga oshirildi
								</Button>

								<Switch defaultChecked />
							</Paper>
							<Paper elevation="4" sx={{display: "flex", alignItems: "center", justifyContent: "space-between", my: "12px", p: "12px"}}>
								<Button variant="text" sx={{
									color: "#616161",
									textTransform: "none",
								}}  endIcon={<AdsClickIcon />} onClick={() => {
									setAvtoSmsValue({
										title: "Talaba guruhga qo'shild",
										text: "Assalomu aleykum, sizni yangi ochilgan qo'shishdi, darsga o'z vaqtida keling"
									})
								}}>
									Talaba guruhga qo'shild
								</Button>

								<Switch defaultChecked />
							</Paper>
							<Paper elevation="4" sx={{display: "flex", alignItems: "center", justifyContent: "space-between", my: "12px", p: "12px"}}>
								<Button variant="text" sx={{
									color: "#616161",
									textTransform: "none",
								}}  endIcon={<AdsClickIcon />} onClick={() => {
									setAvtoSmsValue({
										title: "Talaba tug'ilgan kuni",
										text: "Assalomu aleykum, sizni bugungi tavallud ayyomingiz bilan o'quv markazimiz nomidan tabriklaymiz"
									})
								}}>
									Talaba tug'ilgan kuni
								</Button>

								<Switch defaultChecked />
							</Paper>
						</Box>

						<Box sx={{maxWidth: "481px", width: "100%", mr: "20px"}}>
							<Typography variant='h6' fontWeight="bold" sx={{mb: "12px", color: "#616161", }}>SMS matn: {avtoSmsValue.title}</Typography>

							<form onSubmit={evt => {
								evt.preventDefault()
							}}>
								
								<TextField
									id='outlined-multiline-static'
									label='SMS-matn'
									multiline
									rows={3}
									size='small'
									defaultValue={avtoSmsValue.text}
									focused={avtoSmsValue.text ? true : false}
									fullWidth
									required
									sx={{
										mb: "12px",
										backgroundColor: "#fff"
									}}
								/>
								
								<Typography variant='h6' fontWeight="bold" sx={{mb: "12px", color: "#616161", }}>Yuborilgan SMS misoli</Typography>
								<TextField
									id='outlined-multiline-static'
									label=''
									multiline
									rows={3}
									size='small'
									defaultValue={avtoSmsValue.text ? avtoSmsValue.text : "Sms-matn"}
									focused={avtoSmsValue ? true : false}
									fullWidth
									disabled
									required
									sx={{
										mb: "12px",
										backgroundColor: "#ECEFF1",
										border: "none",
									}}
								/>
								<Typography variant='body2' sx={{mb: "12px", color: "#9E9E9E", }}>{avtoSmsValue.text ? avtoSmsValue.text.length : "0"} ta belgi</Typography>

								<Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
									<Button
										variant='contained'
										type='submit'
										sx={{
											maxWidth: '150px',
											'&.MuiButtonBase-root': {
												backgroundColor: '#2196F3',
											},
										}}
									>
										YUBORISH
									</Button>
								</Box>
							</form>
						</Box>

						<Box sx={{maxWidth: "481px", width: "100%",}}>
							<Typography variant='h6' fontWeight="bold" sx={{mb: "12px", color: "#616161"}}>Tavsif</Typography>

							<Box sx={{p: "12px", border: "1px solid #B2B2B2", borderRadius: "8px"}}>
								<Typography variant='subtitle2' sx={{mb: "12px", color: "#616161",}}>{avtoSmsValue.text}</Typography>
								<Typography variant='h6' fontWeight="bold" sx={{mb: "12px", color: "#616161"}}>Mavjud o'zgaruvchilar</Typography>

								<Typography variant='subtitle2' sx={{color: "#616161",}}>(STUDENT) - talabaning ismi</Typography>
								<Typography variant='subtitle2' sx={{color: "#616161",}}>(GROUP) - guruh nomi</Typography>
								<Typography variant='subtitle2' sx={{color: "#616161",}}>(SUM) - to'lob miqdori</Typography>
								<Typography variant='subtitle2' sx={{color: "#616161",}}>(LC) - o'quv markazingiz nomi</Typography>
								<Typography variant='subtitle2' sx={{color: "#616161",}}>(TEACHER) - auto-sms-teacher</Typography>
								<Typography variant='subtitle2' sx={{color: "#616161",}}>(TIME) - vaqt</Typography>
								<Typography variant='subtitle2' sx={{color: "#616161",}}>(ROOM) - xona</Typography>
								<Typography variant='subtitle2' sx={{color: "#616161",}}>(DAYS) - kunlar</Typography>
							</Box>
						</Box>
					</Box>
				</MyTabPanel>

				<MyTabPanel value={value} index={3}>
					<PageHead
						setIsDrawerOpen={setSettingsDrawer}
						Title={'SMS shablonlar'}
					/>

					{/* ADD SMS TEMP  */}
					<DrawerRight
						isDrawerOpen={settingsDrawer}
						setIsDrawerOpen={setSettingsDrawer}
						Title={"SMS shablon qo'shish"}
					>
						<form
							onSubmit={(evt) => {
								evt.preventDefault();
								hendelSmsTempSubmit()
							}}
						>
							<Stack spacing={3}>
								<TextField
									id='outlined-multiline-static'
									label='Xabarni kiriting'
									multiline
									rows={3}
									size='small'
									fullWidth
									required
									onInput={evt => {
										setSmsTemplateInputValue(evt.target.value)
									}}
								/>

								<Typography variant='body1' sx={{color: "#9E9E9E"}}>{smsTemplateInputValue ? smsTemplateInputValue?.length : "0"} ta belgi</Typography>

								<Button
									variant='contained'
									type='submit'
									sx={{
										maxWidth: '150px',
										'&.MuiButtonBase-root': {
											backgroundColor: '#2196F3',
										},
									}}
								>
									YUBORISH
								</Button>
							</Stack>
						</form>
					</DrawerRight>

					{/* EDIT SMS TEMP  */}
					<DrawerRight
						isDrawerOpen={smsTempEditDrawer}
						setIsDrawerOpen={setSmsTempEditDrawer}
						Title={"SMS shablon ozgartirish"}
					>
						<form
							onSubmit={(evt) => {
								evt.preventDefault();
								hendelSmsEdit()
							}}
						>
							<Stack spacing={3}>
								<TextField
									id='outlined-multiline-static'
									label='Xabarni kiriting'
									multiline
									rows={3}
									size='small'
									defaultValue={smsEditMessage.message}
									fullWidth
									required
									onInput={evt => {
										setSmsTemplateInputValue(evt.target.value)
									}}
								/>

								<Typography variant='body1' sx={{color: "#9E9E9E"}}>{smsTemplateInputValue ? smsTemplateInputValue?.length : "0"} ta belgi</Typography>

								<Button
									variant='contained'
									type='submit'
									sx={{
										maxWidth: '150px',
										'&.MuiButtonBase-root': {
											backgroundColor: '#2196F3',
										},
									}}
								>
									YUBORISH
								</Button>
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
									<TableCell width="87%">Nomi</TableCell>
									<TableCell width="13%">Amallar</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{smsTemp.map((item, i) => (
									<TableRow key={i}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell scope="row">
											{item.message}
										</TableCell>
										<TableCell scope="row">
											<Box sx={{display: "flex", alignItems: "center",}}>
												<IconButton onClick={() => {
													setSmsEditMessage(item)
													setSmsTempEditDrawer(true);
												}}> 
													<EditIcon sx={{color: "#FFA500"}}/>
												</IconButton>
												<IconButton onClick={() => {
													hendelDelete(item.id)
												}}>
													<DeleteIcon sx={{color: "#FF0000"}}/>
												</IconButton>
											</Box>
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
				</MyTabPanel>
			</Box>
		</>
	);
};
