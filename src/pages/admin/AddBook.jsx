import React from 'react'
import { useNavigate } from "react-router-dom";
import { BookForm } from "../../components/BookForm";
import { addBook } from "../../services/bookApi";

export const AddBook = () => {
    const navigate = useNavigate();

  const handleAddBook = async (formData) => {
    try {
      await addBook(formData);

      alert("Book added successfully!");

      // Go back to admin books page
      navigate("/admin/book");
    } catch (error) {
      console.error(error);

      alert("Failed to add book");
    }
  };
  return (
    <div className="min-h-screen bg-ice-white py-8">
        <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-navy mb-8 text-center">Add New Book</h1>
                <div className="bg-light-blue rounded-lg shadow-lg p-8">
                    <BookForm onSubmit={handleAddBook} />
                </div>
            </div>
        </div>
    </div>
  )
}