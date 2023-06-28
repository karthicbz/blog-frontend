import { Card, CardHeader, CardBody, CardFooter, Heading, Box, Text, Divider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import '../App.css';

const PostDetails = ({postId})=>{
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');
    const [publishedOn, setPublishedOn] = useState('');

    async function getPostDetail(){
        const response = await fetch(`https://blogapi-1ei1.onrender.com/blog/posts/${postId}`, {"mode":"cors"});
        const data = await response.json();
        // console.log(data);
        setPostTitle(data.title);
        setPostText(data.text);
        setPublishedOn(data.formatedDateTime);
    }

    useEffect(()=>{
        getPostDetail();
    }, []);

    return(
        <Card>
            <CardHeader>
                <Heading color='teal'>{postTitle}</Heading>
            </CardHeader>
            <Divider />
            <CardBody>
                <div id='markdown-content' dangerouslySetInnerHTML={{__html: postText}}/>
            </CardBody>
            <CardFooter>
                <Text fontSize="sm">Published on: {publishedOn}</Text>
            </CardFooter>
        </Card>
    );
}

export default PostDetails;