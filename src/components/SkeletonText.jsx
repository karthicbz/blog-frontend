import { Skeleton, Stack, StackDivider } from '@chakra-ui/react'

const SkeletonLoading = ()=>{
    return(
        <Stack>
            <Skeleton height='20px' />
            <Skeleton height='60px' />
            <StackDivider/>
            <Skeleton height='20px' />
            <Skeleton height='60px' />
            <StackDivider/>
            <Skeleton height='20px' />
            <Skeleton height='60px' />
            <StackDivider/>
        </Stack>
    );
}

export default SkeletonLoading;