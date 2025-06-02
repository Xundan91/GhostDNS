'use client'
import { useState } from "react"
import {signIn} from "next-auth/react"
import { redirect, useRouter } from "next/navigation"


export default function Loginpage(){
  const [email , setEmail] = useState('');
  const [name , setName] = useState('');
  const [password , setpassword] = useState('');
  const [error , setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault();

    const res = await signIn("credentials",{redirect:false , email , password});
    if(res?.ok){
      redirect('/dashboard');
    }else{
      setError("Invalid email and password")
    }

  }
  return(
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <label className="block mb-2">
          Email 
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
          className="w-full p-2 border rounded" required/>
        </label>
        <label className="block mb-2">
          password
          <input type = "password" value={password} onChange={e=>setpassword(e.target.value)}
          className="w-full p-2 border rounded" required />
        </label>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          sign In
          </button> 
      </form>
    </div>
    
  );
}