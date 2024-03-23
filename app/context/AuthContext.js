import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth }  from "@/config/FirebaseConfig"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const googleSignIn = () => {
    const Provider = new GoogleAuthProvider()
    signInWithPopup(auth, Provider)
      .then((result) => {
        setUser(result.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [user])

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}