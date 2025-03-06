import React from 'react'

const Loading = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-t-transparent border-solid rounded-full animate-spin border-blue-500 border-8"></div>
      </div>
    </div>
  )
}

export default Loading