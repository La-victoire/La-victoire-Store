import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const {user} = useContext(AuthContext);
  const location = useLocation()

  
  return user ? children: <Navigate to="/login" state={{ from: location}} replace />;
}

export default ProtectedRoute