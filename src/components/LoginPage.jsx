import { Text, Stack, Input, Box, Button, useToast } from "@chakra-ui/react";
import { Link,  useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import { useEffect, useState, useContext } from "react";
import { LoginStatus } from "./Router";
import Spinner from "./Spinner";

const Linkp = styled.p`
    color: teal;
    &:hover{
        text-decoration: underline;
    }
`;

const LoginPage = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        const response = await fetch('https://blogapi-1ei1.onrender.com/blog/posts/login/auth', 
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
            setIsLoading(false);
            localStorage.setItem('userLoggedIn', username);
            localStorage.setItem('blogUserToken', JSON.stringify(data));
            changeLoginStatus();
            navigate(-1);
        }else{
            setIsLoading(false);
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
                >{isLoading?<Spinner/>:'Login'}</Button>
            </Box>
            <Box>
                <Link to={"/user_reg"}><Linkp>Create Account</Linkp></Link>
            </Box>
        </Stack>
    );
}

export {LoginPage};