
import { useContext,createContext,useState, Children } from "react";

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
       throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

export const UserProvider = ({children}) => {
    
   const [user,setUser] =useState(null);
   
   const sign_in = async (email,password)  => {
    
    const user = {
      email:email,
      password:password,
    }
    
    //sending a request to the backend to check if the user exists
    try {
       const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      
      const data = await response.json();
      if (response.ok) {
        // If the response is ok, set the user
        setUser(data.user);        
        return true;
      } else {
        // If the response is not ok, log the error message
        console.error("Error signing in:", data.message);
        return false;
      }
    } catch (err) {
      console.error("Error signing in:", err);
      return false;
    } 
   }

   const sign_up = async (username,email,password) => {
       //creating a new user
        const newUser={
        id: Date.now().toString(),
        username,
        email,
        password, 
        };
         
      //seding a request to the backend to create a new user
        try{
          const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          });
          
          const data = await response.json();
          if (response.ok) {
            // If the response is ok, log the success message
            console.log("User created successfully:", data);
            setUser(newUser);
            return true
          } else {
            // If the response is not ok, log the error message
            console.error("Error creating user:", data.message);
            return false;
          }
        }catch(err){
          console.error("Error creating user:", err);
          return false;
        }
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