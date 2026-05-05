import React, { useEffect, useContext, useRef } from 'react'
import { Link, Navigate, useNavigate, useLocation } from "react-router";
import { Button, InputField } from '@/commons/components'
import { useAuth } from '@/commons/auth'
import { Controller, useForm } from 'react-hook-form'
import HeaderContext from '@/commons/components/Header/HeaderContext'

const LoginPage = () => {
  const { setTitle } = useContext(HeaderContext)
  const { control, handleSubmit } = useForm()
  const { 
    isAuthenticated, 
    loginGoogle, 
    loginPassword,
    googleAuthStatus,
    initializeGoogleAuth
  } = useAuth()
  const { state } = useLocation()
  const navigate = useNavigate()
  const googleButtonRef = useRef(null);

  const loginWithPassword = data => {
    loginPassword(data)
    navigate(state)
  }

  const handleGoogleLogin = () => {
    loginGoogle();
  };
  
  useEffect(() => setTitle("Login Page"));
  
  useEffect(() => {
    // Pastikan Google sudah diinisialisasi terlebih dahulu
    if (googleAuthStatus === "LOADED" && window.google && window.google.accounts) {
      initializeGoogleAuth();
      
      // Kemudian render tombol
      if (googleButtonRef.current) {
        googleButtonRef.current.innerHTML = '';
        
        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          { 
            theme: "outline", 
            size: "large",
            type: "standard",
            text: "signin_with",
            shape: "rectangular",
            width: googleButtonRef.current.offsetWidth,
            logo_alignment: "center"
          }
        );
      }
    }
  }, [googleAuthStatus, initializeGoogleAuth]);
  
  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="h-full bg-base-200 grid place-items-center py-16 px-6">
      <div className="prose w-full max-w-md">
        <h1>Log in</h1>
        <div className="card flex-shrink-0 w-full shadow-2xl bg-white">
          <form
            onSubmit={handleSubmit(loginWithPassword)}
            className="card-body not-prose"
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputField
                  type="email"
                  label="Email"
                  placeholder="Masukkan email"
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputField
                  type="password"
                  label="Password"
                  placeholder="Masukkan password"
                  {...field}
                />
              )}
            />
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="btn btn-ghost btn-sm normal-case"
              >
                Lupa Password
              </Link>
            </div>
            <Button type="submit" variant="primary" className="form-control">
              Masuk
            </Button>
            <div className="text-center text-sm text-neutral/70 mt-1">
              Belum punya akun?{' '}
              <Link to="/register" className="btn-link normal-case">
                Daftar
              </Link>
            </div>
            <div className="divider">atau</div>
            
            {/* Google custom button container - Bookshelf style */}
            <div ref={googleButtonRef} className="w-full mt-2">
              {/* Fallback button jika tombol Google gagal render */}
              {googleAuthStatus !== "LOADED" && (
                <Button onClick={handleGoogleLogin} className="w-full">
                  Masuk dengan Google
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
