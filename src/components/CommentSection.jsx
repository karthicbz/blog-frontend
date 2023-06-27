import { Button, Stack, StackDivider, Textarea} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Box, Text, Divider, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import styled from '@emotion/styled';
import CommentEditBox from './CommentEditBox';

const OptionGroup = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 4px;
    &>span:hover{
        cursor: pointer;
        color: teal;
    }
`;

const CommentSection = ({authStatus, postId})=>{
    const toast = useToast();
    const [comment, setComment] = useState('');
    const [commentDetails, setCommentDetails] = useState([]);
    let [deleteCount, setDeleteCount] = useState(0);

    //this method decode jwt and compare current logged in used with decoded user id
    function checkSameUser(userId){
        if(authStatus !== false){
            const decoded = jwt_decode(JSON.parse(localStorage.blogUserToken).message);
            if(decoded.userId === userId){
                return true;
            }
        }
    }

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

    //function which get all comments for the post
    async function getCommentDetails(){
        const response = await fetch(`http://localhost:3001/blog/posts/${postId}/comments`);
        const data = await response.json();
        // console.log(data);
        setCommentDetails(data);
    }

    function editMode(e){
        const editBox = e.target.parentNode.parentNode.parentNode.childNodes[1];
        const currentComment = e.target.parentNode.parentNode;
        currentComment.setAttribute('style', 'opacity: 0; visibility: hidden;');
        editBox.setAttribute('style', 'opacity: 1; visibility: visible;');
    }

    //function which allow user to delete comment
    //it deletes comments after user clicked delete icon two times within 5 sec
    //otherwise it resets the count and timer
    async function deleteMode(e){
        setDeleteCount(deleteCount += 1);
        const timer = setTimeout(()=>{
            setDeleteCount(0);
        }, 5000);
        if(deleteCount === 2){
            // console.log('comment deleted');
            const response = await fetch(`http://localhost:3001/blog/posts/${postId}/comments/${e.target.parentNode.parentNode.id}/delete`);
            const data = await response.json();
            if(data.status === 'success'){
                toast({
                    title:'Comment Deleted',
                    status:'success',
                    duration: '2000',
                    isClosable: false,
                });
                setDeleteCount(0);
                clearTimeout(timer);
                await getCommentDetails();
            }else{
                toast({
                    title:'unable to delete comment',
                    status:'error',
                    duration: '5000',
                    isClosable:true,
                })
            }
        }else{
            toast({
                title:'Alert',
                description:'Click again to confirm delete',
                status:'warning',
                duration: '2000',
                isClosable: false,
            });
        }
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
                <Stack divider={<StackDivider style={{marginBottom:'0'}}/>} spacing="4">
                    {commentDetails.length !== 0?
                        commentDetails.map(comment=>{
                            return(
                            <Box position="relative" key={comment._id}>
                                <Box pt="4" id={comment._id} className='comment-text'>
                                    <Heading size="xs" textTransform="uppercase">
                                        {comment.user.username}
                                    </Heading>
                                    <Text pt="2" fontSize="md">
                                        {comment.comment}
                                    </Text>
                                    <Text pt="2" fontSize="xs">
                                        {comment.formatedDateTime}
                                    </Text>
                                    {authStatus === true?
                                        //if jwt decoded userid and current user user id same show edit options
                                        checkSameUser(comment.user._id) === true?
                                        <OptionGroup>
                                            <span className='material-symbols-outlined' onClick={editMode}>edit</span>
                                            <span className='material-symbols-outlined' onClick={deleteMode}>delete</span>
                                        </OptionGroup>:'':''
                                    }
                                </Box>
                                <CommentEditBox commentId={comment._id} commentText={comment.comment}/>
                            </Box>
                            );
                        }):
                        <p>No Comments yet...</p>
                    }
                </Stack>
            </CardBody>
        </Card>
    );
}

export default CommentSection;