import styled from "@emotion/styled";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const Nav = styled.nav`
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;
    background: #181a1b;
`;

const Li = styled.li`
    list-style-type: none;
`;

const FlexUL = styled.ul`
    display: flex;
    gap: 1rem;
`;

const NavBar = ()=>{
    return(
        <Nav>
            <Heading as="h3" size="lg" color="teal">
                <Link to={"/"}>PK's Blog</Link>
            </Heading>
            <FlexUL>
                <Button colorScheme="teal" variant="outline"><Link to={"/about"}>About</Link></Button>
                <Button colorScheme="teal" variant="outline"><Link to={"/login"}>Login</Link></Button>
            </FlexUL>
        </Nav>
    );
}

export {NavBar};