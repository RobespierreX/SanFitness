import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './services/supabaseClient';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                // Registration Flow
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        }
                    }
                });
                if (error) throw error;
                if (data.user) {
                    // Start onboarding or go to dashboard
                    localStorage.setItem('onboarding_complete', 'true');
                    navigate('/dashboard');
                }
            } else {
                // Login Flow
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                if (data.user) {
                    localStorage.setItem('onboarding_complete', 'true');
                    navigate('/dashboard');
                }
            }
        } catch (err: any) {
            setError(err.message || 'Error en la autenticación');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white transition-colors duration-300">
            <header className="sticky top-0 z-50 w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-[#f0f4f2] dark:border-white/5 px-6 lg:px-10 py-4 transition-colors">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-10 flex items-center justify-center">
                            <img src="/logo.png" alt="SanFitness Logo" className="w-full h-full object-contain" />
                        </div>
                        <h2 className="text-text-main dark:text-white text-xl font-bold tracking-tight">SanFitness</h2>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-md p-8 rounded-xl bg-surface-light dark:bg-surface-dark shadow-card border border-transparent dark:border-white/5">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2 text-center">
                            <h1 className="text-2xl font-black text-text-main dark:text-white">
                                {isSignUp ? 'Crear Cuenta' : 'Bienvenido de nuevo'}
                            </h1>
                            <p className="text-text-muted">
                                {isSignUp ? 'Empieza tu cambio hoy mismo' : 'Ingresa a tu cuenta para continuar'}
                            </p>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleAuth} className="flex flex-col gap-4">
                            {isSignUp && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-text-main dark:text-gray-300" htmlFor="fullName">Nombre Completo</label>
                                    <input
                                        id="fullName"
                                        type="text"
                                        required={isSignUp}
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-black/20 text-text-main dark:text-white focus:ring-2 focus:ring-primary border-gray-200 dark:border-gray-700"
                                        placeholder="Juan Pérez"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-main dark:text-gray-300" htmlFor="email">Correo</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-black/20 text-text-main dark:text-white focus:ring-2 focus:ring-primary border-gray-200 dark:border-gray-700"
                                    placeholder="tu@email.com"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-main dark:text-gray-300" htmlFor="password">Contraseña</label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-black/20 text-text-main dark:text-white focus:ring-2 focus:ring-primary border-gray-200 dark:border-gray-700 pr-12"
                                        placeholder="******"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 w-full bg-primary hover:bg-primary-hover text-[#102218] font-bold py-3 rounded-lg transition-all shadow-lg shadow-primary/30 disabled:opacity-50"
                            >
                                {loading ? 'Cargando...' : (isSignUp ? 'Registrarse' : 'Iniciar Sesión')}
                            </button>
                        </form>

                        <div className="text-center text-sm text-text-muted">
                            {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
                            <button
                                type="button"
                                onClick={() => {
                                    if (isSignUp) {
                                        setIsSignUp(false);
                                    } else {
                                        navigate('/onboarding');
                                    }
                                    setError(null);
                                }}
                                className="ml-1 text-primary hover:underline font-semibold bg-transparent border-none cursor-pointer"
                            >
                                {isSignUp ? 'Inicia Sesión' : 'Regístrate'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
