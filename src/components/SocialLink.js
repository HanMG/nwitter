import { authService, firebaseInstance } from 'fbase'
import React from 'react'

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
            <button onClick={onSocialClick} name="google">
                Continue with Google
            </button>
            <button onClick={onSocialClick} name="github">
                Continue with Github
            </button>
        </div>
    )
}

export default SocialLink
