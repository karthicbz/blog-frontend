import styled from "@emotion/styled";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import destroyToken from "../scripts/destroyToken";
import { useEffect, useContext } from "react";
import { LoginStatus } from "./Router";

const Nav = styled.nav`
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;

    @media screen and (max-width: 414px){
        .navBar-button{
            font-size: 0.75rem;
            height: 1.5rem;
            min-width: 1.5rem;
        }

        .blog-name{
            font-size: 1.4rem;
        }
    }
`;

const FlexUL = styled.ul`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const ThemeToggler = styled.button`
    border: none;
    background-color: unset;
    align-self: end;
    &>span{
        margin-top: 5px;
    }
`;

const P = styled.p`
    color: teal;
    font-size: 1.3rem;
    font-weight: 700;

    @media screen and (max-width: 414px){
        font-size: 0.9rem;
        font-weight: 400;
    }
`;

const NavBar = ({authStatus})=>{
    const {colorMode, toggleColorMode} = useColorMode();
    // const [loginStatus, setLoginStatus] = useState(useContext(LoginStatus));
    const changeLoginStatus = useContext(LoginStatus);

    useEffect(()=>{
        changeLoginStatus();
    }, []);

    function deleteAuthToken(){
        destroyToken();
        // setLoginStatus(false);
        changeLoginStatus();
    }

    return(
        <Nav>
            <Heading as="h3" size="lg" color="teal">
                <Link to={"/"} className="blog-name">PK's Blog</Link>
            </Heading>
            <FlexUL>
                <ThemeToggler onClick={toggleColorMode}>
                {colorMode === 'light' ? 
                <span className="material-symbols-outlined" style={{color:"teal"}}>dark_mode</span> : 
                <span className="material-symbols-outlined" style={{color:"teal"}}>light_mode</span>}
                </ThemeToggler>
                {localStorage.userLoggedIn?<P>{localStorage.userLoggedIn}</P>:<P>Stranger</P>}
                <Button colorScheme="teal" variant="outline" size='sm' className="navBar-button"><Link to={"/about"}>About</Link></Button>
                {authStatus === false?
                <Button colorScheme="teal" variant="outline" size='sm' className="navBar-button"><Link to={"/login"}>Login</Link></Button>:
                <Button colorScheme="teal" variant="outline" size='sm' className="navBar-button" onClick={deleteAuthToken}>Logout</Button>
                }
            </FlexUL>
        </Nav>
    );
}

export {NavBar};