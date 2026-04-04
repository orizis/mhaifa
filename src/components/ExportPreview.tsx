import { motion, AnimatePresence } from 'framer-motion';
import { X, Share, Download } from 'lucide-react';

interface Props {
  dataUrl: string | null;
  onClose: () => void;
}

/** Synchronous dataUrl → Blob — avoids any async before navigator.share() */
function dataUrlToBlob(dataUrl: string): Blob {
  const [header, data] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)?.[1] ?? 'image/png';
  const bytes = atob(data);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

const canShareFiles = (() => {
  try {
    const probe = new File([], 'probe.png', { type: 'image/png' });
    return navigator.canShare?.({ files: [probe] }) ?? false;
  } catch {
    return false;
  }
})();

export default function ExportPreview({ dataUrl, onClose }: Props) {
  const handleShare = () => {
    if (!dataUrl) return;
    const file = new File([dataUrlToBlob(dataUrl)], 'maccabi-haifa-xi.png', { type: 'image/png' });
    // Called directly from a button click → fresh user gesture → works on iOS
    navigator.share({ files: [file] }).catch(() => {/* user cancelled */});
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.download = 'maccabi-haifa-xi.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <AnimatePresence>
      {dataUrl && (
        <motion.div
          className="export-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="export-preview"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="export-preview__close" onClick={onClose} aria-label="סגור">
              <X size={18} strokeWidth={2.5} />
            </button>

            <img className="export-preview__img" src={dataUrl} alt="הנבחרת שלך" />

            <div className="export-preview__actions">
              {canShareFiles ? (
                <button className="btn btn--export btn--export-ready" onClick={handleShare}>
                  <Share size={16} strokeWidth={2} />
                  שתף / שמור לגלריה
                </button>
              ) : (
                <button className="btn btn--export btn--export-ready" onClick={handleDownload}>
                  <Download size={16} strokeWidth={2} />
                  הורד תמונה
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
