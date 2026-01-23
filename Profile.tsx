
import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabaseClient';
import { useLanguage } from './context/LanguageContext';

const Profile: React.FC = () => {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        weight: '',
        height: '',
        age: ''
    });

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) throw new Error('No user');

            // Get profile data
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                throw error;
            }

            // Parse full name to first/last if possible, or use metadata
            let firstName = '';
            let lastName = '';

            const fullName = profile?.full_name || user.user_metadata.full_name || '';
            if (fullName) {
                const parts = fullName.split(' ');
                firstName = parts[0];
                lastName = parts.slice(1).join(' ');
            }

            setFormData({
                firstName: firstName,
                lastName: lastName,
                email: user.email || '',
                weight: profile?.weight?.toString() || '',
                height: profile?.height?.toString() || '',
                age: profile?.age?.toString() || ''
            });

        } catch (error: any) {
            console.error('Error loading profile:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('No user');

            const fullName = `${formData.firstName} ${formData.lastName}`.trim();

            const weight = parseFloat(formData.weight);
            const height = parseFloat(formData.height);
            const age = parseInt(formData.age);

            if (isNaN(weight) || isNaN(height) || isNaN(age)) {
                throw new Error("Por favor, ingresa valores numéricos válidos en Peso, Altura y Edad.");
            }

            const updates = {
                id: user.id,
                full_name: fullName,
                weight,
                height,
                age,
                updated_at: new Date(),
            };

            // Update Profile Table
            const { error } = await supabase.from('profiles').upsert(updates);
            if (error) throw error;

            // Update Auth Metadata (so sidebar updates immediately without refresh)
            const { error: authError } = await supabase.auth.updateUser({
                data: { full_name: fullName }
            });
            if (authError) throw authError;

            setMessage({ type: 'success', text: t('profile.success') });
        } catch (error: any) {
            console.error('Error updating profile:', error);
            setMessage({ type: 'error', text: t('profile.error') });
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading) {
        return <div className="p-8 text-center text-text-main dark:text-white">Loading...</div>;
    }

    return (
        <div className="flex-1 overflow-y-auto p-8 bg-background-subtle dark:bg-background-dark min-h-screen">
            <div className="max-w-2xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">{t('profile.title')}</h1>
                </header>

                <form onSubmit={updateProfile} className="flex flex-col gap-8">
                    {/* Account Data Section */}
                    <section className="glass-card p-8 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-white/5">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">person</span>
                            {t('profile.accountData')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">{t('profile.firstName')}</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">{t('profile.lastName')}</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">{t('profile.email')}</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full px-4 py-3 rounded-xl border bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/50 border-slate-200 dark:border-white/10 cursor-not-allowed"
                                />
                                <p className="text-xs text-slate-400 dark:text-gray-500">Email cannot be changed.</p>
                            </div>
                        </div>
                    </section>

                    {/* Physical Profile Section */}
                    <section className="glass-card p-8 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-white/5">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">monitor_heart</span>
                            {t('profile.physicalProfile')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">{t('profile.weight')}</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">{t('profile.height')}</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">{t('profile.age')}</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>
                    </section>

                    {message && (
                        <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-hover text-[#102218] font-bold shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <span className="size-4 border-2 border-[#102218] border-t-transparent rounded-full animate-spin"></span>
                                    {t('profile.saving')}
                                </>
                            ) : (
                                t('profile.save')
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
