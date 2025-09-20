import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import {useContext} from "react";
import {SignedIn, SignedOut, useClerk, UserButton} from "@clerk/clerk-react";


const Menubar = () => {

    const {openSignIn} =  useClerk();


    const openLogin =() =>{
        openSignIn({})
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-footer shadow-sm sticky-top">
            <div className="container py-2">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <Logo />
                    <span 
                        className="fw-bolder fs-4 mx-3"
                        style={{ letterSpacing: '-0.5px', color: '#f88403' }}>
                     MI-Bill-Generator
                    </span>
                </Link>
                <button className="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarNav"
                 aria-controls="navbarNav" // same as id after closing button div id navbarNav
                 aria-expanded="false" 
                 aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center ">
                      <SignedIn>
                          <li className="nav-item">
                              <Link className="nav-link fw-medium" to="/">Home</Link>
                          </li>

                          <li className="nav-item">

                              <Link className="nav-link fw-medium" to="/dashboard"> Dashboard </Link>

                          </li>

                          <li className="nav-item">
                              <button className="nav-link fw-medium">
                                  Generate
                              </button>
                          </li>
                          <UserButton/>
                      </SignedIn>

                       <SignedOut>
                           <li className="nav-item">
                               <button className="btn btn-primary rounded-pill px-4" onClick={openLogin}>
                                   login/Signup
                               </button>
                           </li>
                       </SignedOut>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Menubar;
