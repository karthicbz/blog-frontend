import { Box, Textarea, Button, ButtonGroup, useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import Spinner from "./Spinner";

const EditBox = styled.div`
    // opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    opacity: 0;
    visibility: hidden;
    margin: 4px 0;
`;

const CommentEditBox = ({commentText, commentId, refreshComments})=>{
    const [updatedComment, setUpdatedComment] = useState(commentText);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    async function handleUpdate(e){
        // console.log('clicked update');
        if(updatedComment !== '' && updatedComment.length > 0){
            setIsLoading(true);
            const response = await fetch(`https://blogapi-1ei1.onrender.com/blog/posts/comments/${commentId}/update`,
            {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                mode:'cors',
                body:JSON.stringify({
                    updatedComment:`${updatedComment}`
                }),
            });
            const data = await response.json();
            if(data.status === 'success'){
                setIsLoading(false);
                toast({
                    title:'Comment Updated',
                    status:'success',
                    duration:'2000',
                    isClosable:false,
                })
                await refreshComments();
                handleCancel(e)
            }else{
                setIsLoading(false);
                toast({
                    title:'Error',
                    description:'Unable to update comment',
                    duration: '2000',
                    isClosable:false,
                })
            }
        }else{
            toast({
                title:'Not Allowed 😒',
                description:'Empty comments are not allowed',
                status:'error',
                duration: '2000',
                isClosable:false,
            })
        }
    }

    function handleCancel(e){
        // console.log('clicked delete');
        const currentComment = e.target.parentNode.parentNode.parentNode.childNodes[0];
        const editBox = e.target.parentNode.parentNode;
        currentComment.removeAttribute('style');
        editBox.removeAttribute('style');
        setUpdatedComment(commentText);
        // console.log(currentComment);
    }

    return(
        <EditBox id={commentId} className="comment-edit-box">
            <Textarea 
            name='updatedcomment'
            value={updatedComment}
            onChange={(e)=>setUpdatedComment(e.target.value)}/>
            <ButtonGroup>
                <Button colorScheme='teal' mt='4' onClick={handleUpdate} size='xs'>{isLoading?<Spinner/>:'Update'}</Button>
                <Button colorScheme='teal' mt='4' onClick={handleCancel} size='xs'>Cancel</Button>
            </ButtonGroup>
        </EditBox>
    );
};

export default CommentEditBox;