import { Flex, Box, Input, Button } from "@chakra-ui/react";

const NewUser = ()=>{
    return(
        <Flex flexDirection="column" gap="4" alignItems="center" marginTop="100px">
            <Box w="300px">
                <Input placeholder="Email Id" name="email" id="email" type="email" required></Input>
            </Box>
            <Box w="300px">
                <Input placeholder="Password" name="password" id="password" type="password" required></Input>
            </Box>
            <Box w="300px">
                <Input placeholder="Confirm Password" name="confirmpassword" type="password" required></Input>
            </Box>
            <Box>
                <Button w="300px" colorScheme="teal">Create Account</Button>
            </Box>
        </Flex>
    );
}

export default NewUser;