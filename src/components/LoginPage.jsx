import { Text, Stack, Input, Box, Button, useToast } from "@chakra-ui/react";
import { Link,  useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import { useEffect, useState, useContext } from "react";
import { LoginStatus } from "./Router";

const Linkp = styled.p`
    color: teal;
    &:hover{
        text-decoration: underline;
    }
`;

const LoginPage = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const changeLoginStatus = useContext(LoginStatus);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(()=>{
        const loginButton = document.getElementById('login-button');
        if(username && password){
            loginButton.removeAttribute('disabled');
        }else{
            loginButton.setAttribute('disabled', '');
        }
    }, [username, password])

    async function checkValidUser(){
        const response = await fetch('http://localhost:3001/blog/posts/login/auth', 
        {
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            mode:"cors",
            body:JSON.stringify({'username':`${username}`, 'password':`${password}`}),
        });
        const data = await response.json();
        if(data.status === 'success'){
            localStorage.setItem('blogUserToken', JSON.stringify(data));
            changeLoginStatus();
            navigate('/');
        }else{
            toast({
                title:'Error!',
                description:data.message,
                status:'error',
                duration:'5000',
                isClosable:true,
            });
        }
    }

    return(
        <Stack spacing={3} alignItems="center" marginTop="100px">
            <Box w="300px">
                <Input 
                placeholder="Username" 
                id="username" 
                name="username" 
                type="text"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required></Input>
            </Box>
            <Box w="300px">
                <Input 
                placeholder="Password" 
                id="userpassword" 
                name="userpassword" 
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required></Input>
            </Box>
            <Box w="300px">
                <Button 
                colorScheme="teal" 
                size="md" 
                width="inherit" 
                id="login-button"
                onClick={checkValidUser}
                >Login</Button>
            </Box>
            <Box>
                <Link to={"/user_reg"}><Linkp>Create Account</Linkp></Link>
            </Box>
        </Stack>
    );
}

export {LoginPage};