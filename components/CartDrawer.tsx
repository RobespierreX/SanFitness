
import React from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const CartDrawer: React.FC = () => {
    const { items, removeFromCart, updateQuantity, cartTotal, isCartOpen, toggleCart, clearCart } = useCart();
    const { t } = useLanguage();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={toggleCart}></div>
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white dark:bg-surface-dark shadow-xl flex flex-col h-full animate-slide-in-right">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/10">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">shopping_bag</span>
                            Mi Pedido
                        </h2>
                        <button onClick={toggleCart} className="size-8 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-center text-slate-500 dark:text-white/60 transition-colors">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                                <div className="size-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-300 dark:text-white/20">
                                    <span className="material-symbols-outlined text-4xl">remove_shopping_cart</span>
                                </div>
                                <p className="text-slate-500 dark:text-white/40">Tu carrito está vacío.</p>
                                <button onClick={toggleCart} className="text-primary font-bold hover:underline">
                                    Ver Productos
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {items.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="size-20 rounded-xl bg-slate-100 dark:bg-black/20 overflow-hidden shrink-0">
                                            {item.image ? (
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <span className="material-symbols-outlined">image</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.title}</h3>
                                                <p className="text-primary font-bold">S/ {item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 rounded-lg px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className={`size-6 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-white/10 text-slate-600 dark:text-white/60 transition-colors ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <span className="material-symbols-outlined text-xs">remove</span>
                                                    </button>
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="size-6 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-white/10 text-slate-600 dark:text-white/60 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-xs">add</span>
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="border-t border-slate-100 dark:border-white/10 p-6 bg-slate-50 dark:bg-surface-dark">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-slate-500 dark:text-white/60 font-medium">Total</span>
                                <span className="text-2xl font-black text-slate-900 dark:text-white">S/ {cartTotal.toFixed(2)}</span>
                            </div>
                            <button className="w-full py-4 bg-primary hover:bg-primary-hover text-[#102218] font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                                Proceder al Pago
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                            <button
                                onClick={toggleCart}
                                className="w-full mt-3 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
                            >
                                Seguir comprando
                            </button>
                            <button
                                onClick={clearCart}
                                className="w-full mt-3 py-2 text-sm text-slate-400 hover:text-red-500 transition-colors"
                            >
                                Vaciar Carrito
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
