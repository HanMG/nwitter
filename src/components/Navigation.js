import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const Navigation = ({ userObj }) => 
    <nav>
        <ul className="navUl">
            <li>
                <Link 
                    to="/" 
                    style={{
                        marginRight: 10
                    }}
                    className="naviLink"
                >                    
                    <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />                    
                </Link>
                <div class="navSpan">
                    <span>
                        Home
                    </span>
                </div>
            </li>
            <li>
                <Link
                    to="/profile"
                    style={{
                        marginLeft: 10,                       
                    }}
                    className="naviLink"
                >
                    <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                <div class="navSpan">
                    <span>
                        {userObj.displayName
                        ? `${userObj.displayName}의 Profile`
                        : "Profile"}
                    </span>
                </div>
                </Link>
            </li>
        </ul>
    </nav>

export default Navigation