import { Box, Textarea, Button, ButtonGroup, useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";

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
    const toast = useToast();

    async function handleUpdate(e){
        // console.log('clicked update');
        const response = await fetch(`http://localhost:3001/blog/posts/comments/${commentId}/update`,
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
            toast({
                title:'Comment Updated',
                status:'success',
                duration:'2000',
                isClosable:false,
            })
            await refreshComments();
            handleCancel(e)
        }else{
            toast({
                title:'Error',
                description:'Unable to update comment',
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
                <Button colorScheme='teal' mt='4' onClick={handleUpdate} size='xs'>Update</Button>
                <Button colorScheme='teal' mt='4' onClick={handleCancel} size='xs'>Cancel</Button>
            </ButtonGroup>
        </EditBox>
    );
};

export default CommentEditBox;