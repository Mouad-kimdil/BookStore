import styles from './LandingBooksSkeleton.module.css'

function LandingBooksSkeleton() {
    return (
        <div className={styles.skeleton}>
            <div className={`${styles.heading} ${styles.pulse}`}></div>

            <div className={styles.scrollRow}>
                {[1, 2, 3, 4, 5].map(n => (
                    <div key={n} className={styles.card}>
                        <div className={`${styles.cardTitle} ${styles.pulse}`}></div>
                        <div className={`${styles.cardCover} ${styles.pulse}`}></div>
                        <div className={`${styles.cardAuthor} ${styles.pulse}`}></div>
                        <div className={`${styles.cardPrice} ${styles.pulse}`}></div>
                        <div className={`${styles.cardDetails} ${styles.pulse}`}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LandingBooksSkeleton