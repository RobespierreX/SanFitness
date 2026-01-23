
import React from 'react';
import { useLanguage } from './context/LanguageContext';

const TrackOrder: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="flex-1 flex h-full overflow-hidden relative">
            {/* Sidebar / Info Panel - Collapsible on mobile if needed, but here fixed width on desktop */}
            <aside className="w-full md:w-[400px] lg:w-[450px] bg-background-light dark:bg-background-dark border-r border-border-light dark:border-white/10 flex flex-col overflow-y-auto shrink-0 z-10 shadow-lg md:shadow-none transition-colors">
                <div className="p-6 md:p-8 space-y-8">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wide mb-4">
                            <span className="material-symbols-outlined text-sm">local_shipping</span>
                            In Transit
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Campus Delivery</h1>
                        <p className="text-slate-500 dark:text-white/60 text-sm">
                            Order <span className="font-mono text-slate-900 dark:text-white">#3920</span> • Arriving in <span className="text-primary font-bold">12 mins</span>
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-6">Status Timeline</h3>
                        <div className="relative pl-2">
                            <div className="absolute left-[19px] top-2 bottom-6 w-0.5 bg-slate-200 dark:bg-white/10"></div>

                            {/* Step 1 */}
                            <div className="relative flex gap-4 mb-8">
                                <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center border-2 border-white dark:border-background-dark">
                                    <span className="material-symbols-outlined text-sm">check</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Preparation</h4>
                                    <p className="text-xs text-slate-500 dark:text-white/60 mt-0.5">Kitchen accepted order at 10:30 AM</p>
                                </div>
                            </div>

                            {/* Step 2 (Active) */}
                            <div className="relative flex gap-4 mb-8">
                                <div className="absolute left-[11px] -top-8 h-8 w-0.5 bg-primary"></div>
                                <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md shadow-green-200 dark:shadow-none border-2 border-white dark:border-background-dark">
                                    <span className="material-symbols-outlined text-sm">pedal_bike</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary text-sm">In Transit</h4>
                                    <p className="text-xs text-slate-500 dark:text-white/60 mt-0.5">Passing Zone A: Humanities</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative flex gap-4">
                                <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-white/40 flex items-center justify-center border-2 border-white dark:border-background-dark">
                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-400 dark:text-white/40 text-sm">Delivered</h4>
                                    <p className="text-xs text-slate-500 dark:text-white/60 mt-0.5">Estimated 10:55 AM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 flex items-center justify-between border border-border-light dark:border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img alt="Courier Luis" className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfY9cZIUqODNXJcmIAbEuFjDEmDge2uoZlnUckv6BidRnDTsBsBXLhfVPaDqnnmo5e5ITXmJM-FMn5Qs_mw-YSX0doqZvrLUh--3CYenXuZzvBKZo-srg6M63-lXcYPs6uRof94opeCIWdypb5bSRj_qwAFgUG-1SOt3PykJl6ZylL-xmprobJ92LNIpfZZPSTwBCjUGkiFqT7eD7x6zXLYPbsEi2kyaHAhE_28xmMloDSivG6WqxhjCcnn5kl66FPm2B19PdBvk_S" />
                                <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-0.5 border border-white dark:border-surface-dark">
                                    <span className="material-symbols-outlined text-[10px] block">bolt</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Luis A.</h4>
                                <p className="text-xs text-slate-500 dark:text-white/60 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[10px]">two_wheeler</span>
                                    Yamaha FZ • <span className="text-orange-500 font-medium">Orange Marker</span>
                                </p>
                            </div>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center text-primary hover:bg-slate-50 dark:hover:bg-white/20 transition-colors">
                            <span className="material-symbols-outlined text-sm">call</span>
                        </button>
                    </div>

                    <div className="border-t border-border-light dark:border-white/10 my-2"></div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Order Summary</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-white/60">1x Bio-hack Keto Bowl</span>
                                <span className="font-medium text-slate-900 dark:text-white">S/ 25.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-white/60">1x Matcha Brain Booster</span>
                                <span className="font-medium text-slate-900 dark:text-white">S/ 12.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-2 border-dashed border-primary/30 dark:border-primary/20 bg-green-50/30 dark:bg-green-900/10 rounded-xl p-6 text-center">
                        <div className="w-10 h-10 mx-auto bg-white dark:bg-surface-dark rounded-full flex items-center justify-center mb-3 shadow-sm text-primary">
                            <span className="material-symbols-outlined">add_a_photo</span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Frictionless Payment</h4>
                        <p className="text-xs text-slate-500 dark:text-white/60 mb-2">Upload Yape/Plin screenshot</p>
                        <a className="text-xs font-bold text-primary hover:underline underline-offset-2" href="#">Browse Files</a>
                    </div>
                </div>
            </aside>

            {/* Main Map Area */}
            <main className="flex-1 relative bg-slate-200 dark:bg-slate-800 h-full w-full overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Map of Lima"
                        className="w-full h-full object-cover opacity-80 dark:opacity-40 grayscale-[20%] dark:invert dark:grayscale-[80%]"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuABplmW_5QYrjo9DHuzDyUuV6VMXbou6KzNPawn-aGcPSbjdwgXi4YEmyBeCvbWhIFkUK4GJbxHh_7t9ai3n9FQ6epYO81zPDYMxedFFHVSeLZMON6c_BDB91lorNuvDIECJodbnK1NIN_QlO5IwFcVaVdyS5WvcK7RuqDxRlckUzl3iE0pPhtmC9sW-mw6PsBCUZ6yEpyWk1j5yCBjmZJbI06YEa6IDbSfFG9U9X2F_u6j8wIjtU1GMbXRDLvH2Nc8S6Ukx_foi2pB"
                    />
                </div>

                {/* Map Zones */}
                <div className="absolute top-[20%] left-[25%] w-48 h-48 bg-green-500/20 border-2 border-green-500/40 rounded-lg transform -rotate-3 backdrop-blur-[1px] flex items-center justify-center shadow-sm">
                    <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded shadow text-[10px] font-bold text-green-700 dark:text-green-400">Zone A: Humanities</span>
                </div>
                <div className="absolute top-[35%] right-[20%] w-56 h-64 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl transform rotate-2 backdrop-blur-[1px] flex items-center justify-center shadow-sm">
                    <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded shadow text-[10px] font-bold text-blue-700 dark:text-blue-400">Zone B: Health Sciences</span>
                </div>
                <div className="absolute bottom-[10%] left-[40%] w-64 h-64 bg-teal-500/10 border-2 border-teal-500/30 rounded-full flex items-center justify-center shadow-sm">
                    <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded shadow text-[10px] font-bold text-teal-700 dark:text-teal-400">Zone C: Sports</span>
                </div>

                {/* Map Controls */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
                    <button className="size-10 bg-white dark:bg-surface-dark rounded-lg shadow-lg flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">add</span>
                    </button>
                    <button className="size-10 bg-white dark:bg-surface-dark rounded-lg shadow-lg flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">remove</span>
                    </button>
                    <button className="size-10 bg-white dark:bg-surface-dark rounded-lg shadow-lg flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 mt-2 transition-colors">
                        <span className="material-symbols-outlined">my_location</span>
                    </button>
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-6 left-6 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-xl z-10 w-48 border border-border-light dark:border-white/10">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-white/50 mb-3">Map Legend</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-xs text-slate-700 dark:text-white">
                            <span className="size-3 rounded-full bg-green-200 dark:bg-green-900 border border-green-500"></span>
                            Zone A: Humanities
                        </li>
                        <li className="flex items-center gap-2 text-xs text-slate-700 dark:text-white">
                            <span className="size-3 rounded-full bg-blue-200 dark:bg-blue-900 border border-blue-500"></span>
                            Zone B: Health
                        </li>
                        <li className="flex items-center gap-2 text-xs text-slate-700 dark:text-white">
                            <span className="size-3 rounded-full bg-teal-200 dark:bg-teal-900 border border-teal-500"></span>
                            Zone C: Sports
                        </li>
                        <li className="flex items-center gap-2 text-xs text-slate-700 dark:text-white mt-3 pt-2 border-t border-slate-100 dark:border-white/10">
                            <span className="material-symbols-outlined text-orange-500 text-sm">two_wheeler</span>
                            Courier
                        </li>
                    </ul>
                </div>

                {/* Courier Marker */}
                <div className="absolute top-[40%] left-[45%] z-20 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
                    <div className="relative group cursor-pointer">
                        <div className="size-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40 text-white z-20 relative border-2 border-white dark:border-gray-800">
                            <span className="material-symbols-outlined text-lg">two_wheeler</span>
                        </div>
                        <div className="absolute inset-0 rounded-full bg-orange-500 opacity-30 animate-ping"></div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Luis A. • Arriving soon
                        </div>
                    </div>
                </div>

                {/* Locations */}
                <div className="absolute top-[32%] left-[28%] text-slate-500 dark:text-white/60">
                    <span className="material-symbols-outlined text-2xl drop-shadow-md">store_mall_directory</span>
                </div>
                <div className="absolute bottom-[25%] right-[30%] text-slate-500 dark:text-white/60">
                    <span className="material-symbols-outlined text-2xl drop-shadow-md">local_hospital</span>
                </div>

                {/* Route Path (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.1))' }}>
                    <path className="opacity-80" d="M 380 250 Q 550 300 680 400" fill="none" stroke="#f97316" strokeDasharray="6 4" strokeWidth="3"></path>
                </svg>
            </main>
        </div>
    );
};

export default TrackOrder;
