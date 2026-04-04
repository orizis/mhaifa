import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const RULES = [
  'בחירה של 11 שחקנים + מאמן',
  '5 קבוצות אייקוניות מתחילת שנות ה90 ועד היום',
  'ניתן לצרף שחקן אחד שלא מופיע בקבוצות',
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function HouseRules({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="rules-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="rules-card"
            initial={{ scale: 0.92, opacity: 0, y: -12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: -12 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rules-card__header">
              <h2 className="rules-card__title">חוקי הבית</h2>
              <button className="rules-card__close" onClick={onClose} aria-label="סגור">
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            <ul className="rules-card__list">
              {RULES.map((rule, i) => (
                <li key={i} className="rules-card__item">
                  <span className="rules-card__dot" aria-hidden />
                  {rule}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
