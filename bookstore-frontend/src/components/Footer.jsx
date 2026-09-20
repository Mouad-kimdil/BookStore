import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <Link to="/" className={styles.logo}>
                    BOOKSTORE
                </Link>
                <p className={styles.credit}>
                    &copy; 2026 Built by Mouad Kimdil
                </p>

                <p className={styles.techStack}>
                    React & Django REST Framework
                </p>
            </div>
        </footer>
    );
}

export default Footer