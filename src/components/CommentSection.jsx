import { Button, Textarea } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Box, Text, Divider, useToast } from '@chakra-ui/react';
import { useState } from 'react';

const CommentSection = ({authStatus, postId})=>{
    const toast = useToast();
    const [comment, setComment] = useState('');

    function handleComment(e){
        if(authStatus === false){
            toast({
                title:'UnAuthorised',
                description:'Please login to comment',
                status:'info',
                duration:'2000',
                isClosable:false,
            })
        }else{
            setComment(e.target.value);
        }
    }

    async function saveComment(){
        const parsedData = JSON.parse(localStorage.blogUserToken);
        // const decoded = jwt.verify(parsedData.message, process.env.JWT_SECRET);
        const sendComment = await fetch(`http://localhost:3001/blog/posts/${postId}/comment/new`,
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            mode:"cors",
            body: JSON.stringify({'postcomment':`${comment}`, 'userId':`${parsedData.message}`, 'postId':`${postId}`}),
        })
        const data = await sendComment.json();
        // console.log(data.status);
        if(data.status !== 'success'){
            toast({
                title:'error',
                description:`${data.message}`,
                status:'error',
                duration:'2000',
                isClosable:false,
            })
        }else{
            toast({
                title:'Comment Saved',
                // description:`${data.message}`,
                status:'success',
                duration:'2000',
                isClosable:false,
            })
        }
    }

    return(
        <Card colorScheme='teal'>
            <CardBody>
                <Box>
                    <Textarea 
                    placeholder='Comment here...' 
                    onClick={handleComment}
                    onChange={handleComment}
                    name='postcomment'
                    value={comment}/>
                    {authStatus === false?
                    <Button colorScheme='teal' mt='4' isDisabled>Post Comment</Button>:
                    <Button colorScheme='teal' mt='4' onClick={saveComment}>Post Comment</Button>
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