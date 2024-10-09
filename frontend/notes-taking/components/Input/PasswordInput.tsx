import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const PasswordInput = ({ value, onChange, placeholder }) => {

  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
	setShowPassword(!showPassword)
  }

  return (
	<div className='flex items-center bg-transparent border-[1.5px] border-gray-300 px-2 rounded mb-3 my-2'>
		<input
		  value={value}
		  onChange={onChange}
		  type={showPassword ? 'text' : 'password'}
		  placeholder={placeholder || "Password"}
		  className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
		/>

		{showPassword ? (
			<FaRegEye
				size={20}
				className='cursor-pointer'
				onClick={handleShowPassword}
			/>
		) : (
			<FaRegEyeSlash
				size={20}
				className='cursor-pointer'
				onClick={handleShowPassword}
			/>
		)}
	</div>
  )
}

export default PasswordInput
