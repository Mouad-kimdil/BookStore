import { Link } from 'react-router-dom'
import styles from './ErrorState.module.css'

function ErrorState({
    code = "404",
    message = "The page you're looking for doesn't exist",
    actionLink = "/books",
    actionText = "RETURN TO HOME",
    onRetry = null
}) {
    return (
        <div className={styles.errorContainer}>
            <h1 className={styles.errorCode}>{code}</h1>
            <p className={styles.errorMessage}>{message}</p>
            {onRetry ? (
                <button onClick={onRetry} className={styles.errorActionBtn}>
                    {actionText}
                </button>
            ) : (
                <Link to={actionLink} className={styles.errorActionBtn}>
                    {actionText}
                </Link>
            )}
        </div>
    );
}

export default ErrorState;