import { Skeleton, Stack, StackDivider } from '@chakra-ui/react'

const SkeletonLoading = ()=>{
    return(
        <Stack>
            <Skeleton height='40px' />
            <Skeleton height='20px' />
            <StackDivider/>
            <Skeleton height='40px' />
            <Skeleton height='20px' />
            <StackDivider/>
            <Skeleton height='40px' />
            <Skeleton height='20px' />
        </Stack>
    );
}

export default SkeletonLoading;