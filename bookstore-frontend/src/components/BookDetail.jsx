import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'
import ErrorState from './ErrorState'
import LoadingState from './LoadingState'
import styles from './BookDetail.module.css'
import { API_URL } from '../api.js'

const ERROR_MESSAGES = {
    400: "Invalid request",
    403: "Permission denied",
    404: "The page you're looking for doesn't exist",
    500: "Internal server error. Please try again later."
}

function BookDetail() {
    const { id } = useParams()
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`${API_URL}/api/books/${id}/`)
            .then(response => {
                if (!response.ok) {
                    const statusCode = response.status
                    const customMessage = ERROR_MESSAGES[statusCode] || "An unexpected error occurred."

                    setError({
                        code: String(statusCode),
                        message: customMessage
                    })
                    setLoading(false)
                    return null
                }
                return response.json()
            })
            .then(data => {
                if (data) {
                    setBook(data)
                    setLoading(false)
                }
            })
            .catch(err => {
                setError({
                    code: "503",
                    message: "Unable to connect to server. Please check your connection."
                })
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return <LoadingState message="LOADING BOOK DETAILS..." />
    }
    if (error) {
        return (
            <ErrorState 
                code={error.code}
                message={error.message}
                actionLink="/books"
                actionText="RETURN TO HOME"
            />
        )
    }

    return (
        <div className={styles.bookDetailContainer}>
            <Link to="/books" className={styles.backLink}>
                &larr; BACK TO BOOKS
            </Link>

            <header className={styles.bookHeader}>
                <h1 className={styles.bookTitle}>{book.title}</h1>
                <p className={styles.bookAuthor}>By {book.author_name || "Unknown Author"}</p>
            </header>

            <div className={styles.bookBadges}>
                <div className={styles.categoryWrapper}>
                    {book.categories && book.categories.length > 0 ? (
                        <div className={styles.chipRow}>
                            {book.categories.map((c, i) => (
                                <span key={c.id || i} className={styles.chip}>
                                    {c.name || c}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.chipRow}>
                            <span className={styles.chip}>General</span>
                        </div>
                    )}
                </div>

                <div className={styles.stockWrapper}>
                    <span className={book.stock > 0 ? styles.inStockText : styles.outOfStockText}>
                        {book.stock > 0 ? `IN STOCK (${book.stock})` : 'OUT OF STOCK'}
                    </span>
                </div>
            </div>

            <div className={styles.bookGrid}>
                <div className={styles.gridItem}>
                    <span className={styles.gridLabel}>PRICE</span>
                    <span className={styles.gridValue}>${book.price}</span>
                </div>

                <div className={styles.gridItem}>
                    <span className={styles.gridLabel}>ISBN</span>
                    <span className={styles.gridValue}>{book.isbn}</span>
                </div>

                <div className={styles.gridItem}>
                    <span className={styles.gridLabel}>PAGES</span>
                    <span className={styles.gridValue}>{book.pages}</span>
                </div>

                <div className={styles.gridItem}>
                    <span className={styles.gridLabel}>PUBLISHED</span>
                    <span className={styles.gridValue}>{book.published_date}</span>
                </div>
            </div>

            <section className={styles.bookOverview}>
                <h2 className={styles.overviewTitle}>ABOUT THIS BOOK</h2>
                <p className={styles.overviewText}>
                    {book.description || "No overview available for this book."}
                </p>
            </section>
        </div>
    )
}

export default BookDetail