import { Flex, Box, Input, Button, useToast, Toast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const NewUser = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const toast = useToast();

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }

    function handleConfirmPassword(e){
        setConfirmPassword(e.target.value);
    }

    useEffect(()=>{
        const button = document.getElementById('create-acc-button');
        if(email && password && confirmPassword){
            button.removeAttribute('disabled');
        }else{
            button.setAttribute('disabled', '');
        }
    }, [email,password,confirmPassword])

    async function saveUserCredentials(){
        if(email && password && confirmPassword){
            const sendCredentials = await fetch('http://localhost:3001/blog/posts/user/new', {
                method:"POST", 
                headers:{
                    "Content-Type": "application/json",
                },
                mode:"cors",
                body:JSON.stringify({'email':`${email}`, 'password':`${password}`}),
            });
            console.log(sendCredentials.body);
        }else{
            toast({
                title:'Error.',
                description:'Input fields should not be empty.',
                status:'error',
                duration:'5000',
                isClosable:true,
            })
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
                <Button w="300px" colorScheme="teal" onClick={saveUserCredentials} id="create-acc-button" isDisabled>Create Account</Button>
            </Box>
        </Flex>
    );
}

export default NewUser;