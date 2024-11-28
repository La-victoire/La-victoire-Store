import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <>
    <div className='bg-red-500 text-center text-white px-4 py-2'>
    Error
    </div>
    <p className='text-center'>
      Need Help Going back 
    </p>
    <Link to='/'>
    <button className='text-white text-center ms-36 px-4 py-2 bg-green-500'>
      Click Here
    </button>
    </Link>

    </>
  )
}

export default Error