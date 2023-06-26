import { useParams } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react';
import PostDetails from "./PostDetails";
import CommentSection from "./CommentSection";

const PostPage = ({authStatus})=>{
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
                <CommentSection authStatus={authStatus} postId={params.postId}/>
            </TabPanel>
        </TabPanels>
        </Tabs>
    );
}

export default PostPage;