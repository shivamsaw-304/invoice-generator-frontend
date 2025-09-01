import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import PreviewPage from "./pages/PreviewPage.jsx";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard.jsx";
import Menubar from "./components/Menubar.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
// import UserSyncHandler from "./components/UserSyncHandler.jsx";
// import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const App = () => {
    return (
    <Router>
    <Menubar />
    <Toaster/>
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/generate" element={<MainPage />} />
    </Routes>

    </Router>
    )
}
export default App;
