import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getBookById } from '../services/bookApi'

// Array of available book images
const bookImages = [
  "/images/books/Book1.png",
  "/images/books/Book2.png",
  "/images/books/Book3.png",
  "/images/books/Book4.png",
  "/images/books/Book5.png",
  "/images/books/Book6.png",
  "/images/books/Book7.png",
  "/images/books/Book8.png"
]

// Convert MongoDB ObjectId to a number for image selection
const getImageIndex = (id) => {
  // Convert the first 8 characters of ObjectId to a number
  const idString = typeof id === 'string' ? id : id.toString()
  const hash = parseInt(idString.substring(0, 8), 16)
  return hash % bookImages.length
}

export const BookDetails = () => {

    const { id } = useParams();

    const [book,setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
    const fetchBook = async () => {
        try {

        const response = await getBookById(id);
        setBook(response.data)
        
        } catch (error) {

        console.error("Error : ",error);        setError("Failed to load book");
        
        } finally {

        setLoading(false);

        }
    };

    fetchBook();
    },[id]);

    if (loading) {
        return <h2>Loading...</h2>;
    }
    
    if (error) { 
        return <h2>{error}</h2>;
    }

    if (!book) {
        return <h2>Book not found</h2>;
    }

  return (
    <div className="min-h-screen bg-cream py-8">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-sand rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3 h-96 md:h-auto bg-cream">
                            <img 
                                src={book.image || bookImages[getImageIndex(book._id)]} 
                                alt={book.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "/images/books/Book5.png"
                                }}
                            />
                    </div>
                    <div className="md:w-2/3 p-8">
                        <h1 className="text-4xl font-bold text-forest mb-6">{book.title}</h1>
                        
                        <div className="space-y-4">
                            <div className="border-b border-forest pb-3">
                                <p className="text-lg">
                                    <strong className="text-forest">Author:</strong> 
                                    <span className="ml-2 text-black">{book.author}</span>
                                </p>
                            </div>
                            
                            <div className="border-b border-forest pb-3">
                                <p className="text-lg">
                                    <strong className="text-forest">Price:</strong> 
                                    <span className="ml-2 text-black font-bold text-2xl">₹{book.price}</span>
                                </p>
                            </div>
                            
                            <div className="border-b border-forest pb-3">
                                <p className="text-lg">
                                    <strong className="text-forest">Stock:</strong> 
                                    <span className="ml-2 text-black">{book.stock} units available</span>
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link 
                                to="/allBooks" 
                                className="inline-block bg-forest text-cream px-6 py-2 rounded-lg hover:bg-deepgreen hover:text-forest transition-colors duration-300"
                            >
                                ← Back to Books
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}