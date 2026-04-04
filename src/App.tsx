import { useState } from 'react';
import { useScreenshot } from 'use-react-screenshot';
import { Shuffle } from 'lucide-react';
import { trackEvent, trackLineupExported } from './analytics';
import Pitch from './components/Pitch';
import PlayerPicker from './components/PlayerPicker';
import ExportPreview from './components/ExportPreview';
import ExportPitch from './components/ExportPitch';
import HouseRules from './components/HouseRules';
import { PLAYERS, MANAGERS } from './data/players';
import type { Lineup, ActivePicker, Player, Position } from './types';

const EMPTY_LINEUP: Lineup = {
  GK: null,
  DEF: [null, null, null, null],
  MID: [null, null, null],
  ATT: [null, null, null],
  MGR: null,
};

function filledCount(lineup: Lineup): number {
  return (
    (lineup.GK ? 1 : 0) +
    (lineup.MGR ? 1 : 0) +
    lineup.DEF.filter(Boolean).length +
    lineup.MID.filter(Boolean).length +
    lineup.ATT.filter(Boolean).length
  );
}

function isComplete(lineup: Lineup): boolean {
  return filledCount(lineup) === 12;
}


export default function App() {
  const [lineup, setLineup] = useState<Lineup>(EMPTY_LINEUP);
  const [activePicker, setActivePicker] = useState<ActivePicker | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportUrl, setExportUrl] = useState<string | null>(null);
  const [showRules, setShowRules] = useState(false);
  const [, takeScreenShot] = useScreenshot({ type: 'image/png' });

  const handleSlotClick = (role: Position, index: number) => setActivePicker({ role, index });

  const handleSelect = (player: Player) => {
    setLineup((prev) => {
      const next = { ...prev };
      if (activePicker?.role === 'GK') {
        next.GK = player;
      } else if (activePicker?.role === 'MGR') {
        next.MGR = player;
      } else if (activePicker) {
        const arr = prev[activePicker.role as 'DEF' | 'MID' | 'ATT'];
        const updated = [...arr] as (Player | null)[];
        updated[activePicker.index] = player;
        next[activePicker.role as 'DEF' | 'MID' | 'ATT'] = updated;
      }
      return next;
    });
    setActivePicker(null);
  };

  const handleReset = () => {
    if (window.confirm('לאפס את כל הבחירות?')) {
      setLineup(EMPTY_LINEUP);
      trackEvent('lineup_reset');
    }
  };

  const handleRandom = () => {
    const pick = <T,>(arr: T[], n: number): T[] =>
      [...arr].sort(() => Math.random() - 0.5).slice(0, n);

    setLineup({
      GK: pick(PLAYERS.filter(p => p.position === 'GK'), 1)[0] ?? null,
      DEF: pick(PLAYERS.filter(p => p.position === 'DEF'), 4),
      MID: pick(PLAYERS.filter(p => p.position === 'MID'), 3),
      ATT: pick(PLAYERS.filter(p => p.position === 'ATT'), 3),
      MGR: pick(MANAGERS, 1)[0] ?? null,
    });
    trackEvent('random_lineup_used');
  };

  const handleExport = async () => {
    const el = document.getElementById('export-target');
    if (!el) return;
    setExporting(true);
    try {
      // Preload all player images so html2canvas captures them at full resolution
      const imageUrls = [
        lineup.GK?.imageUrl,
        lineup.MGR?.imageUrl,
        ...lineup.DEF.map(p => p?.imageUrl),
        ...lineup.MID.map(p => p?.imageUrl),
        ...lineup.ATT.map(p => p?.imageUrl),
      ].filter((url): url is string => !!url);

      await Promise.all(imageUrls.map(url => new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = url;
      })));

      const dataUrl = await takeScreenShot(el, {
        useCORS: true,
        scale: 3,
        backgroundColor: '#071209',
        logging: false,
      });

      setExportUrl(dataUrl);
      trackLineupExported({
        gk:  lineup.GK?.nameHe ?? null,
        def: lineup.DEF.map(p => p?.nameHe ?? null),
        mid: lineup.MID.map(p => p?.nameHe ?? null),
        att: lineup.ATT.map(p => p?.nameHe ?? null),
        mgr: lineup.MGR?.nameHe ?? null,
      });
    } finally {
      setExporting(false);
    }
  };

  const count = filledCount(lineup);
  const complete = isComplete(lineup);

  return (
    <div className="app">
      <div className="app__glow" aria-hidden />

      <header className="header">
        <div className="header__inner">
          <div className="header__mark">
            <img
              className="header__logo"
              src="./logo.png"
              alt="מכבי חיפה"
              crossOrigin="anonymous"
            />
          </div>
          <div className="header__text">
            <h1 className="header__title">נבחרת מכבי חיפה</h1>
            <div className="header__meta">
              <p className="header__sub">11 שחקנים + מאמן</p>
              <span className="header__chip" title="מערך">4-3-3</span>
            </div>
          </div>
          <button
            className="header__rules-btn"
            onClick={() => setShowRules(true)}
          >
            חוקי הבית
          </button>
        </div>
      </header>

      <main className="main" aria-label="מגרש ובחירת שחקנים">
        <Pitch
          lineup={lineup}
          onSlotClick={handleSlotClick}
        />
      </main>

      <footer className={`footer ${complete ? 'footer--ready' : ''}`}>
        <div className="footer__inner">
          <div className="footer__progress">
            <div className="footer__progress-top">
              <span className="footer__count" aria-live="polite">
                <span className="footer__count-num">{count}</span>
                <span className="footer__count-sep">/</span>
                <span className="footer__count-max">12</span>
              </span>
            </div>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={count}
              aria-valuemin={0}
              aria-valuemax={12}
            >
              <div
                className="progress-bar__fill"
                style={{ width: `${(count / 12) * 100}%` }}
              />
            </div>
          </div>
          <div className="footer__actions">
            <button type="button" className="btn btn--ghost" onClick={handleReset}>
              אפס
            </button>
            <button type="button" className="btn btn--ghost" onClick={handleRandom}>
              <Shuffle size={14} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              className={`btn btn--export ${complete ? 'btn--export-ready' : ''}`}
              onClick={handleExport}
              disabled={!complete || exporting}
              aria-busy={exporting}
            >
              {exporting ? <span className="btn__spinner" /> : <>סיימתי ↓</>}
            </button>
          </div>
        </div>
      </footer>

      <PlayerPicker
        activePicker={activePicker}
        lineup={lineup}
        onSelect={handleSelect}
        onClose={() => setActivePicker(null)}
      />

      <ExportPreview dataUrl={exportUrl} onClose={() => setExportUrl(null)} />
      <HouseRules open={showRules} onClose={() => setShowRules(false)} />

      {/* Hidden export target — captured by html2canvas on export */}
      <div
        id="export-target"
        style={{ position: 'fixed', top: 0, left: '-9999px', pointerEvents: 'none', width: '390px' }}
        aria-hidden
      >
        <ExportPitch lineup={lineup} />
      </div>
    </div>
  );
}
