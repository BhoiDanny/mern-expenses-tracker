import { BrowserRouter, Route, Routes } from "react-router-dom"
import HeroSection from "./components/Home/HomePage"
import PublicNavbar from "./components/Navbar/PublicNavbar"
import LoginForm from "./components/Users/Login"
import RegistrationForm from "./components/Users/Register"

export default function App() {
  return (
    <BrowserRouter>
    {/* Navbar */}
    <PublicNavbar/>
    <Routes>
      <Route path="/" element={<HeroSection/>}/>
      <Route path="/login" element={<LoginForm />}/>
      <Route path="/register" element={<RegistrationForm />}/>
    </Routes>
    </BrowserRouter>
  )
}