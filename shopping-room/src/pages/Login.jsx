import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {FcGoogle} from "react-icons/fc";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Error, setError] = useState(null);
  const { login,handleFirebaseError, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    console.log(from)
    try {
      await login(email, password);
      navigate(from, { replace: true });
      handleFirebaseError(err)
      setError(handleFirebaseError(err));
    } catch (err) {
      console.error('login page:',Error)
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      alert('invalid credentials')
      console.log(Error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
    <form
      onSubmit={handleLogin}
      className="bg-white p-6 rounded-lg shadow-lg w-80 border-2 border-yellow-500"
    >
      <FcGoogle className='cursor-pointer mb-3' size={24} title='Login With Google' onClick={handleGoogleLogin} > </FcGoogle>
      <h2 className="text-2xl font-bold mb-4 text-yellow-600">Log In</h2>
      {Error && <p className="text-red-500 mb-4">{error}</p>}
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
        Login
      </button>

      <p className='text-center text-green-500'>
        <small>
        <a href="/Signup">Create an account</a></small></p>
    </form>
  </div>
  );
};

export default Login;
