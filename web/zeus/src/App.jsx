import {LoginPage} from "./pages/LoginPage";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {ToastContainer} from "react-toastify";
import "./App.css"
import {RegisterPage} from "./pages/RegisterPage";
import {ForgotPassword} from "./components/forgotPassword/ForgotPassword";
import {ResetPassword} from "./components/resetPassword/ResetPassword";

function App() {
    return (
        <BrowserRouter>
            <ToastContainer autoClose={4000} theme="colored" position="top-right"/>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
                <Route path={"/forgotPassword"} element={<ForgotPassword/>}/>
                <Route path={"/reset-password"} element={<ResetPassword/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
