import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/components/ErrorBoundary.module.scss';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <motion.div
                    className={styles.errorBoundary}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>Упс! Щось пішло не так</h2>
                    <p>Виникла помилка при роботі додатку. Спробуйте оновити сторінку.</p>
                    {process.env.NODE_ENV === 'development' && (
                        <div className={styles.details}>
                            <h3>Деталі помилки:</h3>
                            <pre>{this.state.error && this.state.error.toString()}</pre>
                            <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                        </div>
                    )}
                    <button
                        className={styles.retryButton}
                        onClick={() => window.location.reload()}
                    >
                        Оновити сторінку
                    </button>
                </motion.div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 