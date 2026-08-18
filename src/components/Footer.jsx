import React from 'react'
import { Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white font-serif">
              BookStore
            </Link>
            <p className="mt-4 text-sm text-neutral-400">
              Your one-stop shop for books across all genres. Discover your next great read with us.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/allBooks" className="text-sm hover:text-white transition-colors">
                  All Books
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-1 flex-shrink-0" size={16} />
                <span className="text-sm">123 Book Street, Reading City, RC 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone size={16} />
                <span className="text-sm">+1 234-567-8900</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail size={16} />
                <span className="text-sm">support@bookstore.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>&copy; {new Date().getFullYear()} BookStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}