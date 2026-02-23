
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from './services/supabaseClient';
import { useLanguage } from './context/LanguageContext';

const Onboarding: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    sex: '',
    age: '',
    weight: '',
    height: '',
    firstName: '',
    lastName: '',
    district: '',
    email: '',
    password: ''
  });

  const districts = [
    { value: 'ancon', label: 'Ancón' },
    { value: 'ate', label: 'Ate' },
    { value: 'barranco', label: 'Barranco' },
    { value: 'brena', label: 'Breña' },
    { value: 'carabayllo', label: 'Carabayllo' },
    { value: 'chaclacayo', label: 'Chaclacayo' },
    { value: 'chorrillos', label: 'Chorrillos' },
    { value: 'cieneguilla', label: 'Cieneguilla' },
    { value: 'comas', label: 'Comas' },
    { value: 'el-agustino', label: 'El Agustino' },
    { value: 'independencia', label: 'Independencia' },
    { value: 'jesus-maria', label: 'Jesús María' },
    { value: 'la-molina', label: 'La Molina' },
    { value: 'la-victoria', label: 'La Victoria' },
    { value: 'lima', label: 'Lima' },
    { value: 'lince', label: 'Lince' },
    { value: 'los-olivos', label: 'Los Olivos' },
    { value: 'lurigancho', label: 'Lurigancho' },
    { value: 'lurin', label: 'Lurín' },
    { value: 'magdalena-del-mar', label: 'Magdalena del Mar' },
    { value: 'miraflores', label: 'Miraflores' },
    { value: 'pachacamac', label: 'Pachacámac' },
    { value: 'pucusana', label: 'Pucusana' },
    { value: 'pueblo-libre', label: 'Pueblo Libre' },
    { value: 'puente-piedra', label: 'Puente Piedra' },
    { value: 'punta-hermosa', label: 'Punta Hermosa' },
    { value: 'punta-negra', label: 'Punta Negra' },
    { value: 'rimac', label: 'Rímac' },
    { value: 'san-bartolo', label: 'San Bartolo' },
    { value: 'san-borja', label: 'San Borja' },
    { value: 'san-isidro', label: 'San Isidro' },
    { value: 'san-juan-de-lurigancho', label: 'San Juan de Lurigancho' },
    { value: 'san-juan-de-miraflores', label: 'San Juan de Miraflores' },
    { value: 'san-luis', label: 'San Luis' },
    { value: 'san-martin-de-porres', label: 'San Martín de Porres' },
    { value: 'san-miguel', label: 'San Miguel' },
    { value: 'santa-anita', label: 'Santa Anita' },
    { value: 'santa-maria-del-mar', label: 'Santa María del Mar' },
    { value: 'santa-rosa', label: 'Santa Rosa' },
    { value: 'santiago-de-surco', label: 'Santiago de Surco' },
    { value: 'surquillo', label: 'Surquillo' },
    { value: 'villa-el-salvador', label: 'Villa El Salvador' },
    { value: 'villa-maria-del-triunfo', label: 'Villa María del Triunfo' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formData.sex) newErrors.sex = true;
    if (!formData.age) newErrors.age = true;
    if (!formData.weight) newErrors.weight = true;
    if (!formData.height) newErrors.height = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formData.firstName) newErrors.firstName = true;
    if (!formData.lastName) newErrors.lastName = true;
    if (!formData.district) newErrors.district = true;
    if (!formData.email || !formData.email.includes('@')) newErrors.email = true;
    if (!formData.password || formData.password.length < 6) newErrors.password = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      try {
        // 1. Sign up user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: `${formData.firstName} ${formData.lastName}`,
            }
          }
        });

        if (authError) throw authError;

        if (authData.user) {
          // 2. Update profile with extra details
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              sex: formData.sex,
              age: parseInt(formData.age),
              weight: parseFloat(formData.weight),
              height: parseFloat(formData.height),
              district: formData.district,
              // full_name is already set by trigger via metadata, but good to ensure
              full_name: `${formData.firstName} ${formData.lastName}`
            })
            .eq('id', authData.user.id);

          if (profileError) {
            console.error("Error updating profile:", profileError);
            // Continue anyway, or show error?
          }

          localStorage.setItem('onboarding_complete', 'true');
          navigate('/dashboard');
        }
      } catch (error: any) {
        console.error("Error signing up:", error);
        alert("Error al registrar: " + (error.message || "Unknown error"));
      }
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white transition-colors duration-300 overflow-y-auto">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-[#f0f4f2] dark:border-white/5 px-6 lg:px-10 py-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 flex items-center justify-center">
              <img src="/logo.png" alt="SanFitness Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-text-main dark:text-white text-xl font-bold tracking-tight">SanFitness</h2>
          </div>
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="group flex items-center gap-2 rounded-full bg-[#f0f4f2] dark:bg-white/10 px-4 py-2 text-sm font-bold text-text-main dark:text-white hover:bg-[#e2e8e5] dark:hover:bg-white/20 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">language</span>
            <span>{language === 'es' ? 'Español' : 'English'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full px-4 py-8 lg:py-12">
        <div className="max-w-[720px] mx-auto flex flex-col gap-8 lg:gap-12">

          {/* Progress & Header */}
          <div className="flex flex-col gap-6 animate-fade-in-up">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-text-main dark:text-white uppercase tracking-wider">{t('onboarding.step')} {step} {t('onboarding.of')} 2</span>
                <span className="text-xs font-medium text-text-muted">{step === 1 ? '50%' : '100%'} {t('onboarding.completed')}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#dbe6e0] dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: step === 1 ? '50%' : '100%' }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight text-text-main dark:text-white">
                {step === 1 ? (
                  <>{t('onboarding.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">{t('onboarding.title1_highlight')}</span></>
                ) : (
                  <>{t('onboarding.title2')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">{t('onboarding.title2_highlight')}</span></>
                )}
              </h1>
              <p className="text-lg text-text-muted dark:text-gray-400 font-normal leading-relaxed">
                {step === 1
                  ? t('onboarding.desc1')
                  : t('onboarding.desc2')
                }
              </p>
            </div>
          </div>

          <form className="flex flex-col gap-10" onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}>
            {step === 1 ? (
              /* Section 1: Biometrics (Paso 1) */
              <section className="flex flex-col gap-6 p-6 lg:p-8 rounded-xl bg-surface-light dark:bg-surface-dark shadow-card border border-transparent dark:border-white/5 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary">person_check</span>
                  <h2 className="text-xl font-bold text-text-main dark:text-white">{t('onboarding.biometrics')}</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <label className="cursor-pointer group relative">
                    <input
                      className="peer sr-only"
                      name="sex"
                      type="radio"
                      value="male"
                      checked={formData.sex === 'male'}
                      onChange={(e) => handleInputChange('sex', e.target.value)}
                    />
                    <div className={`flex flex-col items-center justify-center gap-3 p-6 rounded-lg border-2 transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 hover:shadow-md bg-white dark:bg-white/5 ${errors.sex && !formData.sex ? 'border-red-500/50' : 'border-[#e5e7eb] dark:border-white/10'}`}>
                      <span className={`material-symbols-outlined text-4xl transition-colors ${formData.sex === 'male' ? 'text-primary' : 'text-gray-400'}`}>male</span>
                      <span className={`font-medium transition-colors ${formData.sex === 'male' ? 'text-primary' : 'text-text-main dark:text-white'}`}>{t('onboarding.male')}</span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 transition-opacity text-primary">
                      <span className="material-symbols-outlined filled text-xl">check_circle</span>
                    </div>
                  </label>
                  <label className="cursor-pointer group relative">
                    <input
                      className="peer sr-only"
                      name="sex"
                      type="radio"
                      value="female"
                      checked={formData.sex === 'female'}
                      onChange={(e) => handleInputChange('sex', e.target.value)}
                    />
                    <div className={`flex flex-col items-center justify-center gap-3 p-6 rounded-lg border-2 transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 hover:shadow-md bg-white dark:bg-white/5 ${errors.sex && !formData.sex ? 'border-red-500/50' : 'border-[#e5e7eb] dark:border-white/10'}`}>
                      <span className={`material-symbols-outlined text-4xl transition-colors ${formData.sex === 'female' ? 'text-primary' : 'text-gray-400'}`}>female</span>
                      <span className={`font-medium transition-colors ${formData.sex === 'female' ? 'text-primary' : 'text-text-main dark:text-white'}`}>{t('onboarding.female')}</span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 transition-opacity text-primary">
                      <span className="material-symbols-outlined filled text-xl">check_circle</span>
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-text-main dark:text-gray-300" htmlFor="age">{t('onboarding.age')}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">cake</span>
                      </span>
                      <input
                        id="age"
                        type="number"
                        min="0"
                        placeholder="25"
                        value={formData.age}
                        onKeyDown={(e) => {
                          if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') e.preventDefault();
                        }}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-black/20 text-text-main dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-input font-medium ${errors.age ? 'border-red-500/50' : 'border-gray-200 dark:border-gray-700'}`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-text-main dark:text-gray-300" htmlFor="weight">{t('onboarding.weight')}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">monitor_weight</span>
                      </span>
                      <input
                        id="weight"
                        type="number"
                        min="0"
                        placeholder="70"
                        value={formData.weight}
                        onKeyDown={(e) => {
                          if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') e.preventDefault();
                        }}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-black/20 text-text-main dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-input font-medium ${errors.weight ? 'border-red-500/50' : 'border-gray-200 dark:border-gray-700'}`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-text-main dark:text-gray-300" htmlFor="height">{t('onboarding.height')}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">height</span>
                      </span>
                      <input
                        id="height"
                        type="number"
                        min="0"
                        placeholder="175"
                        value={formData.height}
                        onKeyDown={(e) => {
                          if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') e.preventDefault();
                        }}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-black/20 text-text-main dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-input font-medium ${errors.height ? 'border-red-500/50' : 'border-gray-200 dark:border-gray-700'}`}
                      />
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              /* Section 2: Identity & Logistics (Paso 2) */
              <section className="flex flex-col gap-6 p-6 lg:p-8 rounded-xl bg-surface-light dark:bg-surface-dark shadow-card border border-transparent dark:border-white/5 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary">badge</span>
                  <h2 className="text-xl font-bold text-text-main dark:text-white">{t('onboarding.identity')}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-text-main dark:text-gray-300" htmlFor="firstName">{t('onboarding.firstName')}</label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Juan"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-black/20 text-text-main dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-input ${errors.firstName ? 'border-red-500/50' : 'border-gray-200 dark:border-gray-700'}`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-text-main dark:text-gray-300" htmlFor="lastName">{t('onboarding.lastName')}</label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Pérez"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-black/20 text-text-main dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-input ${errors.lastName ? 'border-red-500/50' : 'border-gray-200 dark:border-gray-700'}`}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-text-main dark:text-gray-300" htmlFor="district">{t('onboarding.district')}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <span className="material-symbols-outlined text-[20px]">location_on</span>
                    </span>
                    <select
                      id="district"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className={`w-full pl-10 pr-10 py-3 rounded-lg border bg-white dark:bg-black/20 text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-input appearance-none cursor-pointer ${errors.district ? 'border-red-500/50' : 'border-gray-200 dark:border-gray-700'}`}
                    >
                      <option value="" disabled>{t('onboarding.selectDistrict')}</option>
                      {districts.map(d => <option key={d.value} value={d.value} className="dark:bg-surface-dark">{d.label}</option>)}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <span className="material-symbols-outlined text-[20px]">expand_more</span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-text-main dark:text-gray-300" htmlFor="email">{t('onboarding.email')}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </span>
                    <input
                      id="email"
                      type="email"
                      placeholder="juan.perez@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-black/20 text-text-main dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-input ${errors.email ? 'border-red-500/50' : 'border-gray-200 dark:border-gray-700'}`}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-text-main dark:text-gray-300" htmlFor="password">{t('onboarding.password')}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <span className="material-symbols-outlined text-[20px]">lock</span>
                    </span>
                    <input
                      id="password"
                      type="password"
                      placeholder="******"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-black/20 text-text-main dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-input ${errors.password ? 'border-red-500/50' : 'border-gray-200 dark:border-gray-700'}`}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Footer CTA */}
            <div className="pt-2 pb-12">
              <button
                className="w-full group relative flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-[#102218] text-lg font-bold py-4 px-8 rounded-lg shadow-lg shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                type="button"
                onClick={step === 1 ? handleNext : handleSubmit}
              >
                <span>{step === 1 ? t('onboarding.next') : t('onboarding.start')}</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>

              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  className="w-full mt-4 text-sm text-text-muted hover:text-text-main dark:hover:text-white transition-colors"
                >
                  {t('onboarding.back')}
                </button>
              )}

              <p className="text-center text-xs text-text-muted mt-4">
                {t('onboarding.terms')} <a className="underline hover:text-primary transition-colors" href="#">{t('onboarding.terms_link')}</a> {t('onboarding.and')} <a className="underline hover:text-primary transition-colors" href="#">{t('onboarding.privacy_link')}</a>.
              </p>

              <div className="mt-8 pt-6 border-t border-border-light dark:border-white/10 text-center">
                <p className="text-sm text-text-muted">
                  {t('onboarding.alreadyHaveAccount')} <Link to="/login" className="font-bold text-primary hover:text-primary-hover hover:underline transition-colors">{t('onboarding.login')}</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
