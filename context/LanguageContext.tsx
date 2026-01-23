
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    es: {
        // Onboarding
        'onboarding.step': 'Paso',
        'onboarding.of': 'de',
        'onboarding.completed': 'Completado',
        'onboarding.title1': 'Empezar ahora tu cambio',
        'onboarding.title1_highlight': 'físico y mental',
        'onboarding.title2': 'Finaliza tu',
        'onboarding.title2_highlight': 'configuración personal',
        'onboarding.desc1': 'Cuéntanos sobre ti para personalizar tu plan de nutrición y rendimiento.',
        'onboarding.desc2': 'Ya casi terminamos. Danos algunos detalles finales para crear tu perfil.',
        'onboarding.biometrics': 'Datos Biométricos',
        'onboarding.male': 'Hombre',
        'onboarding.female': 'Mujer',
        'onboarding.age': 'Edad',
        'onboarding.weight': 'Peso (kg)',
        'onboarding.height': 'Altura (cm)',
        'onboarding.identity': 'Identidad y Ubicación',
        'onboarding.firstName': 'Nombre',
        'onboarding.lastName': 'Apellido',
        'onboarding.district': 'Distrito',
        'onboarding.selectDistrict': 'Selecciona tu distrito',
        'onboarding.email': 'Correo Electrónico',
        'onboarding.password': 'Contraseña',
        'onboarding.next': 'Siguiente',
        'onboarding.start': 'Empezar ahora',
        'onboarding.back': 'Volver al paso anterior',
        'onboarding.terms': 'Al continuar, aceptas nuestros',
        'onboarding.terms_link': 'Términos de Servicio',
        'onboarding.privacy_link': 'Política de Privacidad',
        'onboarding.and': 'y',
        'onboarding.alreadyHaveAccount': '¿Ya tienes una cuenta?',
        'onboarding.login': 'Inicia Sesión',

        // Dashboard
        'dashboard.goodMorning': 'Buenos días',
        'dashboard.goodAfternoon': 'Buenas tardes',
        'dashboard.goodEvening': 'Buenas noches',
        'dashboard.scoreTrend': 'Tu puntaje metabólico ha subido un 5% esta semana.',
        'dashboard.viewAnalysis': 'Ver Análisis Completo',

        // Sidebar
        'sidebar.subtitle': 'COME SANO, VIVE MEJOR',
        'sidebar.dashboard': 'Dashboard',

        // Profile
        'profile.title': 'Editar Perfil',
        'profile.accountData': 'Datos de Cuenta',
        'profile.physicalProfile': 'Perfil Físico',
        'profile.firstName': 'Nombre',
        'profile.lastName': 'Apellido',
        'profile.email': 'Correo Electrónico',
        'profile.weight': 'Peso (kg)',
        'profile.height': 'Altura (cm)',
        'profile.age': 'Edad',
        'profile.save': 'Guardar Cambios',
        'profile.saving': 'Guardando...',
        'profile.success': 'Perfil actualizado correctamente',
        'profile.error': 'Error al actualizar perfil',
        'sidebar.nutrition': 'Nutrición', // Was Nutrition
        'sidebar.workouts': 'Entrenamientos', // Was Workouts
        'sidebar.community': 'Comunidad', // Was Community
        'sidebar.biometrics': 'Biometría', // Was Biometrics
        'sidebar.lightMode': 'Modo Claro',
        'sidebar.darkMode': 'Modo Oscuro',
        'sidebar.viewProfile': 'Ver Perfil',
        'sidebar.logout': 'Cerrar Sesión',
        'sidebar.member': 'Miembro',
    },
    en: {
        // Onboarding
        'onboarding.step': 'Step',
        'onboarding.of': 'of',
        'onboarding.completed': 'Completed',
        'onboarding.title1': 'Start your physical and mental',
        'onboarding.title1_highlight': 'transformation now',
        'onboarding.title2': 'Finish your',
        'onboarding.title2_highlight': 'personal configuration',
        'onboarding.desc1': 'Tell us about yourself to personalize your nutrition and performance plan.',
        'onboarding.desc2': 'Almost done. Give us some final details to create your profile.',
        'onboarding.biometrics': 'Biometric Data',
        'onboarding.male': 'Male',
        'onboarding.female': 'Female',
        'onboarding.age': 'Age',
        'onboarding.weight': 'Weight (kg)',
        'onboarding.height': 'Height (cm)',
        'onboarding.identity': 'Identity & Location',
        'onboarding.firstName': 'First Name',
        'onboarding.lastName': 'Last Name',
        'onboarding.district': 'District',
        'onboarding.selectDistrict': 'Select your district',
        'onboarding.email': 'Email',
        'onboarding.password': 'Password',
        'onboarding.next': 'Next',
        'onboarding.start': 'Start Now',
        'onboarding.back': 'Go back',
        'onboarding.terms': 'By continuing, you accept our',
        'onboarding.terms_link': 'Terms of Service',
        'onboarding.privacy_link': 'Privacy Policy',
        'onboarding.and': 'and',
        'onboarding.alreadyHaveAccount': 'Already have an account?',
        'onboarding.login': 'Log in',

        // Dashboard
        'dashboard.goodMorning': 'Good morning',
        'dashboard.goodAfternoon': 'Good afternoon',
        'dashboard.goodEvening': 'Good evening',
        'dashboard.scoreTrend': 'Your metabolic score is trending up +5% this week.',
        'dashboard.viewAnalysis': 'View Full Analysis',

        // Sidebar
        'sidebar.subtitle': 'EAT HEALTHY, LIVE BETTER',
        'sidebar.dashboard': 'Dashboard',

        // Profile
        'profile.title': 'Edit Profile',
        'profile.accountData': 'Account Data',
        'profile.physicalProfile': 'Physical Profile',
        'profile.firstName': 'First Name',
        'profile.lastName': 'Last Name',
        'profile.email': 'Email',
        'profile.weight': 'Weight (kg)',
        'profile.height': 'Height (cm)',
        'profile.age': 'Age',
        'profile.save': 'Save Changes',
        'profile.saving': 'Saving...',
        'profile.success': 'Profile updated successfully',
        'profile.error': 'Error updating profile',
        'sidebar.nutrition': 'Nutrition',
        'sidebar.workouts': 'Workouts',
        'sidebar.community': 'Community',
        'sidebar.biometrics': 'Biometrics',
        'sidebar.lightMode': 'Light Mode',
        'sidebar.darkMode': 'Dark Mode',
        'sidebar.viewProfile': 'View Profile',
        'sidebar.logout': 'Log Out',
        'sidebar.member': 'Member',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('es');

    useEffect(() => {
        const savedLang = localStorage.getItem('app_language') as Language;
        if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('app_language', lang);
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
