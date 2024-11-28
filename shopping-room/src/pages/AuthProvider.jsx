import React, { createContext } from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from 'firebase/auth'
import { auth } from './firebase';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  // As the name implies it is catching various error cases

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case 'auth/invalid-email':
        console.log('Invalid email address.');
        break;
      case 'auth/user-not-found':
        console.log('User not found.');
        break;
      case 'auth/wrong-password':
        console.log('Incorrect password.');
        break;
      case 'auth/invalid-credential':
        console.log('Invalid email and password.');
      default:
        console.log('An unknown error occurred:', error.message);
    }
  };

  const signup = (email, password) => {
    // signup logic 
    createUserWithEmailAndPassword(auth, email, password);
    };

  const login = async (email, password) => {
    // login logic 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
    } catch (error) {
      console.error('Error during login:', error.message);
      handleFirebaseError(error);
    }
    navigate('/'); // Redirect to original route or home
  };

  const logout = () => {
    signOut(auth)
    navigate('/login')
  };
  
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the current user
      setLoading(false); // Stop loading once the user state is set
    });

    return () => unsubscribe();
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
    alert('LocalStorage cleared!');
    logout();
  };

 
  
  return (
    <AuthContext.Provider value={{ user, signup, login, logout,googleLogin, clearLocalStorage}}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


