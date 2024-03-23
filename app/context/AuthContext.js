import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('name')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch user data from API
    // setUser(data)
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}