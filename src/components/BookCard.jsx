import React from 'react'
import { Link } from 'react-router-dom'

export const BookCard = ({ book, index }) => {
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
  
  // Use custom image if provided, otherwise use the index to select image
  const bookImage = book.image || bookImages[index % bookImages.length]
  const defaultImage = "/images/books/Book5.png"

  return (
    <div className="bg-sand rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
        <div className="h-48 overflow-hidden bg-cream">
            <img 
                src={bookImage} 
                alt={book.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = defaultImage
                }}
            />
        </div>
        <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-xl font-bold text-black mb-2 line-clamp-1">{book.title}</h2>
            <p className="text-black mb-2">Author: {book.author}</p>
            <p className="text-2xl font-bold text-black mb-2">₹{book.price}</p>
            <p className="text-black text-sm mb-4">Stock: {book.stock} units</p>
            <Link 
                to={`/book/${book._id}`}
                className="block w-full bg-forest text-cream text-center py-2 rounded-lg hover:bg-deepgreen hover:text-forest transition-colors duration-300 mt-auto"
            >
                View Details
            </Link>
        </div>
    </div>
  )
}