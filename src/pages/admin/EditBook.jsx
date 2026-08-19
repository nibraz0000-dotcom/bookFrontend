import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookForm } from "../../components/BookForm";
import { getBookById,updateBook } from "../../services/bookApi";

export const EditBook = () => {
      const { id } = useParams();

  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get existing book
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(id);

        setBook(response.data);
      } catch (error) {
        console.error(error);

        alert("Failed to load book");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Update book
  const handleUpdateBook = async (formData) => {
    try {
      await updateBook(id, formData);

      alert("Book updated successfully!");

      navigate("/admin/book");
    } catch (error) {
      console.error(error);

      alert("Failed to update book");
    }
  };

  if (loading) {
    return <h2>Loading book...</h2>;
  }

  if (!book) {
    return <h2>Book not found</h2>;
  }
  return (
    <div className="min-h-screen bg-ice-white py-8">
        <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-navy mb-8 text-center">✏️ Edit Book</h1>
                <div className="bg-light-blue rounded-lg shadow-lg p-8">
                    <BookForm
                        initialData={book}
                        onSubmit={handleUpdateBook}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}