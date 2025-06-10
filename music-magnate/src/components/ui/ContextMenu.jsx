import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/components/ContextMenu.module.scss';

const ContextMenu = ({ isOpen, onClose, position, items }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
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
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={menuRef}
                    className={styles.contextMenu}
                    style={{
                        top: position.y,
                        left: position.x
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                >
                    {items.map((item, index) => (
                        <button
                            key={index}
                            className={styles.menuItem}
                            onClick={() => {
                                item.onClick();
                                onClose();
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
    );
};

export default ContextMenu; 