import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
    return (
        <header className={styles.navbar}>
            <div className={styles.navContainer}>
                <Link to="/" className={styles.logo}>
                    BOOKSTORE
                </Link>

                <nav className={styles.navLinks}>
                    <NavLink
                        to="/"
                        end
                        className={({isActive}) =>
                            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                        }
                    >Home</NavLink>

                    <NavLink
                        to="/books"
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                        }
                    >Catalog</NavLink>

                    <Link to="/create" className={styles.addBookBtn}>
                        + Add Book
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Navbar