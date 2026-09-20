import styles from './LoadingState.module.css'

function LoadingState({ message = "LOADING..." }) {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>{message}</p>
        </div>
    );
}

export default LoadingState