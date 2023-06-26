import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./Navbar";
import { Mainpage } from "./Mainpage";
import { LoginPage } from "./LoginPage";
import { AboutPage } from "./AboutPage";
import PostPage from "./PostPage";
import NewUser from "./NewUser";
import { useContext, createContext, useState } from "react";

export const LoginStatus = createContext('');
const Router = ()=>{
    const [authStatus, setAuthStatus] = useState(false);

    function changeLoginStatus(){
        (localStorage.blogUserToken)?setAuthStatus(true):setAuthStatus(false);
    }

    return(
        <BrowserRouter>
        <LoginStatus.Provider value={changeLoginStatus}>
            <NavBar authStatus={authStatus}/>
            <Routes>
                <Route path="/" element={<Mainpage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/user_reg" element={<NewUser/>}></Route>
                <Route path="/post/:postId" element={<PostPage authStatus={authStatus}/>}></Route>
            </Routes>
        </LoginStatus.Provider>
        </BrowserRouter>
    );
}

export {Router};