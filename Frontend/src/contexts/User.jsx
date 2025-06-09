import { useContext,createContext,useState, Children } from "react";

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
       throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

let mockUsers = [
    { id: '1', username: 'john_doe', email: 'john@example.com' },
    { id: '2', username: 'jane_smith', email: 'jane@example.com' },
    { id: '3', username: 'alex_dev', email: 'alex@example.com' },
];

export const UserProvider = ({children}) => {
    
   const [user,setUser] =useState(null);
   
   const sign_in =  (email,password)  => {
    const flag = mockUsers.find( u => u.email === email)
    if(flag && password.length>0){
      setUser(flag)
      return true;
    }
    return false
   }

   const sign_up =(username,email,password) => {
      if(username && email && password.length>0){
        const newUser={
        id: Date.now().toString(),
        username,
        email
        }
        mockUsers.push(newUser)
        setUser(newUser)
        return true
      }
      return false
    }

    const sign_out = () => {
      setUser(null)
    }
    
   return (
    <UserContext.Provider value = {{
        sign_up,
        user,
        sign_in,
        sign_out,
    }}>
        {children}
        </UserContext.Provider>
   )
}