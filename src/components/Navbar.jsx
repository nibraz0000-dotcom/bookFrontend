import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <header className="bg-dusty-blue shadow-lg sticky top-4 z-50 mx-4 md:mx-8 rounded-full" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
                <Link to='/' className="flex items-center space-x-2">
                    <span className="text-3xl">☺</span>
                    <span className="text-2xl font-bold text-navy">BOOK</span>
                </Link>
                <nav>
                    <ul className="flex space-x-6 items-center">
                        <li>
                            <Link 
                                to='/' 
                                className="text-navy hover:text-black transition-colors duration-300 font-medium"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/allBooks' 
                                className="text-navy hover:text-black transition-colors duration-300 font-medium"
                            >
                                All Books
                            </Link>
                        </li>
                        {user ? (
                          <>
                            {isAdmin() && (
                              <li>
                                <Link 
                                  to='/admin' 
                                  className="text-navy hover:text-black transition-colors duration-300 font-medium"
                                >
                                  Admin Panel
                                </Link>
                              </li>
                            )}
                            <li className="relative">
                              <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center space-x-2 text-navy hover:text-black transition-colors duration-300 font-medium"
                              >
                                <div className="w-8 h-8 rounded-full bg-soft-blue flex items-center justify-center text-ice-white font-bold">
                                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                              </button>
                              {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-ice-white rounded-md shadow-lg py-2 z-50">
                                  <div className="px-4 py-2 border-b border-light-blue">
                                    <p className="text-sm font-medium text-navy">{user.name || 'User'}</p>
                                    <p className="text-xs text-navy">{user.email}</p>
                                  </div>
                                  <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-navy hover:bg-light-blue"
                                  >
                                    Logout
                                  </button>
                                </div>
                              )}
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                                <Link 
                                    to='/login' 
                                    className="text-navy hover:text-black transition-colors duration-300 font-medium"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to='/register' 
                                    className="text-navy hover:text-black transition-colors duration-300 font-medium"
                                >
                                    Register
                                </Link>
                            </li>
                          </>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    </header>
  )
}