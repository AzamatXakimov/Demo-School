import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Login/Login";
import "./styles/styles.scss";
import { DragDropContext } from 'react-beautiful-dnd';

export const App = () => {
    return <>
        <DragDropContext>
            <Routes>
                <Route path="/*" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </DragDropContext>
    </>
}
