import Login from "@/components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/dasboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
