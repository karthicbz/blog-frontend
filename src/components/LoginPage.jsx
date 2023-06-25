import { Text, Stack, Input, Box, Button } from "@chakra-ui/react";

const LoginPage = ()=>{
    return(
        <Stack spacing={3} alignItems="center" marginTop="100px">
            <Box w="300px">
                <Input placeholder="User Id" id="userid" name="userid" type="text"></Input>
            </Box>
            <Box w="300px">
                <Input placeholder="Password" id="password" name="password" type="password"></Input>
            </Box>
            <Box w="300px">
                <Button colorScheme="teal" size="md" width="inherit">Login</Button>
            </Box>
        </Stack>
    );
}

export {LoginPage};