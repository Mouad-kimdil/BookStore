import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import LoadingState from './LoadingState'
import ErrorState from './ErrorState'
import styles from './CreateBook.module.css'

function CreateBook() {
    const [formData, setformData] = useState({
        title: "",
        isbn: "",
        pages: 0,
        price: 0,
        stock: 0,
        published_date: "",
        author: '',
        categories: ""
    })
    const [authors, setAuthors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/authors/')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unable to fetch authors list.");
                }
                return response.json();
            })
            .then(data => {
                setAuthors(data);
                if (data.length > 0) {
                    setformData(prev => ({ ...prev, author: data[0].id }));
                }
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setError({
                    isFatal: true,
                    code: "503",
                    message: "Unable to connect to server. Please check your backend connection."
            });
        });
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const bookData = {
            ...formData,
            categories: formData.categories
                .split(',')
                .map(item => parseInt(item.trim()))
                .filter(item => !isNaN(item))
        }

        fetch('http://127.0.0.1:8000/api/books/', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(bookData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    if (typeof data === 'object' && data !== null) {
                        const messages = Object.values(data).flat().join(' | ');
                        throw new Error(messages);
                    }
                    throw new Error("Failed to create book. Please check your inputs.");
                })
            }
            return response.json();
        })
        .then(data => {
            setLoading(false);
            navigate(`/books/${data.id}`);
        })
        .catch(err => {
            setLoading(false);
            if (err.name === 'TypeError' || err.message.includes('fetch')) {
                setError({
                    isFatal: true,
                    code: "503",
                    message: "Unable to connect to server. Please check your backend connection."
                });
            } else {
                setError({
                    isFatal: false,
                    message: err.message
                });
            }
        })
    }

    function handleChange(e) {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    if (loading) {
        return <LoadingState message="CREATING BOOK..." />
    }

    if (error && error.isFatal) {
        return (
            <ErrorState
                code={error.code}
                message={error.message}
                actionText="RETRY"
                onRetry={() => window.location.reload()}
            />
        );
    }

    return (
        <div className={styles.container}>
            <Link to="/books" className={styles.backLink}>
                &larr; BACK TO CATALOG
            </Link>

            <header className={styles.header}>
                <h1 className={styles.title}>Add a New Book</h1>
                <p className={styles.description}>
                    Fill in the details below to add a new book to the catalog. Fields marked with <span className={styles.required}>*</span> are required.
                </p>
            </header>

            {error && !error.isFatal && <div className={styles.errorMessage}>{error.message}</div>}

            <form onSubmit={handleSubmit} className={styles.formCard}>
                <div className={styles.formField}>
                    <label htmlFor="title">
                        Title <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className={styles.input}
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Clean Code"
                        required
                    />
                    <p className={styles.fieldHint}>The full title of the book</p>
                </div>

                <div className={styles.formField}>
                    <label htmlFor="isbn">
                        ISBN <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        name="isbn"
                        id="isbn"
                        className={styles.input}
                        value={formData.isbn}
                        onChange={handleChange}
                        placeholder="e.g. 9780132350884"
                        required
                    />
                    <p className={styles.fieldHint}>13-digit ISBN without hyphens</p>
                </div>

                <div className={styles.formField}>
                    <label htmlFor="pages">
                        Pages <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="number"
                        name="pages"
                        id="pages"
                        className={styles.input}
                        min="1"
                        value={formData.pages}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formField}>
                    <label htmlFor="price">
                        Price ($) <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        id="price"
                        className={styles.input}
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formField}>
                    <label htmlFor="stock">
                        Stock <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="number"
                        name="stock"
                        id="stock"
                        className={styles.input}
                        min="0"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formField}>
                    <label htmlFor="published_date">
                        Published Date <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="date"
                        name="published_date"
                        id="published_date"
                        className={styles.input}
                        value={formData.published_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formField}>
                    <label htmlFor="author">
                        Author <span className={styles.required}>*</span>
                    </label>
                    <select
                        name="author"
                        id="author"
                        className={styles.input}
                        value={formData.author}
                        onChange={handleChange}
                        required
                    >
                        {authors.length === 0 ? (
                            <option value="">No authors available</option>
                        ) : (
                            authors.map(author => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))
                        )}
                    </select>
                    <p className={styles.fieldHint}>Select the author of the book</p>
                </div>

                <div className={styles.formField}>
                    <label htmlFor="categories">Categories</label>
                    <input
                        type="text"
                        name="categories"
                        id="categories"
                        className={styles.input}
                        value={formData.categories}
                        onChange={handleChange}
                        placeholder="e.g. 1, 2, 5"
                    />
                    <p className={styles.fieldHint}>Comma-separated category IDs (optional)</p>
                </div>

                <button type="submit" className={styles.submitBtn}>
                    Create Book
                </button>
            </form>
        </div>
    )
}

export default CreateBook