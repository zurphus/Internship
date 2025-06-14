import React, { useState, useEffect, useContext } from 'react'
import "../styles/AuthModal.css"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const AuthModal = () => {

  const navigate = useNavigate()

  const [logInOrSignUp, setLogInOrSignUp] = useState(true) /* true = login */
  const { isAuthModalOpen, closeAuthModal, loginAsGuest, login, register, loginWithGoogle, resetPassword } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  //email login
  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    try {
      if (logInOrSignUp) {
        await login(email, password)
      } else {
        await register(email, password)
      }
      closeAuthModal()
      navigate('/dashboard')  // redirect on success
    } catch (err) {
      // Check for Firebase auth error codes:
      if (logInOrSignUp) {
        if (err.code === 'auth/user-not-found') {
          setError('User does not exist.')
        } else if (err.code === 'auth/wrong-password') {
          setError('Incorrect password.')
        } else {
          setError(err.message)
        }
      } else {
        setError(err.message)
      }
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    try {
      await loginWithGoogle()
      closeAuthModal()
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  /* resolve this in firebase SDK - Firebase: Error (auth/admin-restricted-operation). */
  const handleGuestLogin = async () => {
    setError('')
    try {
      await loginAsGuest()
      closeAuthModal()
      navigate('/dashboard')
      // console.log('')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email for password reset')
      return
    }
    try {
      await resetPassword(email)
      alert('Check your email for password reset link')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
    {
      isAuthModalOpen && (
        <>
          <div onClick={closeAuthModal} className="auth-modal-background"></div>
          <div className={`auth-modal ${logInOrSignUp ? 'auth-modal-login' : 'auth-modal-sign-up'}`}>
            <button onClick={closeAuthModal} className='auth-modal__close-btn'>Close</button>

            <h3>{logInOrSignUp ? 'Log In' : 'Sign Up'}</h3>

            {error && <p className="error">{error}</p>}

            <button className='auth-modal__login-btn' onClick={handleGoogleLogin}>Login with Google</button>
            <button className='auth-modal__login-btn' onClick={handleGuestLogin}>Login as Guest</button>

            <div className="auth-modal__or-wrap">
              <div></div>
              <p>or</p>
              <div></div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='auth-modal__input-wrap'>
                <label htmlFor="email">Email Address</label>
                <input
                  id='email'
                  type="email"
                  placeholder='your@email.com'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='auth-modal__input-wrap'>
                <label htmlFor="password">Password</label>
                <input
                  id='password'
                  type="password"
                  placeholder='Your password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              {logInOrSignUp && (
                <div className="forgot-password-wrap">
                  <button type="button" onClick={handleResetPassword}>Forgot Password?</button>
                </div>
              )}

              <button className='cta-btn' type="submit">{logInOrSignUp ? 'Log In' : 'Sign Up'}</button>
            </form>

            

            <p>
              {logInOrSignUp ? "Don't have an account yet?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setError('')
                  setLogInOrSignUp(!logInOrSignUp)
                }}
              >
                {logInOrSignUp ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </>
      )
    }
    </>
    
  )
}

export default AuthModal