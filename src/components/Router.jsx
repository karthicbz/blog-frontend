import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./Navbar";
import { Mainpage } from "./Mainpage";
import { LoginPage } from "./LoginPage";
import { AboutPage } from "./AboutPage";

const Router = ()=>{
    return(
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Mainpage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export {Router};