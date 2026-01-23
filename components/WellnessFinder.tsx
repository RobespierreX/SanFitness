
import React, { useState } from 'react';
import { findNearbyWellness } from '../services/geminiService';
import { GroundingSource } from '../types';

const WellnessFinder: React.FC = () => {
  const [query, setQuery] = useState('Gyms');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [sources, setSources] = useState<GroundingSource[]>([]);

  const handleSearch = async () => {
    setLoading(true);
    setResult('');
    setSources([]);
    
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { text, sources } = await findNearbyWellness(query, {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          setResult(text);
          setSources(sources);
          setLoading(false);
        }, async () => {
          const { text, sources } = await findNearbyWellness(query);
          setResult(text);
          setSources(sources);
          setLoading(false);
        });
      }
    } catch (error) {
      setResult("Could not find wellness locations at this time.");
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-dark">location_on</span>
            Local Wellness Hubs
          </h3>
          <p className="text-slate-500 dark:text-white/50 text-xs mt-1">AI-curated centers based on your profile.</p>
        </div>
        <div className="flex gap-2">
          {['Gyms', 'Health Foods', 'Recovery'].map(type => (
            <button 
              key={type}
              onClick={() => setQuery(type)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                query === type 
                  ? 'bg-primary text-slate-900' 
                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {!result && !loading && (
          <button 
            onClick={handleSearch}
            className="w-full py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary-dark dark:text-primary font-bold hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
          >
            Find Nearby {query}
            <span className="material-symbols-outlined text-sm">search</span>
          </button>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="size-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-slate-400 dark:text-white/40 text-sm animate-pulse">Scanning the local perimeter...</p>
          </div>
        )}

        {result && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="text-slate-600 dark:text-white/70 text-sm leading-relaxed border-l-2 border-primary/30 pl-4 py-1 italic">
              {result}
            </div>
            
            {sources.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sources.map((s, idx) => (
                  <a 
                    key={idx} 
                    href={s.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 hover:border-primary/50 dark:hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span className="material-symbols-outlined text-primary-dark text-lg flex-shrink-0">map</span>
                      <span className="text-slate-900 dark:text-white text-xs font-bold truncate">{s.title}</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-300 dark:text-white/20 group-hover:text-slate-900 dark:group-hover:text-white transition-colors text-sm">open_in_new</span>
                  </a>
                ))}
              </div>
            )}
            
            <button 
              onClick={() => {setResult(''); setSources([]);}}
              className="text-xs text-slate-400 dark:text-white/30 hover:text-slate-900 dark:hover:text-white underline"
            >
              Search again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellnessFinder;
