import React from 'react'
import { Link } from 'react-router-dom'

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-ice-white py-8">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-navy mb-4 text-center">⚙️ Admin Dashboard</h1>
                <p className="text-xl text-navy text-center mb-12">Welcome to the Book Store Admin Panel.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link 
                        to="/admin/book" 
                        className="bg-light-blue rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-soft-blue"
                    >
                        <div className="text-center">
                            <div className="text-5xl mb-4">📚</div>
                            <h2 className="text-2xl font-bold text-navy mb-2">Manage Books</h2>
                            <p className="text-navy">View, edit, and delete books</p>
                        </div>
                    </Link>
                    
                    <Link 
                        to="/admin/book/add" 
                        className="bg-light-blue rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-soft-blue"
                    >
                        <div className="text-center">
                            <div className="text-5xl mb-4">➕</div>
                            <h2 className="text-2xl font-bold text-navy mb-2">Add New Book</h2>
                            <p className="text-navy">Add a new book to the store</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}