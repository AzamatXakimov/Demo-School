import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { DashBoard } from "../../components/DashBoard/DashBoard";
import { Box } from "@mui/material";
import { NavBar } from "../../components/NavBar/NavBar";
import { Teachers } from "../../components/Teachers/Teachers";
import { Courses } from "../../components/Courses/Courses";
import { Groups } from "../../components/Groups/Groups";
import { Settings } from "../../components/Settings/Settings";
import { Students } from "../../components/Students/Students";
import { Leads } from "../../components/Leads/Leads";
import { StudentSingle } from "../../components/StudentSingle/StudentSingle";
import { GroupSingle } from "../../components/GroupSingle/GroupSingle";

export const Home = () => {
    const {token} = useSelector((state) => state);
    const navigate = useNavigate()

    useEffect(() => {
        console.log(token.token);
        if(!token.token) {
            navigate("/login")
        }
    }, [token.token]);
    return <>
        <Header/>

        <Box position="relative" sx={{
            mt: "67.97px"
        }}>
            <NavBar />
            <Routes>
                <Route path="/" element={<DashBoard/>}/>

                <Route path="students" element={<Students/>}/>
                <Route path="students/:page" element={<Students/>}/>
                <Route path="students/single/:studentId" element={<StudentSingle/>}/>

                <Route path="teachers" element={<Teachers/>}/>
                <Route path="teachers/:page" element={<Teachers/>}/>
                
                <Route path="courses" element={<Courses/>}/>

                <Route path="groups" element={<Groups/>}/>
                <Route path="groups/:page" element={<Groups/>}/>
                <Route path="groups/single/:groupId" element={<GroupSingle/>}/>

                <Route path="leads" element={<Leads/>}/>
                
                <Route path="settings" element={<Settings/>}/>
            </Routes>
        </Box>
    </>
}
