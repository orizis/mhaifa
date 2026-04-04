import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import type { Player, Position } from '../types';
import { POSITION_LABELS } from '../data/players';

function Jersey({ size = 42 }: { size?: number }) {
  return (
    <img
      className="jersey-thumb"
      src="/jersey.png"
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
    />
  );
}

const Silhouette = ({ size = 58 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="32" cy="20" r="13" fill="rgba(255,255,255,0.18)" />
    <ellipse cx="32" cy="50" rx="19" ry="15" fill="rgba(255,255,255,0.18)" />
  </svg>
);

function Photo({ player, size }: { player: Player; size: number }) {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
    if (fallback) fallback.style.display = 'flex';
  };

  if (!player.imageUrl) return <Silhouette size={size} />;
  return (
    <>
      <img
        src={player.imageUrl}
        alt={player.nameHe}
        className="card__img"
        onError={handleImgError}
      />
      <span className="card__sil" style={{ display: 'none' }}>
        <Silhouette size={size} />
      </span>
    </>
  );
}

interface Props {
  position: Position;
  player: Player | null;
  onClick: () => void;
  onRemove: (() => void) | null;
}

export default function PlayerSlot({ position, player, onClick, onRemove }: Props) {
  const label = POSITION_LABELS[position] ?? position;
  const isMgr = position === 'MGR';
  const filled = player !== null;

  if (isMgr) {
    return (
      <div className="mgrslot">
        <motion.button
          className={`mgrcard ${filled ? 'mgrcard--filled' : 'mgrcard--empty'}`}
          onClick={filled ? undefined : onClick}
          {...(!filled && { whileHover: { scale: 1.04 }, whileTap: { scale: 0.96 } })}
        >
          <div className="mgrcard__photo">
            {filled ? (
              <Photo player={player} size={42} />
            ) : (
              <Jersey size={36} />
            )}
          </div>
          <span className="mgrcard__name">
            {filled ? player.nameHe : 'בחר מאמן'}
          </span>
        </motion.button>
        {filled && onRemove && (
          <button
            className="mgrslot__remove"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            aria-label="הסר מאמן"
          >
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
        onClick={filled ? undefined : onClick}
        {...(!filled && {
          whileHover: { y: -6, scale: 1.06, zIndex: 10 },
          whileTap: { scale: 0.94 },
          transition: { type: 'spring', stiffness: 380, damping: 24 },
        })}
      >
        <div className="card__head">
          {!filled && <span className="card__pos">{label}</span>}
          {filled && player.seasons[0] && (
            <span className="card__season">{player.seasons[0]}</span>
          )}
        </div>

        <div className="card__photo">
          {filled ? (
            <Photo player={player} size={58} />
          ) : position === 'GK' ? (
            <img src="/gk.png" alt="" width={42} height={42} style={{ objectFit: 'contain' }} />
          ) : (
            <Jersey size={42} />
          )}
        </div>

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
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          aria-label="הסר"
        >
          <X size={9} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
