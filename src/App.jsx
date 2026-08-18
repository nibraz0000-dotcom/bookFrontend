import React from 'react'
import {Routes , Route} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

// Public

import { Home } from './pages/Home'
import { Book } from './pages/Book'
import { BookDetails } from './pages/BookDetails'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ForgotPassword } from './pages/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword'

// Admin

import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminBooks } from './pages/admin/AdminBooks'
import { AddBook } from './pages/admin/AddBook'
import { EditBook } from './pages/admin/EditBook'

// Layout wrapper for pages with Navbar and Footer
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export const App = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Public */}

          <Route path='/' element={<Layout><Home/></Layout>} />
          <Route path='/book/:id' element={<Layout><BookDetails/></Layout>} />
          <Route path='/allBooks' element={<Layout><Book/></Layout>} />

          {/* Auth */}

          <Route path='/login' element={<Layout><Login/></Layout>} />
          <Route path='/register' element={<Layout><Register/></Layout>} />
          <Route path='/forgot-password' element={<Layout><ForgotPassword/></Layout>} />
          <Route path='/reset-password/:token' element={<Layout><ResetPassword/></Layout>} />

          {/* Admin (protected - admin only) */}

          <Route path='/admin' element={<ProtectedRoute adminOnly><Layout><AdminDashboard/></Layout></ProtectedRoute>} />
          <Route path='/admin/book' element={<ProtectedRoute adminOnly><Layout><AdminBooks/></Layout></ProtectedRoute>} />
          <Route path='/admin/book/add' element={<ProtectedRoute adminOnly><Layout><AddBook/></Layout></ProtectedRoute>} />
          <Route path='/admin/book/edit/:id' element={<ProtectedRoute adminOnly><Layout><EditBook/></Layout></ProtectedRoute>} />

        </Routes>
      </div>
    </AuthProvider>
  )
}
