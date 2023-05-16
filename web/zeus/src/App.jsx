import {LoginPage} from "./pages/LoginPage";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {ToastContainer} from "react-toastify";
import "./App.css"

//teste
function App() {
    return (
        <div className={"App"}>
            <div id={"globalDiv"}>
                <BrowserRouter>
                    <ToastContainer autoClose={4000} theme="colored" position="top-right"/>
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/home" element={<HomePage/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>

    );
}

export default App;
