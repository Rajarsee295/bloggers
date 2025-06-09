import { useState } from "react";
import { useUser } from '../contexts/User';

const Auth = ({ isOpen, onClose }) => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [mode, setMode] = useState('sign_in')
  const { sign_in, sign_up } = useUser()

  const changeMode = () => {
    setMode('sign_in')
  }

  const handleSubmit = () => {
    if( mode === 'sign_in'){
      if (sign_in(email, password)) {
      setEmail('')
      setPassword('')
      onClose()
      }
      else {
      alert("Invalid Credentials")
      }
    }
    else{
      if (sign_up(username, email, password)) {
      setUsername('')
      setEmail('')
      setPassword('')
      onClose()
      }
      else alert("Please fill all the credentials")
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-xl w-1/4">

          <div className="text-right">
            <button
              onClick={() => { changeMode(); onClose(); }}
              className="px-3 py-0.5  text-white rounded active:bg-custom-gray"
            >
              ✖
            </button>
          </div>
          {mode === 'sign_in' ? <h3 className="text-center text-[22px]">Welcome Back</h3> : <h3 className="text-center text-[22px]">Create Account</h3>}
          <form onSubmit={handleSubmit}>

            {mode === 'sign_in' ? <div></div> : <div className="text-center pb-2.5 pt-8">
              <input type="username" placeholder="Username" className="w-[90%] h-[50px] border rounded-lg px-3 focus:border-custom-blue outline-none" value={username} onChange={(e) => setUsername(e.target.value.trim())} required />
            </div>}

            <div className="text-center py-5">
              <input type="email" placeholder="Email" className="w-[90%] h-[50px] border rounded-lg px-3 focus:border-custom-blue outline-none" value={email} onChange={(e) => setEmail(e.target.value.trim())} required />
            </div>

            <div className="text-center py-2.5">
              <input type="password" placeholder="Password" className="w-[90%] h-[50px] border rounded-lg px-3 focus:border-custom-blue outline-none" value={password} onChange={(e) => setPassword(e.target.value.trim())} required />
            </div>

            {mode === 'sign_in' ? <div className="text-center py-5">
              <button className=" bg-custom-blue h-[50px] w-[90%] border rounded-lg text-white hover:bg-custom-blue-2 active:opacity-75 transition duration-150 " >Sign In</button>
            </div> : <div className="text-center py-5">
              <button className=" bg-custom-blue h-[50px] w-[90%] border rounded-lg text-white hover:bg-custom-blue-2 active:opacity-75 transition duration-150 ">Sign Up</button>
            </div>}

            <div className="text-center">
              {mode === 'sign_in' ? <h5 className=" text-custom-gray-2 ">Dont have an account? <a className="text-custom-blue underline hover:cursor-pointer" onClick={() => { setMode('sign_up') }}>Sign Up</a></h5> : <h5 className=" text-custom-gray-2 " >Already have an account? <a className="text-custom-blue underline hover:cursor-pointer" onClick={() => { setMode('sign_in') }}>Sign In</a></h5>}
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Auth