import { useAuth } from '@/commons/auth'
import { Button, InputField } from '@/commons/components'
import React, { useContext, useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate, useLocation } from "react-router";
import HeaderContext from '@/commons/components/Header/HeaderContext'

const RegisterPage = () => {
  const { 
    loginGoogle, 
    isAuthenticated, 
    registerPassword,
    googleAuthStatus,
    initializeGoogleAuth 
  } = useAuth()
  const { control, handleSubmit } = useForm()
  const { state } = useLocation()
  const navigate = useNavigate()
  const { setTitle } = useContext(HeaderContext)
  const googleButtonRef = useRef(null);

  const registerWithPassword = data => {
    registerPassword(data)
    navigate(state)
  }
  
  const handleGoogleLogin = () => {
    loginGoogle();
  };
  
  useEffect(() => setTitle("Register Page"));
  
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
            text: "signup_with",
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
        <h2 className="mb-2">Daftar</h2>
        <div className="card flex-shrink-0 w-full shadow-2xl bg-white">
          <form
            onSubmit={handleSubmit(registerWithPassword)}
            className="card-body not-prose"
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputField
                  label="Nama Lengkap"
                  placeholder="Masukkan nama lengkap Anda"
                  {...field}
                />
              )}
            />
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
            <Button type="submit" variant="primary" className="form-control">
              Daftar
            </Button>
            <div className="text-center text-sm text-neutral/70 mt-1">
              Sudah punya akun?{' '}
              <Link to="/login" className="btn-link normal-case">
                Log in
              </Link>
            </div>
            <div className="divider">atau</div>
            
            {/* Google custom button container - Bookshelf style */}
            <div ref={googleButtonRef} className="w-full mt-2">
              {/* Fallback button jika tombol Google gagal render */}
              {googleAuthStatus !== "LOADED" && (
                <Button onClick={handleGoogleLogin} className="w-full">
                  Daftar dengan Google
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
