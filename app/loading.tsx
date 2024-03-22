import React from 'react'
import { FaSpinner } from 'react-icons/fa6'
export default function loading() {
  return (
    <div className='h-screen flex justify-center items-center'>
        <FaSpinner className='animate-spin h-10 w-10 text-blue-500' />
    </div>
  )
}
