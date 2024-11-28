import React, { useContext, useState } from 'react'
import { AuthContext } from './AuthProvider'
import { Link } from 'react-router-dom';

const SignUp = () => {

  const [email,  setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {signup} = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password);
      alert ('Signup successful! Thanks For joining us.');
      } catch (err) {
        setError(err.message);
        }
  }


  return (
    <div className='flex justify-center items-center h-screen bg-gray-900'>
    <form onSubmit={handleSignup}
    className='bg-white p-6 rounded-lg shadow-lg w-80 border-2 border-yellow-500'>
    <h2 className="text-2xl font-bold mb-4 text-yellow-600">Create an Account</h2>
    {error && <p style='text-red-500 mb-4'>{error}</p>}
    <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-yellow-600"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-yellow-600"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700"
        >
          Signup
        </button>
    </form>
    </div>

  )
}

export default SignUp