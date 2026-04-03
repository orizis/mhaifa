import { useId } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { POSITION_LABELS } from '../data/players.js';

/* Modern kit: gradient body, white shoulder yoke, collar, subtle stripes */
function Jersey({ size = 46 }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={`jb-${id}`} x1="32" y1="6" x2="32" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1aff8f" />
          <stop offset="0.4" stopColor="#00c853" />
          <stop offset="1" stopColor="#006b36" />
        </linearGradient>
        <linearGradient id={`js-${id}`} x1="22" y1="10" x2="48" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`jf-${id}`} x="-25%" y="-20%" width="150%" height="145%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter={`url(#jf-${id})`}>
        <path
          d="M11 30 L7 36 V64 L17 66 L19 34 Z"
          fill="#004d28"
          opacity="0.9"
        />
        <path
          d="M53 30 L57 36 V64 L47 66 L45 34 Z"
          fill="#004d28"
          opacity="0.9"
        />
        <path
          d="M17 14 Q32 7 47 14 L52 24 L50 64 Q32 69 14 64 L12 24 Z"
          fill={`url(#jb-${id})`}
        />
        <path
          d="M14 22 L18 13 L28 15 L32 19 L36 15 L46 13 L50 22 L42 28 L32 24 L22 28 Z"
          fill="#f4fffa"
        />
        <path
          d="M14 22 L18 13 L28 15 L32 19 L36 15 L46 13 L50 22 L42 28 L32 24 L22 28 Z"
          fill={`url(#js-${id})`}
          opacity="0.5"
        />
        <path
          d="M27 13 L32 22 L37 13"
          stroke="#e8fff2"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25 12 Q32 8 39 12"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M22 40 H42"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M24 46 H40"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <ellipse cx="32" cy="52" rx="5" ry="3.5" fill="rgba(255,255,255,0.12)" />
      </g>
    </svg>
  );
}

/* ── Silhouette fallback ──────────────────────── */
const Silhouette = ({ size = 58 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="20" r="13" fill="rgba(255,255,255,0.18)"/>
    <ellipse cx="32" cy="50" rx="19" ry="15" fill="rgba(255,255,255,0.18)"/>
  </svg>
);

/* ── Player photo with fallback ──────────────── */
const Photo = ({ player, size }) => {
  if (!player.imageUrl) return <Silhouette size={size} />;
  return (
    <>
      <img
        src={player.imageUrl}
        alt={player.nameHe}
        className="card__img"
        onError={e => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextSibling.style.display = 'flex';
        }}
      />
      <span className="card__sil" style={{ display: 'none' }}>
        <Silhouette size={size} />
      </span>
    </>
  );
};

/* ── Main component ───────────────────────────── */
export default function PlayerSlot({ position, player, onClick, onRemove }) {
  const label = POSITION_LABELS[position] || position;
  const isMgr = position === 'MGR';
  const filled = !!player;

  if (isMgr) {
    return (
      <div className="mgrslot">
        <motion.button
          className={`mgrcard ${filled ? 'mgrcard--filled' : 'mgrcard--empty'}`}
          onClick={onClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <div className="mgrcard__photo">
            {filled ? <Photo player={player} size={42} /> : <Jersey size={32} />}
          </div>
          <span className="mgrcard__name">
            {filled ? player.nameHe : 'בחר מאמן'}
          </span>
        </motion.button>
        {filled && onRemove && (
          <button className="mgrslot__remove" onClick={e => { e.stopPropagation(); onRemove(); }}>
            <X size={9} strokeWidth={3} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="cardslot">
      <motion.button
        className={`card ${filled ? 'card--filled' : 'card--empty'}`}
        onClick={onClick}
        whileHover={{ y: -6, scale: 1.06, zIndex: 10 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
      >
        {/* Header strip */}
        <div className="card__head">
          <span className="card__pos">{label}</span>
          {filled && player.seasons[0] && (
            <span className="card__season">{player.seasons[0]}</span>
          )}
        </div>

        {/* Photo / Jersey */}
        <div className="card__photo">
          {filled
            ? <Photo player={player} size={58} />
            : <Jersey size={42} />
          }
        </div>

        {/* Name */}
        <div className="card__footer">
          {filled ? (
            <span className="card__name">{player.nameHe}</span>
          ) : (
            <span className="card__add">
              <Plus size={11} strokeWidth={2.5} />
              הוסף
            </span>
          )}
        </div>
      </motion.button>

      {filled && onRemove && (
        <button
          className="cardslot__remove"
          onClick={e => { e.stopPropagation(); onRemove(); }}
          aria-label="הסר"
        >
          <X size={9} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
