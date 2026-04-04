import PlayerSlot from './PlayerSlot';
import type { Lineup, Position } from '../types';

/**
 * FIFA-standard pitch dimensions: width = touchline (68m), height = length (105m).
 * Goals at y=0 (top) and y=105 (bottom).
 */
const W = 68;
const L = 105;
const MID_Y = L / 2;
const PA_W = 40.32;
const PA_D = 16.5;
const GA_W = 18.32;
const GA_D = 5.5;
const PA_X = (W - PA_W) / 2;
const GA_X = (W - GA_W) / 2;
const SPOT = 11;
const ARC_R = 9.15;
const CR = 9.15;
const CORNER_R = 1;
const CX = W / 2;

function penaltyArcXs(goalY: 0 | typeof L): { x1: number; x2: number } {
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
  <svg
    className="field-svg"
    viewBox={`0 0 ${W} ${L}`}
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`
        .fl { fill: none; stroke: rgba(255,255,255,0.34); stroke-width: 0.22; stroke-linecap: round; stroke-linejoin: round; }
        .fl-dot { fill: rgba(255,255,255,0.38); }
      `}</style>
    </defs>

    <rect x="0" y="0" width={W} height={L} className="fl" rx="0.35" />
    <line x1="0" y1={MID_Y} x2={W} y2={MID_Y} className="fl" />
    <circle cx={CX} cy={MID_Y} r={CR} className="fl" />
    <circle cx={CX} cy={MID_Y} r="0.22" className="fl-dot" />

    {/* Top — penalty box, goal box, spot, arc */}
    <rect x={PA_X} y="0" width={PA_W} height={PA_D} className="fl" />
    <rect x={GA_X} y="0" width={GA_W} height={GA_D} className="fl" />
    <circle cx={CX} cy={SPOT} r="0.22" className="fl-dot" />
    <path d={`M ${topArc.x1} ${PA_D} A ${ARC_R} ${ARC_R} 0 0 1 ${topArc.x2} ${PA_D}`} className="fl" />

    {/* Bottom — mirror */}
    <rect x={PA_X} y={L - PA_D} width={PA_W} height={PA_D} className="fl" />
    <rect x={GA_X} y={L - GA_D} width={GA_W} height={GA_D} className="fl" />
    <circle cx={CX} cy={L - SPOT} r="0.22" className="fl-dot" />
    <path d={`M ${botArc.x1} ${L - PA_D} A ${ARC_R} ${ARC_R} 0 0 0 ${botArc.x2} ${L - PA_D}`} className="fl" />

    {/* Corner quadrants */}
    <path d={`M ${CORNER_R} 0 A ${CORNER_R} ${CORNER_R} 0 0 1 0 ${CORNER_R}`} className="fl" />
    <path d={`M ${W - CORNER_R} 0 A ${CORNER_R} ${CORNER_R} 0 0 0 ${W} ${CORNER_R}`} className="fl" />
    <path d={`M ${CORNER_R} ${L} A ${CORNER_R} ${CORNER_R} 0 0 0 0 ${L - CORNER_R}`} className="fl" />
    <path d={`M ${W - CORNER_R} ${L} A ${CORNER_R} ${CORNER_R} 0 0 1 ${W} ${L - CORNER_R}`} className="fl" />
  </svg>
);

interface Props {
  lineup: Lineup;
  onSlotClick: (role: Position, index: number) => void;
  onSlotRemove: (role: Position, index: number) => void;
}

export default function Pitch({ lineup, onSlotClick, onSlotRemove }: Props) {
  const { GK, DEF, MID, ATT, MGR } = lineup;

  return (
    <div className="pitch-frame" id="pitch-export">
      <div className="pitch">
        <div className="pitch-surface">
          <FieldSVG />

          <div className="formation">
            <div className="row row--att">
              {ATT.map((p, i) => (
                <PlayerSlot
                  key={i}
                  position="ATT"
                  player={p}
                  onClick={() => onSlotClick('ATT', i)}
                  onRemove={p ? () => onSlotRemove('ATT', i) : null}
                />
              ))}
            </div>

            <div className="row row--mid">
              {MID.map((p, i) => (
                <PlayerSlot
                  key={i}
                  position="MID"
                  player={p}
                  onClick={() => onSlotClick('MID', i)}
                  onRemove={p ? () => onSlotRemove('MID', i) : null}
                />
              ))}
            </div>

            <div className="row row--def">
              {DEF.map((p, i) => (
                <PlayerSlot
                  key={i}
                  position="DEF"
                  player={p}
                  onClick={() => onSlotClick('DEF', i)}
                  onRemove={p ? () => onSlotRemove('DEF', i) : null}
                />
              ))}
            </div>

            <div className="row row--gk">
              <PlayerSlot
                position="GK"
                player={GK}
                onClick={() => onSlotClick('GK', 0)}
                onRemove={GK ? () => onSlotRemove('GK', 0) : null}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mgr-bar">
        <span className="mgr-bar__title">מאמן</span>
        <PlayerSlot
          position="MGR"
          player={MGR}
          onClick={() => onSlotClick('MGR', 0)}
          onRemove={MGR ? () => onSlotRemove('MGR', 0) : null}
        />
      </div>
    </div>
  );
}
