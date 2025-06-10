import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/components/Tabs.module.scss';

const Tabs = ({ tabs, defaultTab = 0 }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <div className={styles.tabs}>
            <div className={styles.tabList}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.icon && <span className={styles.icon}>{tab.icon}</span>}
                        <span className={styles.label}>{tab.label}</span>
                    </button>
                ))}
            </div>
            <motion.div
                className={styles.tabContent}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                key={activeTab}
            >
                {tabs[activeTab].content}
            </motion.div>
        </div>
    );
};

export default Tabs; 