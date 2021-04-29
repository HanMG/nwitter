import { authService, firebaseInstance } from 'fbase'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons"

const SocialLink = () => {
    const onSocialClick = async(event) => {
        console.log(event.target.name)
        const {
            target:{name},
        } = event

        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        }else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }
        await authService.signInWithPopup(provider)        
    }

    return (
        <div>            
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={onSocialClick} name="github" className="authBtn">
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>            
            </div>           
        </div>
    )
}

export default SocialLink
