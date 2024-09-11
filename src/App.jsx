import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import AppLayout from "./AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
