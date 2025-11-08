import Login from "@/components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "@/pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
