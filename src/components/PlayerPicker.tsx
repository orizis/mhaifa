import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { PLAYERS, MANAGERS, SEASONS, POSITION_LABELS, SEASON_LABELS } from '../data/players';
import PlayerCard from './PlayerCard';
import type { Player, Lineup, ActivePicker } from '../types';

interface Props {
  activePicker: ActivePicker | null;
  lineup: Lineup;
  onSelect: (player: Player) => void;
  onClose: () => void;
}

let manualCounter = 0;

export default function PlayerPicker({ activePicker, lineup, onSelect, onClose }: Props) {
  const [seasonFilter, setSeasonFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [manualName, setManualName] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activePicker) {
      setSearch('');
      setManualName('');
      setSeasonFilter('all');
      setTimeout(() => searchRef.current?.focus(), 150);
    }
  }, [activePicker]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const role = activePicker?.role;
  const isMgr = role === 'MGR';
  const posLabel = role ? (POSITION_LABELS[role] ?? role) : '';
  const pool = isMgr ? MANAGERS : PLAYERS.filter((p) => p.position === role);

  const current =
    role === 'GK' ? lineup.GK
    : role === 'MGR' ? lineup.MGR
    : lineup[role as 'DEF' | 'MID' | 'ATT']?.[activePicker?.index ?? 0] ?? null;

  const selectedIds = new Set<string>(
    [
      lineup.GK?.id,
      lineup.MGR?.id,
      ...lineup.DEF.map((p) => p?.id),
      ...lineup.MID.map((p) => p?.id),
      ...lineup.ATT.map((p) => p?.id),
    ].filter((id): id is string => id !== undefined),
  );
  // Allow re-selecting the player already in this slot
  if (current?.id) selectedIds.delete(current.id);

  const filtered = pool.filter((p) => {
    const okSeason = seasonFilter === 'all' || p.seasons.includes(seasonFilter as Player['seasons'][number]);
    const okSearch = !search.trim() || p.nameHe.includes(search.trim());
    const okAvailable = !selectedIds.has(p.id);
    return okSeason && okSearch && okAvailable;
  });

  const handleManual = () => {
    const name = manualName.trim();
    if (!name) return;
    const allInLineup = [lineup.GK, lineup.MGR, ...lineup.DEF, ...lineup.MID, ...lineup.ATT].filter(
      (p): p is Player => p !== null,
    );
    const alreadyInLineup = allInLineup.some((p) => p.nameHe === name && p.id !== current?.id);
    if (alreadyInLineup) return;
    onSelect({
      id: `manual-${++manualCounter}-${name}`,
      nameHe: name,
      position: role ?? 'MID',
      seasons: ['ידני'],
      imageUrl: null,
    });
  };

  return (
    <AnimatePresence>
      {activePicker && (
        <motion.div
          className="picker-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
        >
          <motion.div
            className="picker"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="picker__handle" />

            <div className="picker__header">
              <div>
                <p className="picker__sup">בחירת שחקן</p>
                <h2 className="picker__title">
                  {isMgr ? 'בחר מאמן' : `בחר ${posLabel}`}
                </h2>
              </div>
              <button className="picker__close" onClick={onClose} aria-label="סגור">
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            <div className="picker__seasons">
              {(['all', ...SEASONS] as const).map((s) => (
                <button
                  key={s}
                  className={`stab ${seasonFilter === s ? 'stab--active' : ''}`}
                  onClick={() => setSeasonFilter(s)}
                  title={s !== 'all' ? SEASON_LABELS[s] : undefined}
                >
                  {s === 'all' ? 'הכל' : s}
                </button>
              ))}
            </div>

            {!isMgr && (
              <div className="picker__search">
                <Search size={15} className="picker__search-icon" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="חיפוש..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="picker__input"
                />
                {search && (
                  <button className="picker__clear" onClick={() => setSearch('')} aria-label="נקה חיפוש">
                    <X size={14} />
                  </button>
                )}
              </div>
            )}

            <div className="picker__grid">
              {filtered.length === 0 ? (
                <div className="picker__empty">
                  <span>😕</span>
                  <p>לא נמצאו שחקנים</p>
                </div>
              ) : (
                filtered.map((p) => (
                  <PlayerCard
                    key={p.id}
                    player={p}
                    selected={current?.id === p.id}
                    onSelect={onSelect}
                  />
                ))
              )}
            </div>

            {!isMgr && (
              <div className="picker__manual">
                <span className="picker__manual-label">הוסף ידנית:</span>
                <input
                  type="text"
                  placeholder="שם השחקן..."
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleManual()}
                  className="picker__input picker__input--manual"
                />
                <button
                  className="picker__manual-btn"
                  onClick={handleManual}
                  disabled={!manualName.trim()}
                >
                  הוסף
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
