import { Button, Stack, StackDivider, Textarea } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Box, Text, Divider, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const CommentSection = ({authStatus, postId})=>{
    const toast = useToast();
    const [comment, setComment] = useState('');
    const [commentDetails, setCommentDetails] = useState([]);

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

    async function getCommentDetails(){
        const response = await fetch(`http://localhost:3001/blog/posts/${postId}/comments`);
        const data = await response.json();
        // console.log(data);
        setCommentDetails(data);
    }

    useEffect(()=>{
        getCommentDetails();
    }, []);

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
            setComment('');
            await getCommentDetails();
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
                <Stack divider={<StackDivider/>} spacing="4">
                    {commentDetails.length !== 0?
                        commentDetails.map(comment=>{
                            return(<Box pt="4">
                                <Heading size="xs" textTransform="uppercase">
                                    {comment.user.username}
                                </Heading>
                                <Text pt="2" fontSize="md">
                                    {comment.comment}
                                </Text>
                                <Text pt="2" fontSize="xs">
                                    {comment.formatedDateTime}
                                </Text>
                            </Box>);
                        }):
                        <p>No Comments yet...</p>
                    }
                </Stack>
            </CardBody>
        </Card>
    );
}

export default CommentSection;