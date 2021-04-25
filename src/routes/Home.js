import React, { useEffect, useState } from 'react'
import Nweet from 'components/Nweet'
import { dbService, storageService } from 'fbase'
import { v4 as uuidv4 } from 'uuid'

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])
    const [attachment, setAttachment] = useState("")
    
    useEffect(() => {        
        dbService.collection("nweets").orderBy("createAt").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            }))
            setNweets(nweetArray)
        })
    },[])

    const onSubmit = async(event) => {
        event.preventDefault()
        let attachmentUrl = ""
        if(attachment !== ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            const response = await attachmentRef.putString(attachment, "data_url")
            attachmentUrl = await response.ref.getDownloadURL()            
        }
        const nweetObj = {
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        await dbService.collection("nweets").add(nweetObj)
        setNweet("")
        setAttachment("")
    }
    const onChange = (event) => {
        const {
            target:{ value }
        } = event
        setNweet(value)
    }
    // file preview
    const onFileChange = (event) => {
        const {
            target: {files}
        } = event
        const theFile = files[0];
        const reader = new FileReader()
        reader.onload = (finishedEvent) => {
            const {
                    currentTarget: { result }
            } = finishedEvent
            setAttachment(result)
        } 
        if(theFile) {
            reader.readAsDataURL(theFile)
        }
    }

    const onClearAttachmentClick = () => setAttachment("")
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    type="text"
                    placeholder="what's on mind?" 
                    maxLength={120} 
                    value={nweet} 
                    onChange={onChange} 
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && (                    
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachmentClick}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map(nweet => 
                    <Nweet 
                        key={nweet.id} 
                        nweetObj={nweet} 
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                )}
            </div>
        </div>

    )
}

export default Home