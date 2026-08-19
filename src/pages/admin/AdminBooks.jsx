import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBooks,deleteBook} from "../../services/bookApi";

export const AdminBooks = () => {
      const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get all books
  const fetchBooks = async () => {
    try {
      const response = await getAllBooks();

      setBooks(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  // Run when page loads
  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete book
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteBook(id);

      alert("Book deleted successfully!");

      // Refresh book list
      fetchBooks();
    } catch (error) {
      console.error(error);

      alert("Failed to delete book");
    }
  };

  if (loading) {
    return <h2>Loading books...</h2>;
  }

  return (
    <div className="min-h-screen bg-ice-white py-8">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-navy">📚 Manage Books</h1>
                <Link 
                    to="/admin/book/add"
                    className="bg-soft-blue text-ice-white px-6 py-3 rounded-lg hover:bg-dusty-blue hover:text-navy transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                    ➕ Add Book
                </Link>
            </div>

            {books.length === 0 ? (
                <div className="text-center py-12 bg-light-blue rounded-lg shadow">
                    <p className="text-xl text-navy">No books found.</p>
                </div>
            ) : (
                <div className="bg-light-blue rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-dusty-blue text-navy">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Author</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-soft-blue">
                                {books.map((book) => (
                                    <tr key={book._id} className="hover:bg-ice-white transition-colors">
                                        <td className="px-6 py-4 text-sm text-black">{book.title}</td>
                                        <td className="px-6 py-4 text-sm text-navy">{book.author}</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-black">₹{book.price}</td>
                                        <td className="px-6 py-4 text-sm text-navy">{book.stock} units</td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex space-x-3">
                                                <Link
                                                    to={`/admin/book/edit/${book._id}`}
                                                    className="text-navy hover:text-black font-medium"
                                                >
                                                    ✏️ Edit
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(book._id)}
                                                    className="text-red-600 hover:text-red-800 font-medium"
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}