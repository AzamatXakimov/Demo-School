import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, InputAdornment, MenuItem, Paper, Radio, RadioGroup, Slide, Stack, Tab, Tabs, TextField, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AllInboxOutlinedIcon from '@mui/icons-material/AllInboxOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';
import EditIcon from '@mui/icons-material/Edit';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { DrawerRight } from "../DrawerRight/DrawerRight";
import { BigDrawerRight } from "../BigDrawerRight/BigDrawerRight";
import { MyTabPanel } from "../MyTabPanel/MyTabPanel";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export const StudentSingle = () => {
    const {studentId} = useParams()
    const [student, setStudent] = useState({})
    const [studentGroup, setStudentGroup] = useState({})
    const navigate = useNavigate()
    const [value, setValue] = useState(0);

    const getStudentGroup = (id) => {
        axios.get(`https://crm-c3xh.onrender.com/api/crm/groups/${id}`).then(data => {
            setStudentGroup(data.data?.data);
        }).catch(err => console.log(err))
    }

    const getStudent = (id) => {
        axios.get(`https://crm-c3xh.onrender.com/api/crm/student/${id}`).then(data => {
            setStudent(data.data?.data)

            getStudentGroup(data.data?.data.group)
        }).catch(err => console.log(err))
    }

    const handleChange = (event, newValue) => {
		setValue(newValue);
	};

    // PAYME 
    const [payMeDrawer, setPayMeDrawer] = useState(false);
    const [groups, setGroups] = useState([])
    const [patMeRadio, setPatMeRadio] = useState("naxt")
    const patMeCourseRef = useRef()
    const patMeZoneRef = useRef()
    const patMeFullNameRef = useRef()
    const patMeLastNameRef = useRef()
    const patMePhoneRef = useRef()
    const patMePriceRef = useRef()
    const patMeDescRef = useRef()

    const hendelPayMeSubmit =() => {
        axios.post("https://crm-c3xh.onrender.com/api/crm/kirim", {
            category: patMeCourseRef.current.value.split("&")[1],
            filial: patMeZoneRef.current.value,
            fullName: patMeFullNameRef.current.value,
            lastName: patMeLastNameRef.current.value,
            phoneNumber: `+998 ${patMePhoneRef.current.value}`,
            price: patMePriceRef.current.value,
            paymentType: patMeRadio,
            description: patMeDescRef.current.value
        }).then(data => {
            console.log(data);
            setPayMeDrawer(false)
        }).catch(err => console.log(err))


        axios.post(`https://crm-c3xh.onrender.com/api/crm/student/addstudent/${studentId}`, {
            id: patMeCourseRef.current.value.split("&")[0]
        }).then(data => console.log(data)).catch(err => console.log(err))
    }


    // EDIT 
    const [editDrawer, setEditDrawer] = useState(false);
    const [courses, setCourses] = useState([])

    const editNameRef = useRef()
    const editAgeRef = useRef()
    const editCategoryRef = useRef()
    const editPhoneRef = useRef()
    

    const hendelEditSubmit = () => {

        axios.put(`https://crm-c3xh.onrender.com/api/crm/student/update/${studentId}`, {
            name: editNameRef.current.value,
            age: editAgeRef.current.value,
            category: editCategoryRef.current.value,
            phoneNumber: editPhoneRef.current.value
        }).then(data => {
            console.log(data);
            setEditDrawer(false)
            getStudent(studentId)
        }).catch(err => console.log(err))
    }


    // SMS MESSAGE 
    const [smsDrawer, setSmsDrawer] = useState(false);
    const [smsInputValue, setSmsInputValue] = useState("")



    const hendelSmsSubmit = () => {
        setSmsDrawer(false)
        setSmsInputValue("")
    }


    // DELETE STUDENT 
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const hendelDeleteStudent = () => {
        axios.delete(`https://crm-c3xh.onrender.com/api/crm/student/delete/${studentId}`).then(data => {
            console.log(data)
            setOpenDeleteDialog(false)
            navigate("/students")
        }).catch(err => console.log(err))
    }


    useEffect(() => {
		getStudent(studentId)

        // COURSES 
		axios.get("https://crm-c3xh.onrender.com/api/crm/category").then(data => {
			setCourses(data.data?.data)
		}).catch(err => console.log(err))


		axios.get("https://crm-c3xh.onrender.com/api/crm/groups").then(data => {
			setGroups(data.data?.data)
		}).catch(err => console.log(err))
	}, [studentId]);
    return <>
        <Box sx={{ml: '160px', p: '28px' }}>
            <Typography variant="h4" sx={{
                mb: "12px"
            }}>
                {student.name}
            </Typography>

            <Box sx={{
                display: "flex",
                alignItems: "start",
                // justifyContent: "space-between"
            }}>
                <Paper sx={{display: "flex", justifyContent: "space-between", maxWidth: "333px", width: "100%", p: "16px"}}>
                    <Box>
                        <Typography variant="h6" fontWeight="bold" sx={{mb: "20px"}}>{student.name}</Typography>

                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Typography variant="body2" sx={{mr: "4px"}}>Balansi:</Typography>
                            <Typography variant="body2" fontWeight="bold">0 so'm</Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", mb: "20px"}}>
                            <Typography variant="body2" sx={{mr: "4px"}}>Telefon:</Typography>
                            <Typography variant="body2" fontWeight="bold">{student.phoneNumber}</Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", mb: "20px"}}>
                            <Typography variant="body2" sx={{mr: "4px"}}>Yoshi:</Typography>
                            <Typography variant="body2" fontWeight="bold">{student.age}</Typography>
                        </Box>

                        <Box sx={{display: "flex", alignItems: "center",}}>
                            <Tooltip title="title" placement="bottom" sx={{mr: "4px"}}>
                                <IconButton>
                                    <AllInboxOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="title" placement="bottom" sx={{mr: "4px"}}>
                                <IconButton>
                                    <CachedOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="To'lov qo'shish" placement="bottom" sx={{mr: "4px"}}>
                                <IconButton onClick={() => {
                                    setPayMeDrawer(true)
                                }}>
                                    <PaymentsOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="title" placement="bottom" sx={{mr: "4px"}}>
                                <IconButton>
                                    <UndoOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Kalkulyator" placement="bottom" >
                                <IconButton>
                                    <CalculateOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <Tooltip title="title" placement="right" sx={{mb: "4px"}}>
                            <IconButton>
                                <OutlinedFlagOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="O'zgartirish kiritish" placement="right" sx={{mb: "4px"}}>
                            <IconButton onClick={() => {
                                setEditDrawer(true)
                            }}>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Xabar jo'natish" placement="right" sx={{mb: "4px"}}>
                            <IconButton onClick={() => {
                                setSmsDrawer(true)
                            }}>
                                <MapsUgcRoundedIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="O'chirish" placement="right" sx={{mb: "4px"}}>
                            <IconButton onClick={() => {
                                setOpenDeleteDialog(true);
                            }}>
                                <DeleteOutlineRoundedIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Paper>

                <Box sx={{width: "100%", ml: "16px"}}>
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
                                label='Profil'
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
                                label="Qo'ng'iroqlar tarixi"
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
                                label='Tarix'
                                disableRipple={true}
                            />
                        </Tabs>
                    </Box>

                    <Box sx={{p:"16px"}}>
                        <MyTabPanel value={value} index={0}>
                            <Paper elevation="6" sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: "12px",
                                p: "12px",
                                borderLeft: "4px solid #3949AB",
                                borderRadius: "4px",
                            }}>
                                <Typography variant="h6" fontWeight="bold" sx={{color: "#616161"}}>{studentGroup.category}</Typography>

                                <IconButton>
                                    <OutlinedFlagOutlinedIcon/>
                                </IconButton>
                            </Paper>

                            <Typography variant="h4" fontWeight="bold" sx={{mb: "12px", color: "#616161"}}>Guruhlar</Typography>

                            <Paper elevation="6" sx={{
                                maxWidth: "470px",
                                width: "100%",
                                mb: "12px",
                                p: "12px",
                            }}>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "space-between",
                                    mb: "12px",
                                    pb: "12px",
                                    borderBottom: "1px solid #eee"
                                }}>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold" sx={{
                                            color: "#616161",
                                        }}>{studentGroup.category}</Typography>
                                        <Typography variant="subtitle1" fontWeight="bold" sx={{
                                            color: "#616161",
                                        }}>{studentGroup.teacher}</Typography>
                                    </Box>

                                    <Box sx={{
                                        maxWidth: "96px",
                                        width: "100%",
                                    }}>
                                        <Typography variant="body2" sx={{
                                            color: "#616161"
                                        }}>{studentGroup.startGroup?.split("T")[0]} - {studentGroup.endGroup?.split("T")[0]}</Typography>
                                        <Typography variant="body2" sx={{
                                            color: "#616161"
                                        }}>{studentGroup.day}*{studentGroup.startTime}</Typography>
                                    </Box>
                                </Box>


                                <Box>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}>
                                        <Typography variant="subtitle1" sx={{
                                            mr: "6px",
                                            color: "#616161"
                                        }}>Holat:</Typography>
                                        <Typography variant="subtitle1" fontWeight="bold" sx={{
                                            color: "#616161"
                                        }}>Harakatsiz (Sinov)</Typography>
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}>
                                        <Typography variant="subtitle1" sx={{
                                            mr: "6px",
                                            color: "#616161"
                                        }}>Talaba qo'shilgan sana:</Typography>
                                        <Typography variant="subtitle1" fontWeight="bold" sx={{
                                            color: "#616161"
                                        }}>{student.createdAt?.split("T")[0]}</Typography>
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}>
                                        <Typography variant="subtitle1" sx={{
                                            mr: "6px",
                                            color: "#616161"
                                        }}>Bu talaba uchun narx:</Typography>
                                        <Typography variant="subtitle1" fontWeight="bold" sx={{
                                            color: "#616161"
                                        }}>700 000 so'm</Typography>
                                    </Box>
                                </Box>
                            </Paper>

                            <Typography variant="h4" fontWeight="bold" sx={{mb: "12px", color: "#616161"}}>To'lovlar</Typography>

                            <Paper elevation="6" sx={{
                                p: "12px",
                                textAlign: "center",
                            }}>
                                Ma`lumot topilmadi
                            </Paper>
                        </MyTabPanel>

                        <MyTabPanel value={value} index={1}>
                            <Paper elevation="6" sx={{
                                p: "12px",
                                textAlign: "center",
                            }}>
                                Ma`lumot topilmadi
                            </Paper>
                        </MyTabPanel>

                        <MyTabPanel value={value} index={2}>
                            <Typography sx={{
                                color: "#616161"
                            }}>Student History</Typography>
                        </MyTabPanel>
                    </Box>
                </Box>
            </Box>

            {/* ORIGINAL PAYME FORM  */}
            {/* <DrawerRight
                isDrawerOpen={payMeDrawer}
                setIsDrawerOpen={setPayMeDrawer}
                Title={"Yangi xodim qo'shish"}
            >
                <form
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        hendelPayMeSubmit()
                    }}
                >
                    <Stack spacing={3}>
                        <TextField
                            type='text'
                            label='Ismi'
                            variant='outlined'
                            size='small'
                            defaultValue={student.name}
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
                            {courses.map((item, i) => (
                                <MenuItem value={item.title} key={i}>{item.title}</MenuItem>
                            ))}
                        </TextField>

                        
                        <RadioGroup
                            row
                            aria-labelledby='demo-row-radio-buttons-group-label'
                            name='row-radio-buttons-group'
                            defaultValue='naxt'
                        >
                            <FormControlLabel
                                value='naxt'
                                control={<Radio />}
                                label='Naxt pul'
                            />
                            <FormControlLabel
                                value='payme'
                                control={<Radio />}
                                label='Payme'
                            />
                            <FormControlLabel
                                value='plastik'
                                control={<Radio />}
                                label='Plastik karta'
                            />
                            <FormControlLabel
                                value='click'
                                control={<Radio />}
                                label='Click'
                            />
                            <FormControlLabel
                                value='bank'
                                control={<Radio />}
                                label='Bank xisobi'
                            />
                            <FormControlLabel
                                value='apelsin'
                                control={<Radio />}
                                label='Apelsin'
                            />
                        </RadioGroup>

                        <TextField
                            type='number'
                            label='Miqdor'
                            variant='outlined'
                            size='small'
                            fullWidth
                            required
                        />

                        <TextField
                            type='date'
                            label="Sana"
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

            {/* MY CUSTOM PAYME FORM  */}
            <DrawerRight
                isDrawerOpen={payMeDrawer}
                setIsDrawerOpen={setPayMeDrawer}
                Title={"Tolov qo'shish"}
            >
                <form
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        hendelPayMeSubmit()
                    }}
                >
                    <Stack spacing={3}>
                        <TextField
                            type='text'
                            label='Ism'
                            variant='outlined'
                            size='small'
                            value={student.name}
                            inputRef={patMeFullNameRef}
                            fullWidth
                            required
                        />
                        <TextField
                            type='text'
                            label='Familia'
                            variant='outlined'
                            size='small'
                            inputRef={patMeLastNameRef}
                            fullWidth
                            required
                        />
                        <TextField
                            type='text'
                            label='Filial'
                            variant='outlined'
                            size='small'
                            inputRef={patMeZoneRef}
                            fullWidth
                            required
                        />

                        <TextField
                            label='Telefon raqami'
                            variant='outlined'
                            size='small'
                            inputRef={patMePhoneRef}
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
                            id='outlined-select-currency'
                            select
                            label='Gruppani tanlang'
                            size='small'
                            inputRef={patMeCourseRef}
                            fullWidth
                            required
                        >
                            {groups.map((item, i) => (
                                <MenuItem value={`${item._id}&${item.category}`} key={i}>{`${item.category} - ${item.teacher} - ${item.startTime}`}</MenuItem>
                            ))}
                        </TextField>

                        
                        <RadioGroup
                            row
                            aria-labelledby='demo-row-radio-buttons-group-label'
                            name='row-radio-buttons-group'
                            defaultValue='naxt'
                            onChange={evt => {
                                setPatMeRadio(evt.target.value)
                            }}
                        >
                            <FormControlLabel
                                value='naxt'
                                control={<Radio />}
                                label='Naxt pul'
                            />
                            <FormControlLabel
                                value='payme'
                                control={<Radio />}
                                label='Payme'
                            />
                            <FormControlLabel
                                value='plastik'
                                control={<Radio />}
                                label='Plastik karta'
                            />
                            <FormControlLabel
                                value='click'
                                control={<Radio />}
                                label='Click'
                            />
                            <FormControlLabel
                                value='bank'
                                control={<Radio />}
                                label='Bank xisobi'
                            />
                            <FormControlLabel
                                value='apelsin'
                                control={<Radio />}
                                label='Apelsin'
                            />
                        </RadioGroup>

                        <TextField
                            type='number'
                            label='Miqdor'
                            variant='outlined'
                            size='small'
                            inputRef={patMePriceRef}
                            fullWidth
                            required
                        />

                        <TextField
                            id='outlined-multiline-static'
                            label='Tavsir'
                            multiline
                            rows={3}
                            size='small'
                            inputRef={patMeDescRef}
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


            {/* ORIGINAL EDIT FORM  */}
            {/* <DrawerRight
                isDrawerOpen={editDrawer}
                setIsDrawerOpen={setEditDrawer}
                Title={"Yangi talaba qo'shish"}
            >
                <form
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        hendelEditSubmit()
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

            {/* MY CUSTOM EDIT FORM  */}
            <DrawerRight
                isDrawerOpen={editDrawer}
                setIsDrawerOpen={setEditDrawer}
                Title={"Yangi talaba qo'shish"}
            >
                <form
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        hendelEditSubmit()
                    }}
                >
                    <Stack spacing={3}>
                        <TextField
                            label='Telefon raqami'
                            variant='outlined'
                            size='small'
                            inputRef={editPhoneRef}
                            defaultValue={student.phoneNumber}
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
                            inputRef={editNameRef}
                            defaultValue={student.name}
                            fullWidth
                            required
                        />

                        <TextField
                            type='number'
                            label="Yosh"
                            variant='outlined'
                            size='small'
                            inputRef={editAgeRef}
                            defaultValue={student.age}
                            fullWidth
                            required
                        />

                        <TextField
                            id='outlined-select-currency'
                            select
                            label='Kursni tanlang'
                            size='small'
                            defaultValue={student.category}
                            inputRef={editCategoryRef}
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

            {/* ORIGINAL SMS FORM  */}
            <BigDrawerRight
                isDrawerOpen={smsDrawer}
                setIsDrawerOpen={setSmsDrawer}
                Title={"Talabaga SMS yuborish"}
            >
                <form
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        hendelSmsSubmit()
                    }}
                >
                    <Stack spacing={3}>

                        <Typography variant="h6" fontWeight="bold">Yuboruvchi: 3700</Typography>

                        <Box>
                            <TextField
                                id='outlined-multiline-static'
                                label='Xabarni kiriting'
                                multiline
                                rows={3}
                                size='small'
                                defaultValue={smsInputValue}
                                focused={smsInputValue ? true : false}
                                onInput={evt => {
                                    setSmsInputValue(evt.target.value)
                                }}
                                fullWidth
                                required
                            />
                            <Typography variant='body1' sx={{color: "#9E9E9E"}}>{smsInputValue ? smsInputValue?.length : "0"} ta belgi</Typography>
                        </Box>

                        <Typography variant="h6" fontWeight="bold">SMS shablonlar</Typography>

                        <Button type="button" fullWidth sx={{
                            display: "block",
                            p: "12px",
                            fontSize: "14px",
                            lineHeight: "20px",
                            color: "#000",
                            textAlign: "start",
                            textTransform: "none",
                            border: "1px solid #eee",
                            boxShadow: "0px 21px 17px 0px rgba(34, 60, 80, 0.2)"
                        }} onClick={() => {
                            setSmsInputValue("Assalomu aleykum, iltimos to'lovni o'z vaqtida amalga oshiring")
                        }}>
                            Assalomu aleykum, iltimos to'lovni o'z vaqtida amalga oshiring
                        </Button>
                        <Button type="button" fullWidth sx={{
                            display: "block",
                            p: "12px",
                            fontSize: "14px",
                            lineHeight: "20px",
                            color: "#000",
                            textAlign: "start",
                            textTransform: "none",
                            border: "1px solid #eee",
                            boxShadow: "0px 21px 17px 0px rgba(34, 60, 80, 0.2)"
                        }} onClick={() => {
                            setSmsInputValue("Assalomu aleykum, webinarda qatnashganingizdan hursandmiz")
                        }}>
                            Assalomu aleykum, webinarda qatnashganingizdan hursandmiz
                        </Button>
                        <Button type="button" fullWidth sx={{
                            display: "block",
                            p: "12px",
                            fontSize: "14px",
                            lineHeight: "20px",
                            color: "#000",
                            textAlign: "start",
                            textTransform: "none",
                            border: "1px solid #eee",
                            boxShadow: "0px 21px 17px 0px rgba(34, 60, 80, 0.2)"
                        }} onClick={() => {
                            setSmsInputValue("Assalomu aleykum, siz kutayotgan guruh ochildi! Batafsil: https://")
                        }}>
                            Assalomu aleykum, siz kutayotgan guruh ochildi! Batafsil: https://
                        </Button>
                        <Button type="button" fullWidth sx={{
                            display: "block",
                            p: "12px",
                            fontSize: "14px",
                            lineHeight: "20px",
                            color: "#000",
                            textAlign: "start",
                            textTransform: "none",
                            border: "1px solid #eee",
                            boxShadow: "0px 21px 17px 0px rgba(34, 60, 80, 0.2)"
                        }} onClick={() => {
                            setSmsInputValue("Assalomu aleykum, bugungi bayram bilan sizni o'z jamoamiz bilan qutlaymiz")
                        }}>
                            Assalomu aleykum, bugungi bayram bilan sizni o'z jamoamiz bilan qutlaymiz
                        </Button>

                        <Button variant="contained" type="submit" sx={{
                            maxWidth: "150px",
                            '&.MuiButtonBase-root': {
                                backgroundColor: "#2196F3",
                            }
                        }}>SMS YUBORISH</Button>
                    </Stack>
                </form>
            </BigDrawerRight>


            <Dialog
                open={openDeleteDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDeleteDialogClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Talabani o'chirib tashlash"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Ushbu talabani guruhdan olib tashlamoqchimisiz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="error" sx={{mr: "16px"}} onClick={handleDeleteDialogClose}>Cancel</Button>
                    <Button variant="contained" color="success" onClick={hendelDeleteStudent}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    </>
}
