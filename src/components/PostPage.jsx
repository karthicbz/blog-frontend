import { useParams } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react';
import PostDetails from "./PostDetails";

const PostPage = ()=>{
    const params = useParams();
    return(
        <Tabs colorScheme="teal">
        <TabList>
            <Tab>Post</Tab>
            <Tab>Comments</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <PostDetails postId={params.postId}/>
            </TabPanel>
            <TabPanel>
            <p>two!</p>
            </TabPanel>
        </TabPanels>
        </Tabs>
    );
}

export default PostPage;