import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToken } from "../../redux/token/tokenActions";

export const Login = () => {
    const userNameRef = useRef()
    const passwordRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const hendelSubmit = () => {
        // axios.post("http://localhost:5000/user/login", {
        //     userName: userNameRef.current.value,
        //     password: passwordRef.current.value,
        // }).then(res => {
        //     if(res.status === 201){
        //         dispatch(addToken(res.data.token));
        //         localStorage.setItem("token", res.data.token)
        //         navigate("/")
        //     }
        // }).catch(error => console.log(error))



        dispatch(addToken(userNameRef.current.value));
        localStorage.setItem("token", userNameRef.current.value)
        navigate("/")
    }
    return <>
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
        }}>
            <Paper elevation={5} sx={{
                maxWidth: "418px",
                width: "100%",
                padding: "16px",
                backgroundColor: "#eee",
                borderRadius: "12px", 
            }}>
                <Typography variant="h5" component="h2" sx={{
                    fontWeight: "bold",
                }}>Sing In</Typography>
                <Typography variant="subtitle1" sx={{
                    marginBottom: "32px",
                    color: "#616161",
                }}>
                    mod-me example
                </Typography>

                <form onSubmit={evt => {
                    evt.preventDefault()
                    hendelSubmit()
                }}>
                    <Stack spacing={3}>
                        <TextField type="text" label="Username" inputRef={userNameRef} size="small"  required/>
                        <TextField type="password" label="Password" inputRef={passwordRef} size="small" required/>
                        <Button type="submit" variant="contained" sx={{
                            backgroundColor: "#2196F3",

                            "&:hover": {
                                backgroundColor: "#2196F3"
                            }
                        }}>Login</Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    </>
}
