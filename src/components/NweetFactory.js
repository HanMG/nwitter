import { dbService, storageService } from "fbase"
import React, { useState } from "react"
import { v4 as uuidv4 } from 'uuid'

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("")
    const [attachment, setAttachment] = useState("")    
    
    const onSubmit = async(event) => {
        event.preventDefault()
        let attachmentUrl = ""
        if(attachment !== ""){
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`)
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
        </div>
    )
}

export default NweetFactory