import { authService, dbService } from 'fbase'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

export default ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const onLogOutClick = () => {
        authService.signOut()
        history.push("/")
    }

    const onChange = (event) => {
        const {
            target: { value },
        } = event
        setNewDisplayName(value)
    }

    const onSubmit = async(event) => {
        event.preventDefault()
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            })
            refreshUser()
        }
    }

    const getMyNweets = async() => {
        const nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createAt")
            .get()
        console.log(nweets.docs.map(doc =>doc.data()))
    }

    useEffect(() => {
        getMyNweets()
    }, [])

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    onChange={onChange}
                    type="text" 
                    placeholder="Display name" 
                />
                <input type="submit" value="Update profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}