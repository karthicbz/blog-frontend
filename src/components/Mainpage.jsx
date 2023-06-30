import { useState, useEffect } from "react";
import { Box, Text, useToast } from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Stack, StackDivider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SkeletonLoading from "./SkeletonText";

const Mainpage = ()=>{
    const [postDetails, setPostDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const getPostDetails = async()=>{
        try{
            setIsLoading(true);
            const response = await fetch('https://blogapi-1ei1.onrender.com/blog/posts', {"mode":"cors"});
            const postData = await response.json();
            // console.log(postData);
            setPostDetails(postData);
            setIsLoading(false);
        }catch(err){
            setIsLoading(false);
            toast({
                title:'Error',
                description:'Error fetching data, check your connection',
                status:'error',
                duration:'9000',
                isClosable:true,
            })
            setPostDetails([]);
        }
    }

    function convertToHtml(s){
        let string = s;
        let htmlObject = document.createElement('div');
        htmlObject.innerHTML = string;
        return htmlObject;
    }

    useEffect(()=>{
        getPostDetails();
    }, []);

    return(
        <Box w="100%" color="white" p="8">
            <Card>
                <CardHeader>
                    <Heading size="md">Welcome to my awesome blog {localStorage.userLoggedIn?`${localStorage.userLoggedIn}...`:'Stranger...'}</Heading>
                </CardHeader>
                {isLoading?<SkeletonLoading/>: postDetails.length>0?
                <CardBody>
                    <Stack divider={<StackDivider/>} spacing="4">
                        {postDetails.map(post=>{
                            return(<Box key={post._id}>
                                <Heading size="md" textTransform="uppercase" color="teal">
                                    <Link to={`/post/${post._id}`}>{post.title}</Link>
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                    {convertToHtml(post.textTeaser).innerText}
                                </Text>
                            </Box>)
                        })}
                    </Stack>
                </CardBody>:<Text fontSize="3xl">No Posts Yet..</Text>}
            </Card>
        </Box>
    );
}

export {Mainpage};