import React, { useEffect, useState } from 'react'
import { BookCard } from '../components/BookCard'
import { getAllBooks, searchBook } from '../services/bookApi'

export const Book = () => {

  const [books,setBooks] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {

        const response = await getAllBooks();
        setBooks(response.data)
        
      } catch (error) {

        console.error("Error : ",error);
        setError("Failed to load books");
        
      } finally {

        setloading(false);

      }
    };

    fetchBooks();
  },[]);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      const fetchBooks = async () => {
        try {
          const response = await getAllBooks();
          setBooks(response.data);
        } catch (error) {
          console.error("Error : ",error);
          setError("Failed to load books");
        }
      };
      fetchBooks();
      return;
    }

    try {
      const response = await searchBook(searchQuery);
      setBooks(response.data);
    } catch (error) {
      console.error("Error : ",error);
      setError("Failed to search books");
    }
  };

  if (loading) {
    return <h2>Loading books...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>
  }

  return (
    <div className="min-h-screen bg-cream py-8">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-forest mb-8 text-center">All Books</h1>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8 max-w-2xl mx-auto">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search books by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-3 border border-forest rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent bg-sand text-black placeholder-forest"
                    />
                    <button
                        type="submit"
                        className="bg-forest text-cream px-6 py-3 rounded-lg hover:bg-deepgreen hover:text-forest transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
                    >
                        Search
                    </button>
                </div>
            </form>

            {books.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-forest">No Books Found</p>
                </div>
                ):(
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map((book, index) => {
                            return <BookCard key={book._id} book={book} index={index} />
                        })}
                    </div>
                )}
        </div>
    </div>
  )
}