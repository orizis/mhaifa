import { SEASON_LABELS } from '../data/players.js';

const SilhouetteSVG = () => (
  <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="20" r="13" fill="#c8dcc8" />
    <ellipse cx="32" cy="54" rx="20" ry="17" fill="#c8dcc8" />
  </svg>
);

export default function PlayerCard({ player, onSelect, selected }) {
  return (
    <button
      className={`pcard ${selected ? 'pcard--selected' : ''}`}
      onClick={() => onSelect(player)}
    >
      <div className="pcard__photo">
        {player.imageUrl ? (
          <>
            <img
              src={player.imageUrl}
              alt={player.nameHe}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
            />
            <span style={{ display: 'none' }} className="pcard__fallback"><SilhouetteSVG /></span>
          </>
        ) : (
          <span className="pcard__fallback"><SilhouetteSVG /></span>
        )}
        {selected && <span className="pcard__check">✓</span>}
      </div>
      <span className="pcard__name">{player.nameHe}</span>
      <div className="pcard__seasons">
        {player.seasons.map(s => (
          <span key={s} className="sbadge">{s}</span>
        ))}
      </div>
    </button>
  );
}
