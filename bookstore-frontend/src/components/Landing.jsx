import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import styles from './Landing.module.css'
import LandingBooksSkeleton from './LandingBooksSkeleton'
import ErrorState from './ErrorState';
import { API_URL } from '../api.js';

function Landing() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const scrollRef = useRef(null)

    useEffect(() => {
        fetch(`${API_URL}/api/books/?limit=10`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server returned status ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                setBooks(data)
                setLoading(false)
            })
            .catch(err => {
                setError({
                    code: "503",
                    message: "Unable to connect to server. Please check your connection."
                });
                setLoading(false)
            })
    }, [])

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -220, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 220, behavior: 'smooth' })
        }
    }

    if (loading) {
        return (<LandingBooksSkeleton />)
    }

    if (error) {
        return (
            <ErrorState
                code={error.code}
                message={error.message}
                onRetry={() => window.location.reload()}
                actionText="RETRY"
            />
        )
    }

    const coverUrl = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`

    return (
        <div className={styles.landing}>
            <section className={styles.hero}>
                <p className={styles.eyebrow}>Personal Library Manager</p>
                <h1 className={styles.headline}>Your Next Great Read<br />Starts Here</h1>
                <p className={styles.subtext}>
                Organize your personal book collection — titles, stock, and
                    pricing, all in one place.
                </p>
            </section>

            <section className={styles.booksSection}>
                <h2 className={styles.sectionHeading}>Books</h2>

                <div className={styles.scrollWrapper}>
                    <button className={styles.scrollArrow} onClick={scrollLeft} aria-label="Scroll left">
                        &larr;
                    </button>


                    <div className={styles.scrollContainer} ref={scrollRef}>
                        {books.map(book => (
                            <Link to={`/books/${book.id}`} key={book.id} className={styles.bookCard}>
                                <h3 className={styles.bookTitle}>{book.title}</h3>
                                <div className={styles.coverWrapper}>
                                    <img
                                        src={coverUrl(book.isbn)}
                                        alt={book.title}
                                        className={styles.bookCover}
                                    />
                                </div>
                                <p className={styles.bookAuthor}>{book.author_name || 'Unknown Author'}</p>
                                <p className={styles.bookPrice}>${parseFloat(book.price).toFixed(2)}</p>
                                <span className={styles.bookDetails}>Details &rarr;</span>
                            </Link>
                        ))}
                    </div>

                    <button className={styles.scrollArrow} onClick={scrollRight} aria-label="Scroll right">
                        &rarr;
                    </button>
                </div>

                {!loading && !error && (
                    <div className={styles.seeMoreWrapper}>
                        <Link to="/books" className={styles.seeMore}>See More &rarr;</Link>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Landing