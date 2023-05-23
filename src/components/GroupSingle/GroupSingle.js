import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListItemIcon, Menu, MenuItem, Paper, Slide, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { DrawerRight } from "../DrawerRight/DrawerRight";
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { MyTabPanel } from "../MyTabPanel/MyTabPanel";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const GroupSingle = () => {
    const {groupId} = useParams()
    const [group, setGroup] = useState({})
    const [groupDrawer, setGroupDrawer] = useState(false)
    const [courses, setCourses] = useState([])
	const [teachers, setTeachers] = useState([])
    const [studentsInGroup, setStudentsInGroup] = useState([])
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    const nameRef = useRef(); 
	const teacherRef = useRef(); 
	const roomRef = useRef(); 
	const categoryRef = useRef(); 
	const dayRef = useRef(); 
	const startTimeRef = useRef(); 
	const endTimeRef = useRef(); 

    const [studentMenu, setStudentMenu] = useState();

    const handleOpenStudentMenu = (event) => {
        setStudentMenu(event.currentTarget);
    };
    const handleCloseStudentMenu = () => {
        setStudentMenu(null);
    };

    const handleChange = (event, newValue) => {
		setValue(newValue);
	};

    const getStudentInGroup = (studentIdArr) => {
        axios.get("https://crm-c3xh.onrender.com/api/crm/student").then(data => {
            const studetnsArr = data.data?.data
            const studentsBygroup = studentIdArr.map(item => studetnsArr.find(element => element._id == item))
            console.log(studentsBygroup);
            setStudentsInGroup(studentsBygroup)
        })
    }

    const getGroup = (id) => {
        axios.get(`https://crm-c3xh.onrender.com/api/crm/groups/${id}`).then(data => {
            getStudentInGroup(data.data?.data.students)
            setGroup(data.data?.data)
        }).catch(err => console.log(err))
    }

    const hendelEdit = () => {
		axios.pur(`https://crm-c3xh.onrender.com/api/crm/groups/update/${groupId}`, {
			gropName: nameRef.current.value,
			teacher: teacherRef.current.value,
			room: roomRef.current.value,
			category: categoryRef.current.value,
			day: dayRef.current.value,
			startTime: startTimeRef.current.value.split("T")[1],
			startGroup: startTimeRef.current.value.split("T")[0],
			endGroup: endTimeRef.current.value
		}).then(data => {
			getGroup()
			setGroupDrawer(false)
			console.log(data);
		}).catch(err => console.log(err));
    }

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const hendelDeleteGroup = () => {
        axios.delete(`https://crm-c3xh.onrender.com/api/crm/groups/delete/${groupId}`).then(data => {
            console.log(data)
            setOpenDeleteDialog(false)
            navigate("/groups")
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getGroup(groupId)

        // COURSES 
		axios.get("https://crm-c3xh.onrender.com/api/crm/category").then(data => {
			setCourses(data.data?.data)
		}).catch(err => console.log(err))

		// TEACHERS 
		axios.get("https://crm-c3xh.onrender.com/api/crm/teacher").then(data => {
			setTeachers(data.data?.data)
		}).catch(err => console.log(err))
    }, [groupId]);
    return <>
        <Box sx={{ ml: '160px', p: '28px' }}>
            <Typography variant="h5">{group._id} * {group.category} * {group.teacher}</Typography>

            <Box sx={{
                display: "flex",
                alignItems: "start",
                mt: "12px",
            }}>
                <Paper sx={{
                    maxWidth: "333px",
                    width: "100%",
                    mr: "16px",
                    p: "16px"
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: "12px",
                    }}>
                        <Typography variant="subtitle1">{group._id}</Typography>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <IconButton onClick={() => {
                                setGroupDrawer(true)
                            }}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton onClick={() => {
                                setOpenDeleteDialog(true)
                            }}>
                                <DeleteOutlineRoundedIcon/>
                            </IconButton>
                        </Box>
                    </Box>

                    <Typography variant="body1" sx={{
                        mb: "12px"
                    }}>
                        {group.category} * {group.teacher}
                    </Typography>

                    <Box sx={{mb: "12px"}}>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Typography variant="body2" sx={{mr: "6px"}}>Narxi:</Typography>
                            <Typography variant="body2" fontWeight="bold">600 000</Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Typography variant="body2" sx={{mr: "6px"}}>Kunlar:</Typography>
                            <Typography variant="body2" fontWeight="bold">{group.day}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{mb: "12px"}}>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Typography variant="body2" sx={{mr: "6px"}}>Xonalar:</Typography>
                            <Typography variant="body2" fontWeight="bold">{group.room}</Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Typography variant="body2" sx={{mr: "6px"}}>Boshlash:</Typography>
                            <Typography variant="body2" fontWeight="bold">{group.startTime}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{mb: "12px"}}>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Typography variant="body2" sx={{mr: "6px"}}>Boshlash sanasi:</Typography>
                            <Typography variant="body2" fontWeight="bold">{group.startGroup?.split("T")[0]}</Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Typography variant="body2" sx={{mr: "6px"}}>Tugash sanasi:</Typography>
                            <Typography variant="body2" fontWeight="bold">{group.endGroup?.split("T")[0]}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        pt: "12px",
                        borderTop: "1px solid #eee",
                    }}>
						<Table aria-label="simple table"> 
							<TableHead sx={{
                                borderTop: "1px solid #eee",
                                borderBottom: "1px solid #eee",
                                backgroundColor: "#F5F7F8"
                            }}>
								<TableRow>
									<TableCell width="30%" sx={{
                                        color: "#646D71",
                                    }}>Name</TableCell>
									<TableCell width="40%" sx={{
                                        color: "#646D71",
                                    }}>phone</TableCell>
									<TableCell width="30%" sx={{
                                        color: "#646D71",
                                    }}>action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
                                {studentsInGroup.map(item => (
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell scope="row">{item.name}</TableCell>
                                        <TableCell scope="row">{item.phoneNumber}</TableCell>
                                        <TableCell scope="row">
                                            <IconButton onClick={handleOpenStudentMenu}>
                                                <PendingOutlinedIcon/>
                                            </IconButton>
                                            <Menu
                                                sx={{
                                                    mt: '45px',

                                                    '& .MuiList-root': {
                                                        p: "12px",
                                                    },
                                                    '& .MuiPaper-root': {
                                                        maxWidth: "240px",
                                                        width: "100%",
                                                    }
                                                }}
                                                id="menu-appbar"
                                                anchorEl={studentMenu}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'bottom',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'bottom',
                                                }}
                                                open={Boolean(studentMenu)}
                                                onClose={handleCloseStudentMenu}
                                                >
                                                <MenuItem onClick={handleCloseStudentMenu} sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    px: "12px",
                                                    py: "9px", 
                                                    borderRadius: "6px",
                                                }}>
                                                    <ListItemIcon>
                                                        <AcUnitIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <Typography  sx={{
                                                        display: 'flex', 
                                                        alignItems: 'center',
                                                        fontSize: "14px",
                                                        color: "#607d8b"
                                                    }}>Muzlatish</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={handleCloseStudentMenu} sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    px: "12px",
                                                    py: "9px", 
                                                    borderRadius: "6px",
                                                }}>
                                                    <ListItemIcon>
                                                        <DeleteOutlineRoundedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <Typography  sx={{
                                                        display: 'flex', 
                                                        alignItems: 'center',
                                                        fontSize: "14px",
                                                        color: "#607d8b"
                                                    }}>Guruhdab olib tashlash</Typography>
                                                </MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                ))}
							</TableBody>
						</Table>
                    </Box>
                </Paper>

                <Box sx={{
                    width: "100%",
                    ml: "16px"
                }}>
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
                                label='Davomat'
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
                                label='Chegirmalar'
                                disableRipple={true}
                            />
                        </Tabs>
                    </Box>
                    <Box sx={{p: "16px"}}>
                        <MyTabPanel value={value} index={0}>
                            <TableContainer  component={Paper} sx={{
                            p: "8px",
                            borderRadius: "12px",
                        }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell width="15%">Ismi</TableCell>
                                            <TableCell width="8%">19</TableCell>
                                            <TableCell width="8%">20</TableCell>
                                            <TableCell width="8%">21</TableCell>
                                            <TableCell width="8%">22</TableCell>
                                            <TableCell width="8%">23</TableCell>
                                            <TableCell width="8%">24</TableCell>
                                            <TableCell width="8%">25</TableCell>
                                            <TableCell width="8%">26</TableCell>
                                            <TableCell width="21%">27</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {studentsInGroup.map((item, i) => (
                                            <TableRow key={i}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell scope="row">{item.name}</TableCell>
                                                <TableCell scope="row"><AddCircleOutlineIcon color="success" sx={{cursor: "pointer"}}/></TableCell>
                                                <TableCell scope="row"><AddCircleOutlineIcon color="success" sx={{cursor: "pointer"}}/></TableCell>
                                                <TableCell scope="row"><AddCircleOutlineIcon color="success" sx={{cursor: "pointer"}}/></TableCell>
                                                <TableCell scope="row"><AddCircleOutlineIcon color="success" sx={{cursor: "pointer"}}/></TableCell>
                                                <TableCell scope="row"><AddCircleOutlineIcon color="success" sx={{cursor: "pointer"}}/></TableCell>

                                                <TableCell scope="row">
                                                    <HighlightOffIcon  sx={{
                                                        color: "#9E9E9E",
                                                        cursor: "not-allowed"
                                                    }}/>
                                                </TableCell>
                                                <TableCell scope="row">
                                                    <HighlightOffIcon color="secondary" sx={{
                                                        color: "#9E9E9E", 
                                                        cursor: "not-allowed"
                                                    }}/>
                                                </TableCell>
                                                <TableCell scope="row">
                                                    <HighlightOffIcon color="secondary" sx={{
                                                        color: "#9E9E9E", 
                                                        cursor: "not-allowed"
                                                    }}/>
                                                </TableCell>
                                                <TableCell scope="row">
                                                    <HighlightOffIcon color="secondary" sx={{
                                                        color: "#9E9E9E", 
                                                        cursor: "not-allowed"
                                                    }}/>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </MyTabPanel>

                        <MyTabPanel value={value} index={1}>
                            <TableContainer  component={Paper} sx={{
                                p: "8px",
                                borderRadius: "12px",
                            }}>
                                <Typography variant='body1' fontWeight="bold" sx={{my: "12px", color: "#616161"}}>Chegirmalar</Typography>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead sx={{
                                        borderTop: "1px solid #eee",
                                        borderBottom: "1px solid #eee",
                                        backgroundColor: "#F5F7F8"
                                    }}>
                                        <TableRow>
                                            <TableCell width="25%" sx={{
                                                color: "#646D71",
                                            }}>Name</TableCell>
                                            <TableCell width="25%" sx={{
                                                color: "#646D71",
                                            }}>Phone</TableCell>
                                            <TableCell width="50%" sx={{
                                                color: "#646D71",
                                            }}>	
                                            Individual narx</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {studentsInGroup.map((item, i) => (
                                            <TableRow key={i}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell scope="row">{item.name}</TableCell>
                                                <TableCell scope="row">{item.phoneNumber}</TableCell>
                                                <TableCell scope="row">
                                                    <TextField type="number" size="small" label="narx kiriting" fullWidth/>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </MyTabPanel>
                    </Box>
                </Box>
            </Box>


            {/* MY CUSTOM FORM  */}
            <DrawerRight
                isDrawerOpen={groupDrawer}
                setIsDrawerOpen={setGroupDrawer}
                Title={"Guruhni ozgartirish"}
            >
                <form
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        hendelEdit()
                    }}
                >
                    <Stack spacing={3}>
                        <TextField
                            type='text'
                            label='Nomi'
                            variant='outlined'
                            size='small'
                            defaultValue={group.gropName}
                            inputRef={nameRef}
                            fullWidth
                            required
                        />

                        <TextField
                            id='outlined-select-currency'
                            select
                            label='Kursni tanlang'
                            size='small'
                            defaultValue={group.category}
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
                            defaultValue={group.teacher}
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
                            defaultValue={group.day}
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
                            defaultValue={group.room}
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
                            defaultValue={`${group.startGroup?.split("T")[0]}${group.startTime}`}
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
                            defaultValue={group.endGroup?.split("T")[0]}
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


            
            <Dialog
                open={openDeleteDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDeleteDialogClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Guruhni o'chirib tashlash"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Ushbu guruhni olib tashlamoqchimisiz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="error" sx={{mr: "16px"}} onClick={handleDeleteDialogClose}>Cancel</Button>
                    <Button variant="contained" color="success" onClick={hendelDeleteGroup}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    </>
}
