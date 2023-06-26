import { Flex, Box, Input, Button, useToast, Toast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginStatus } from "./Router";


const NewUser = ()=>{
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
    const changeLoginStatus = useContext(LoginStatus);

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }

    function handleConfirmPassword(e){
        setConfirmPassword(e.target.value);
    }

    function handleUsername(e){
        setUsername(e.target.value);
    }

    useEffect(()=>{
        const button = document.getElementById('create-acc-button');
        if(email && password && confirmPassword && username && password === confirmPassword){
            button.removeAttribute('disabled');
        }else{
            button.setAttribute('disabled', '');
        }
    }, [email,password,confirmPassword, username])

    async function saveUserCredentials(e){
        if(email && password && confirmPassword && username){
            try{
                const sendCredentials = await fetch('http://localhost:3001/blog/posts/user/new', {
                    method:"POST", 
                    headers:{
                        "Content-Type": "application/json",
                    },
                    mode:"cors",
                    body:JSON.stringify({'email':`${email}`, 'username':`${username}`, 'password':`${password}`}),
                });
                const response = await sendCredentials.json();
                if(response.status === 'success'){
                    localStorage.setItem('blogUserToken', JSON.stringify(response));
                    changeLoginStatus();
                    // console.log(response);
                    navigate('/');
                }else{
                    toast({
                        title:'Error!',
                        description:response.message,
                        status:'error',
                        duration:'5000',
                        isClosable:true,
                    });
                }
            }catch(err){
                toast({
                    title:'Error!',
                    description:err,
                    status:'error',
                    duration:'5000',
                    isClosable:true,
                });
            }
        }else{
            toast({
                title:'Error!',
                description:'Input fields should not be empty.',
                status:'error',
                duration:'5000',
                isClosable:true,
            });
        }
    }

    return(
        <Flex flexDirection="column" gap="4" alignItems="center" marginTop="100px">
            <Box w="300px">
                <Input 
                placeholder="Email Id" 
                name="newemail" 
                id="newemail" 
                type="email"  
                onChange={handleEmail}
                value={email}
                required />
            </Box>
            <Box w="300px">
                <Input 
                placeholder="Username" 
                name="newusername" 
                id="newusername" 
                type="text"  
                onChange={handleUsername}
                value={username}
                required />
            </Box>
            <Box w="300px">
                <Input 
                placeholder="Password" 
                name="newpassword" 
                id="newpassword" 
                type="password" 
                onChange={handlePassword}
                value={password}
                required />
            </Box>
            <Box w="300px">
                <Input 
                placeholder="Confirm Password" 
                name="confirmpassword" 
                id="confirmpassword" 
                type="password" 
                onChange={handleConfirmPassword}
                value={confirmPassword}
                required />
            </Box>
            <Box>
                <Button w="300px" colorScheme="teal" onClick={saveUserCredentials} id="create-acc-button">Create Account</Button>
            </Box>
        </Flex>
    );
}

export default NewUser;