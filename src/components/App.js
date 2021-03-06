import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {    
  const [init, setInit] = useState(false)  
  const [userObj, setUserObj] = useState(null)
  useEffect(() => {
    // firebase's authstateChange를 통해 변화를 감지    
    authService.onAuthStateChanged((user) => {
      if(user) {        
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        })
      }else {
        setUserObj(null)
      }
      setInit(true)
    })
  }, [])  
  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    })
  }
  return (
  <div>
    {init ? 
      <AppRouter 
        refreshUser={refreshUser}
        isLoggedIn={Boolean(userObj)}
        userObj={userObj} 
      /> : "Initializing..." 
    }    
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
  </div>
  )
}

export default App;
