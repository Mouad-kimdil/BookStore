import styles from './BookListSkeleton.module.css'

function BookListSkeleton() {
    return (
        <div className={styles.container}>
            <header className={styles.headerSkeleton}>
                <div>
                    <div className={`${styles.titleBlock} ${styles.pulse}`}></div>
                    <div className={`${styles.subtitleBlock} ${styles.pulse}`}></div>
                </div>

                <div className={`${styles.buttonBlock} ${styles.pulse}`}></div>
            </header>

            <div className={styles.grid}>
                {[1, 2, 3, 4, 5, 6].map(n => (
                    <div key={n} className={styles.card}>
                        <div className={`${styles.cardTitle} ${styles.pulse}`}></div>
                        <div className={`${styles.cardCover} ${styles.pulse}`}></div>
                        <div className={`${styles.cardAuthor} ${styles.pulse}`}></div>
                        <div className={styles.cardBottom}>
                            <div className={`${styles.cardPrice} ${styles.pulse}`}></div>
                            <div className={`${styles.cardStock} ${styles.pulse}`}></div>
                        </div>
                        <div className={`${styles.cardDetails} ${styles.pulse}`}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookListSkeleton