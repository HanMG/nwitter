import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {    
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)
  useEffect(() => {
    // firebase's authstateChange를 통해 변화를 감지    
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])
  
  return (
  <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..." }
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
  </>
  )
}

export default App;
