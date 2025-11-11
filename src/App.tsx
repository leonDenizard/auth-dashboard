import Sigin from "./pages/Sigin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/dasboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sigin/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
