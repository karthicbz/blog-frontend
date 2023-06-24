import styled from "@emotion/styled";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import dark from "../assets/icons/dark_mode.svg";
import light from "../assets/icons/light_mode.svg";


const Nav = styled.nav`
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;
`;

const FlexUL = styled.ul`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const ThemeToggler = styled.button`
    border: none;
    background-color: unset;
    align-self: end;
`;

const NavBar = ()=>{
    const {colorMode, toggleColorMode} = useColorMode();
    return(
        <Nav>
            <Heading as="h3" size="lg" color="teal">
                <Link to={"/"}>PK's Blog</Link>
            </Heading>
            <FlexUL>
                <ThemeToggler onClick={toggleColorMode}>
                {colorMode === 'light' ? 
                <span className="material-symbols-outlined" style={{color:"teal"}}>dark_mode</span> : 
                <span class="material-symbols-outlined" style={{color:"teal"}}>light_mode</span>}
                </ThemeToggler>
                <Button colorScheme="teal" variant="outline"><Link to={"/about"}>About</Link></Button>
                <Button colorScheme="teal" variant="outline"><Link to={"/login"}>Login</Link></Button>
            </FlexUL>
        </Nav>
    );
}

export {NavBar};