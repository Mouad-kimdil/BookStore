import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import GithubIcon from '../assets/github.svg?react'
import LinkedinIcon from '../assets/linkedin.svg?react'
import GmailIcon from '../assets/gmail.svg?react'

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

                <div className={styles.socialLinks}>
                    <a href="https://github.com/Mouad-kimdil" target="_blank" rel="noopener noreferrer"
                        className={styles.socialLink} aria-label="GitHub">
                            <GithubIcon width={20} height={20} />
                    </a>

                    <a href="mailto:mouad.kimdil7@gmail.com" className={styles.socialLink} aria-label="Email">
                        <GmailIcon width={20} height={20} />
                    </a>

                    <a href="https://www.linkedin.com/in/mouad-kimdil/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                        <LinkedinIcon width={20} height={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer
