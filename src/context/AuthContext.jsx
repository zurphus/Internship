import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInAnonymously,
} from 'firebase/auth'
import { getFirestore, doc, setDoc, serverTimestamp, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore'

// Firestore init
const db = getFirestore()

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Register function
  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Login function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Logout function
  function logout() {
    return signOut(auth)
  }

  // Forgot password
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  // Google login
  function loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  // Guest login
  const loginAsGuest = async () => {
    const auth = getAuth()
    return await signInAnonymously(auth)
  }

  // Auth state listener + Firestore user document creation
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setCurrentUser(user)
      setLoading(false)

      if (user) {
        const uid = user.uid
        const email = user.email

        const userDocRef = doc(db, 'users', uid)
        const userData = {
          email: email || 'guest', // Handle anonymous users
          isPremium: false,
          lastLogin: serverTimestamp(),
        }

        try {
          await setDoc(userDocRef, userData, { merge: true })
          console.log('User document successfully written/updated!')
        } catch (error) {
          console.error('Error writing user document: ', error)
        }
      } else {
        console.log('User is signed out')
      }
    })

    return unsubscribe
  }, [])

    //favorites
  async function addToFavorites(movie) {
    if (!currentUser) {
      console.log('User not logged in.')
      return
    }

    const userDocRef = doc(db, 'users', currentUser.uid)

    try {
      await updateDoc(userDocRef, {
        favorites: arrayUnion(movie) // you can also store movie.id if you want
      })
      console.log('Movie added to favorites!')
    } catch (error) {
      console.error('Error adding favorite: ', error)
    }
  }

  //remove favorites
  async function removeFromFavorites(movie) {
    if (!currentUser) return

    const userDocRef = doc(db, 'users', currentUser.uid)

    try {
      await updateDoc(userDocRef, {
        favorites: arrayRemove(movie)
      })
      console.log('Movie removed from favorites')
    } catch (error) {
      console.error('Error removing from favorites:', error)
    }
  }

  // Get favorites
  async function getFavorites() {
    if (!currentUser) return []

    const userDocRef = doc(db, 'users', currentUser.uid)

    try {
      const userSnap = await getDoc(userDocRef)
      const userData = userSnap.data()

      return userData?.favorites || []
    } catch (error) {
      console.error('Error fetching favorites:', error)
      return []
    }
  }

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const openAuthModal = () => setIsAuthModalOpen(true)
  const closeAuthModal = () => setIsAuthModalOpen(false)

  const value = {
    currentUser,
    register,
    login,
    logout,
    resetPassword,
    loginWithGoogle,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    loginAsGuest,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
