import LoginForm from '../../components/LoginForm';

import Link from 'next/link'

// Renders the login page with a styled container and LoginForm component.
const LoginPage = () => {
  return (
    <div className="bg-[#D0A691] flex flex-col justify-center items-center p-10">
       <LoginForm /> 
      
    </div>
    
  )
}

export default LoginPage