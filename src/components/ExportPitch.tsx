import type { Lineup, Player, Position } from '../types';

/* ── Field SVG (same constants as Pitch.tsx) ─────────────────── */
const W = 68, L = 105, MID_Y = L / 2;
const PA_W = 40.32, PA_D = 16.5, GA_W = 18.32, GA_D = 5.5;
const PA_X = (W - PA_W) / 2, GA_X = (W - GA_W) / 2;
const SPOT = 11, ARC_R = 9.15, CR = 9.15, CORNER_R = 1, CX = W / 2;

function penaltyArcXs(goalY: 0 | typeof L) {
  const cy = goalY === 0 ? SPOT : L - SPOT;
  const lineY = goalY === 0 ? PA_D : L - PA_D;
  const dy = Math.abs(lineY - cy);
  const inner = ARC_R * ARC_R - dy * dy;
  if (inner < 0) return { x1: CX, x2: CX };
  const dx = Math.sqrt(inner);
  return { x1: CX - dx, x2: CX + dx };
}
const topArc = penaltyArcXs(0);
const botArc = penaltyArcXs(L);

const FieldSVG = () => (
  <svg className="exp-field-svg" viewBox={`0 0 ${W} ${L}`} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>{`.efl{fill:none;stroke:rgba(255,255,255,0.28);stroke-width:0.22;stroke-linecap:round;stroke-linejoin:round}.efl-dot{fill:rgba(255,255,255,0.35)}`}</style>
    </defs>
    <rect x="0" y="0" width={W} height={L} className="efl" rx="0.35" />
    <line x1="0" y1={MID_Y} x2={W} y2={MID_Y} className="efl" />
    <circle cx={CX} cy={MID_Y} r={CR} className="efl" />
    <circle cx={CX} cy={MID_Y} r="0.22" className="efl-dot" />
    <rect x={PA_X} y="0" width={PA_W} height={PA_D} className="efl" />
    <rect x={GA_X} y="0" width={GA_W} height={GA_D} className="efl" />
    <circle cx={CX} cy={SPOT} r="0.22" className="efl-dot" />
    <path d={`M ${topArc.x1} ${PA_D} A ${ARC_R} ${ARC_R} 0 0 1 ${topArc.x2} ${PA_D}`} className="efl" />
    <rect x={PA_X} y={L - PA_D} width={PA_W} height={PA_D} className="efl" />
    <rect x={GA_X} y={L - GA_D} width={GA_W} height={GA_D} className="efl" />
    <circle cx={CX} cy={L - SPOT} r="0.22" className="efl-dot" />
    <path d={`M ${botArc.x1} ${L - PA_D} A ${ARC_R} ${ARC_R} 0 0 0 ${botArc.x2} ${L - PA_D}`} className="efl" />
    <path d={`M ${CORNER_R} 0 A ${CORNER_R} ${CORNER_R} 0 0 1 0 ${CORNER_R}`} className="efl" />
    <path d={`M ${W - CORNER_R} 0 A ${CORNER_R} ${CORNER_R} 0 0 0 ${W} ${CORNER_R}`} className="efl" />
    <path d={`M ${CORNER_R} ${L} A ${CORNER_R} ${CORNER_R} 0 0 0 0 ${L - CORNER_R}`} className="efl" />
    <path d={`M ${W - CORNER_R} ${L} A ${CORNER_R} ${CORNER_R} 0 0 1 ${W} ${L - CORNER_R}`} className="efl" />
  </svg>
);

/* ── Silhouette for players without a photo ──────────────────── */
const ExportSilhouette = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="22" r="13" fill="rgba(255,255,255,0.2)" />
    <ellipse cx="32" cy="54" rx="20" ry="16" fill="rgba(255,255,255,0.2)" />
  </svg>
);

/* ── Single player circle ────────────────────────────────────── */
function ExportSlot({ player }: { player: Player | null; position: Position }) {

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    const sil = e.currentTarget.nextElementSibling as HTMLElement | null;
    if (sil) sil.style.display = 'flex';
  };

  return (
    <div className="exp-slot">
      <div className="exp-circle">
        {player?.imageUrl ? (
          <>
            <img
              src={player.imageUrl}
              alt={player.nameHe}
              crossOrigin="anonymous"
              onError={handleImgError}
            />
            <span style={{ display: 'none', width: '100%', height: '100%' }}>
              <ExportSilhouette />
            </span>
          </>
        ) : (
          <ExportSilhouette />
        )}
      </div>
      {player && (
        <>
          <span className="exp-name">{player.nameHe}</span>
          <span className="exp-season">{player.seasons[0]}</span>
        </>
      )}
    </div>
  );
}

/* ── Main export layout ──────────────────────────────────────── */
export default function ExportPitch({ lineup }: { lineup: Lineup }) {
  const { GK, DEF, MID, ATT, MGR } = lineup;
  return (
    <div className="exp-wrap">
      <div className="exp-pitch">
        <FieldSVG />
        <div className="exp-formation">
          <div className="exp-row">
            {ATT.map((p, i) => <ExportSlot key={i} player={p} position="ATT" />)}
          </div>
          <div className="exp-row">
            {MID.map((p, i) => <ExportSlot key={i} player={p} position="MID" />)}
          </div>
          <div className="exp-row">
            {DEF.map((p, i) => <ExportSlot key={i} player={p} position="DEF" />)}
          </div>
          <div className="exp-row">
            <ExportSlot player={GK} position="GK" />
          </div>
        </div>
      </div>
      <div className="exp-mgr-bar">
        <ExportSlot player={MGR} position="MGR" />
      </div>
    </div>
  );
}
