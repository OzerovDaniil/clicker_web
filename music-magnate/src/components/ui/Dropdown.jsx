import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/components/Dropdown.module.scss';

const Dropdown = ({ trigger, items, position = 'bottom' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <div
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        setIsOpen(!isOpen);
                    }
                }}
                role="button"
                tabIndex={0}
            >
                {trigger}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`${styles.menu} ${styles[position]}`}
                        initial={{ opacity: 0, y: position === 'bottom' ? -10 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: position === 'bottom' ? -10 : 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {items.map((item, index) => (
                            <button
                                key={index}
                                className={styles.menuItem}
                                onClick={() => {
                                    item.onClick();
                                    setIsOpen(false);
                                }}
                                disabled={item.disabled}
                            >
                                {item.icon && <span className={styles.icon}>{item.icon}</span>}
                                <span className={styles.label}>{item.label}</span>
                                {item.shortcut && (
                                    <span className={styles.shortcut}>{item.shortcut}</span>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dropdown; 