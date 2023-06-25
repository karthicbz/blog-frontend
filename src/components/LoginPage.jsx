import { Text, Stack, Input, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const Linkp = styled.p`
    color: teal;
    &:hover{
        text-decoration: underline;
    }
`;

const LoginPage = ()=>{
    return(
        <Stack spacing={3} alignItems="center" marginTop="100px">
            <Box w="300px">
                <Input placeholder="User Id" id="userid" name="userid" type="text"></Input>
            </Box>
            <Box w="300px">
                <Input placeholder="Password" id="userpassword" name="userpassword" type="password"></Input>
            </Box>
            <Box w="300px">
                <Button colorScheme="teal" size="md" width="inherit">Login</Button>
            </Box>
            <Box>
                <Link to={"/user_reg"}><Linkp>Create Account</Linkp></Link>
            </Box>
        </Stack>
    );
}

export {LoginPage};