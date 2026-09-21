import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './App.css'
import BookList from "./components/BookList"
import BookDetail from "./components/BookDetail"
import CreateBook from "./components/CreateBook"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {

	return (
		<BrowserRouter>
            <div className="app">
                <Navbar />

                <main className="main">
                    <Routes>
                        <Route path="/" element={<Navigate to="/books" replace />} />
                        <Route path="/books" element={<BookList />} />
                        <Route path="/books/:id" element={<BookDetail />} />
                        <Route path="/create" element={<CreateBook />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
	)
}

export default App