import { Box, Textarea, Button, ButtonGroup } from "@chakra-ui/react";
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

const CommentEditBox = ({commentText, commentId})=>{
    const [updatedComment, setUpdatedComment] = useState(commentText);

    function handleUpdate(){
        console.log('clicked update');
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