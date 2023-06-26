import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./Navbar";
import { Mainpage } from "./Mainpage";
import { LoginPage } from "./LoginPage";
import { AboutPage } from "./AboutPage";
import PostPage from "./PostPage";
import NewUser from "./NewUser";

const Router = ()=>{
    return(
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Mainpage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/user_reg" element={<NewUser/>}></Route>
                <Route path="/post/:postId" element={<PostPage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export {Router};