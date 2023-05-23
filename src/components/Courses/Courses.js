import { Box, Button, FormControlLabel, MenuItem, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { DrawerRight } from "../DrawerRight/DrawerRight";
import { PageHead } from "../PageHead/PageHead";
import { useEffect, useRef, useState } from "react";
import { CoursesItem } from "../CoursesItem/CoursesItem";
import axios from "axios";

export const    Courses = () => {
    const [coursesDrawer, setCoursesDrawer] = useState(false);
    
    const [courses, setCourses] = useState([]);
    const titleRef = useRef()
    const priceRef = useRef()

    const getCourses = () => {
        axios.get("https://crm-c3xh.onrender.com/api/crm/category").then(data => {
            setCourses(data.data?.data)
        }).catch(err => console.log(err))
    }

    const hendelSubmit = () => {
        axios.post("https://crm-c3xh.onrender.com/api/crm/category", {
            title: titleRef.current.value,
            price: priceRef.current.value,
        }).then(data => {
            setCoursesDrawer(false)
            getCourses()
            console.log(data);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getCourses()
    }, []);
    return <>
        <Box sx={{ ml: '160px', p: '28px' }}>
            <PageHead
                setIsDrawerOpen={setCoursesDrawer}
                Title={'Kurslar'}
            />

            {/* ORIGINAL FORM  */}
            {/* <DrawerRight
                isDrawerOpen={coursesDrawer}
                setIsDrawerOpen={setCoursesDrawer}
                Title={"Yangi kurs qo'shish"}
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
                            fullWidth
                            required
                        />

                        <RadioGroup
                            row
                            aria-labelledby='demo-row-radio-buttons-group-label'
                            name='row-radio-buttons-group'
                            ml
                        >
                            <FormControlLabel
                                value='online'
                                control={<Radio />}
                                label='Online'
                            />
                            <FormControlLabel
                                value='offline'
                                control={<Radio />}
                                label='Offline'
                            />
                            <FormControlLabel
                                value='video_curs'
                                control={<Radio />}
                                label='Video curs'
                            />
                        </RadioGroup>

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
                            type='number'
                            label='Narx'
                            variant='outlined'
                            size='small'
                            fullWidth
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
                isDrawerOpen={coursesDrawer}
                setIsDrawerOpen={setCoursesDrawer}
                Title={"Yangi kurs qo'shish"}
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
                            inputRef={titleRef}
                            fullWidth
                            required
                        />

                        <TextField
                            type='number'
                            label='Narx'
                            variant='outlined'
                            size='small'
                            inputRef={priceRef}
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
            </DrawerRight>

            
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                mt: "12px",
                gap: "16px"
            }}>
                {courses.map((item, i) => (
                    <CoursesItem obj={item}/>
                ))}
            </Box>
        </Box>
    </>
}
