import { Button, Textarea } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Box, Text, Divider } from '@chakra-ui/react';

const CommentSection = ({authStatus})=>{

    return(
        <Card colorScheme='teal'>
            <CardBody>
                <Box>
                    <Textarea placeholder='Comment here...'/>
                    {authStatus === false?
                    <Button colorScheme='teal' mt='4' isDisabled>Post Comment</Button>:
                    <Button colorScheme='teal' mt='4'>Post Comment</Button>
                    }
                </Box>
                <Divider pt='4'/>
                <Box pt='4'>
                    <p>No comments yet..</p>
                </Box>
            </CardBody>
        </Card>
    );
}

export default CommentSection;