import React from 'react'
import LoginForm from '../ui/login-form'

const page = () => {
  
  return <div className="mt-28 flex justify-center">
    <div>
      <div className='mb-5'>
        <span className="text-3xl font-extrabold text-white">
          Conference Room Booking
        </span>
      </div>
      <div className="w-96 rounded-lg shadow-2xl shadow-orange-400/30">
        <LoginForm />
      </div>
    </div>
  </div>
}

export default page