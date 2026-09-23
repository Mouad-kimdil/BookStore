import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BookListSkeleton from './BookListSkeleton'
import ErrorState from './ErrorState'
import styles from './BookList.module.css'
import { API_URL } from '../api.js'

function BookList() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`${API_URL}/api/books/`)
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
                        <Link key={book.id} to={`/books/${book.id}`} className={styles.bookCard}>
                            <h2 className={styles.bookTitle}>{book.title}</h2>
                            <div className={styles.coverWrapper}>
                                <img
                                    src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                                    alt={book.title}
                                    className={styles.bookCover}
                                />
                            </div>
                            <p className={styles.bookAuthor}>{book.author_name || 'Unknown Author'}</p>
                            <div className={styles.cardBottom}>
                                <span className={styles.bookPrice}>${parseFloat(book.price).toFixed(2)}</span>
                                <span className={book.stock > 0 ? styles.inStockText : styles.outOfStockText}>
                                    {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
                                </span>
                            </div>
                            <span className={styles.bookDetails}>Details &rarr;</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BookList