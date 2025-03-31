import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Loading = () => {
  const {path} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    if (path) {
      const timer= setTimeout(()=>{
        navigate(`/${path}`)
      },5000)
      return ()=> clearTimeout(timer);
    }
  },[])
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-16 sm:w-20 aspect-square border-4 border-gray-300 border-t-blue-400 rounded-full animate-spin"></div>
    </div>
  )
}

export default Loading