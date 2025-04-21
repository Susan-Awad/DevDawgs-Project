import SignupForm from '../../components/SignupForm';

import Link from 'next/link'

// Renders the signup page with a styled container and SignupForm component.
const SignupPage = () => {
  return (
    <div className="bg-[#D0A691] flex flex-col justify-center items-center p-10">
       <SignupForm /> 
    </div>
    
  )
}

export default SignupPage