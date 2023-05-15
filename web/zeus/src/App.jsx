import {LoginPage} from "./pages/LoginPage";
import {Login} from "./components/login/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import { ToastContainer } from "react-toastify";


//teste
function App() {
  return (
      <BrowserRouter>
        <ToastContainer autoClose={4000} theme="colored" position="top-right" />
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/home" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
