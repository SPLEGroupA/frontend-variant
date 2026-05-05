import { useAuth } from '@/commons/auth'
import { Button, InputField } from '@/commons/components'
import React, { useContext, useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate, useLocation } from "react-router";
import useAppearanceStore from '@/commons/appearance/store'
import { MdArrowBack } from 'react-icons/md'

const RegisterMobilePage = () => {
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
  const { colorTheme } = useAppearanceStore()
  const googleButtonRef = useRef(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const homeUrl = params.get('homeUrl');

  const registerWithPassword = data => {
    registerPassword(data)
    navigate(location.pathname + location.search)
  }

  const handleGoogleLogin = () => {
    loginGoogle();
  };

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
    return <Navigate to={homeUrl} />
  }

  return (
    <div data-theme={colorTheme} className="prose max-w-md mx-auto">
      <h3 className='text-white bg-primary p-5 m-0 flex items-center'>
        <Link to={homeUrl} className='no-underline'><MdArrowBack className='mr-4' color='white' /></Link>
        Register
      </h3>
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
              <Link to={`/mobile/login?homeUrl=${homeUrl}`} className="btn-link normal-case" replace>
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
  )
}

export default RegisterMobilePage
