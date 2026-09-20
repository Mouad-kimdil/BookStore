import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BookListSkeleton from './BookListSkeleton'
import ErrorState from './ErrorState'
import styles from './BookList.module.css'

function BookList() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/books/')
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
                    message: "Unable to connect to server. Please check your backend connection."
                })
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <BookListSkeleton />
    }


    if (error) return (
        <ErrorState
            code={error.code}
            message={error.message}
            actionText="RETRY CONNECTION"
            onRetry={() => window.location.reload()}
        />
    )

    return (
        <div className={styles.bookList}>
            <header className={styles.pageHeader}>
                <div>
                    <h1 className={styles.title}>Book Catalog</h1>
                    <p className={styles.pageDescription}>Browse and manage your bookstore collection.</p>
                </div>
                <Link to="/create" className={styles.addBookBtn}>
                    + Add Book
                </Link>
            </header>

            <div className={styles.divider}></div>

            {books.length > 0 && (
                <div className={styles.toolbar}>
                    <span>{books.length} {books.length === 1 ? 'book' : 'books'}</span>
                </div>
            )}

            {books.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No books available in the catalog yet.</p>
                    <Link to="/create" className={styles.addBookBtn}>Add Your First Book</Link>
                </div>
            ) : (
                <div className={styles.bookGrid}>
                    {books.map(book => (
                        <div key={book.id} className={styles.bookCard}>
                            <div className={styles.topSection}>
                                <h2 className={styles.bookTitle}>{book.title}</h2>
                                <p className={styles.bookAuthor}>by {book.author_name || 'Unknown Author'}</p>

                                {book.categories && book.categories.length > 0 && (
                                    <div className={styles.chipRow}>
                                        {book.categories.map((c, i) => (
                                            <span key={c.id || i} className={styles.chip}>
                                                {c.name || c}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className={styles.bottomSection}>
                                <div className={styles.priceStockGroup}>
                                    <span className={styles.bookPrice}>
                                        ${parseFloat(book.price).toFixed(2)}
                                    </span>
                                    <span className={styles.dot}>·</span>
                                    <span className={book.stock > 0 ? styles.inStockText : styles.outOfStockText}>
                                        {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
                                    </span>
                                </div>

                                <Link className={styles.viewDetailsBtn} to={`/books/${book.id}`}>
                                    View Details &rarr;
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BookList