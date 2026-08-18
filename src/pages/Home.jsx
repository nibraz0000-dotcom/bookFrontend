import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookDetails } from './BookDetails'
import { BookCard } from '../components/BookCard'
import { getAllBooks } from '../services/bookApi'

export const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getAllBooks()
        setBooks(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching books:', error)
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  // Get first 5 books
  const firstFiveBooks = books.slice(0, 5)

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative min-h-[500px] flex items-center justify-center bg-cream">
        {/* Content */}
        <div className="relative z-10 text-center p-8">
          <h1 className="text-6xl md:text-7xl font-bold text-forest mb-4">
            📚 Book Store
          </h1>
          <p className="text-xl md:text-2xl text-forest mb-8">
            Welcome to our Book Store
          </p>
          <Link 
            to="/allBooks" 
            className="inline-block bg-forest text-cream px-8 py-3 rounded-lg hover:bg-deepgreen hover:text-forest transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            View All Books
          </Link>
        </div>
      </div>

      {/* First Five Books Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-forest mb-4">
          Featured Books
        </h2>
        <p className="text-center text-forest mb-12">
          Discover our latest collection
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-forest">Loading books...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {firstFiveBooks.map((book, index) => (
                <BookCard key={book._id} book={book} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}