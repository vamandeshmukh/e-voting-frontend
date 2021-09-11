import React from "react";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link } from 'react-router-dom';
import "../Home.css";

function Footer() {
  return (
    <div className="footer mt-4">
      <div className="socialMedia">
        {/* <a href="https://www.google.com/" target="_blank"><HomeIcon /></a> */}
        <Link to="/home"><HomeRoundedIcon/></Link>
      </div>
      <p> &copy; 2021 e-voting.com</p>
    
    </div>
  );
}

export default Footer;
