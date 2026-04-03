import { useState } from "react";
import html2canvas from "html2canvas";
import Pitch from "./components/Pitch.jsx";
import PlayerPicker from "./components/PlayerPicker.jsx";

const EMPTY_LINEUP = {
  GK: null,
  DEF: [null, null, null, null],
  MID: [null, null, null],
  ATT: [null, null, null],
  MGR: null,
};

function filledCount(lineup) {
  let n = 0;
  if (lineup.GK) n++;
  if (lineup.MGR) n++;
  n += lineup.DEF.filter(Boolean).length;
  n += lineup.MID.filter(Boolean).length;
  n += lineup.ATT.filter(Boolean).length;
  return n;
}

function isComplete(lineup) {
  return filledCount(lineup) === 12;
}

export default function App() {
  const [lineup, setLineup] = useState(EMPTY_LINEUP);
  const [activePicker, setActivePicker] = useState(null);
  const [exporting, setExporting] = useState(false);

  const handleSlotClick = (role, index) => setActivePicker({ role, index });

  const handleSelect = (player) => {
    setLineup((prev) => {
      const next = { ...prev };
      if (activePicker.role === "GK") next.GK = player;
      else if (activePicker.role === "MGR") next.MGR = player;
      else {
        next[activePicker.role] = [...prev[activePicker.role]];
        next[activePicker.role][activePicker.index] = player;
      }
      return next;
    });
    setActivePicker(null);
  };

  const handleRemove = (role, index) => {
    setLineup((prev) => {
      const next = { ...prev };
      if (role === "GK") next.GK = null;
      else if (role === "MGR") next.MGR = null;
      else {
        next[role] = [...prev[role]];
        next[role][index] = null;
      }
      return next;
    });
  };

  const handleReset = () => {
    if (window.confirm("לאפס את כל הבחירות?")) setLineup(EMPTY_LINEUP);
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const el = document.getElementById("pitch-export");
      const canvas = await html2canvas(el, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#071209",
        logging: false,
        onclone: (_doc, el) => {
          el.querySelectorAll(".card__name").forEach((n) => {
            n.style.display = "block";
            n.style.overflow = "visible";
            n.style.webkitLineClamp = "unset";
          });
        },
      });

      const link = document.createElement("a");
      link.download = "maccabi-haifa-xi.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
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
              <span className="header__chip" title="מערך">
                4-3-3
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="main" aria-label="מגרש ובחירת שחקנים">
        <Pitch
          lineup={lineup}
          onSlotClick={handleSlotClick}
          onSlotRemove={handleRemove}
        />
      </main>

      <footer className={`footer ${complete ? "footer--ready" : ""}`}>
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
            <button
              type="button"
              className="btn btn--ghost"
              onClick={handleReset}
            >
              אפס
            </button>
            <button
              type="button"
              className={`btn btn--export ${
                complete ? "btn--export-ready" : ""
              }`}
              onClick={handleExport}
              disabled={!complete || exporting}
              aria-busy={exporting}
            >
              {exporting ? (
                <span className="btn__spinner" />
              ) : (
                <>סיימתי ↓</>
              )}
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
    </div>
  );
}
