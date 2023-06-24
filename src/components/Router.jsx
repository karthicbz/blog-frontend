import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./Navbar";
import { Mainpage } from "./Mainpage";

const Router = ()=>{
    return(
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Mainpage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export {Router};