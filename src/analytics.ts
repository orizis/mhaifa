declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  gtag('event', name, params ?? {});
}

export function trackLineupExported(lineup: {
  gk: string | null;
  def: (string | null)[];
  mid: (string | null)[];
  att: (string | null)[];
  mgr: string | null;
}) {
  trackEvent('lineup_exported', {
    gk:      lineup.gk ?? '',
    def:     lineup.def.filter(Boolean).join(', '),
    mid:     lineup.mid.filter(Boolean).join(', '),
    att:     lineup.att.filter(Boolean).join(', '),
    manager: lineup.mgr ?? '',
  });
}
