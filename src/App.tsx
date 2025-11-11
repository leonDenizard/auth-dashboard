import Signin from "./pages/Signin/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/dasboard/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoutes } from "./Routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
