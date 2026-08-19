import React from "react";
import { useState } from "react";

// Available book images
const bookImages = [
  { value: "", label: "Select an image (or upload your own)" },
  { value: "/images/books/Book1.png", label: "Book 1" },
  { value: "/images/books/Book2.png", label: "Book 2" },
  { value: "/images/books/Book3.png", label: "Book 3" },
  { value: "/images/books/Book4.png", label: "Book 4" },
  { value: "/images/books/Book5.png", label: "Book 5" },
  { value: "/images/books/Book6.png", label: "Book 6" },
  { value: "/images/books/Book7.png", label: "Book 7" },
  { value: "/images/books/Book8.png", label: "Book 8" },
]

export const BookForm = ({ onSubmit, initialData }) => {
  // Store form values
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      author: "",
      price: "",
      stock: "",
      image: "",
    }
  );

  const [imagePreview, setImagePreview] = useState(initialData?.image || "")
  const [selectedFile, setSelectedFile] = useState(null)

  // Update input values
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    
    if (file) {
      setSelectedFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData to send file
    const submitData = new FormData()
    
    submitData.append('title', formData.title)
    submitData.append('author', formData.author)
    submitData.append('price', formData.price)
    submitData.append('stock', formData.stock)
    
    // If a file was selected, append it
    if (selectedFile) {
      submitData.append('image', selectedFile)
    } else if (formData.image) {
      // If no file but URL selected, send the URL
      submitData.append('image', formData.image)
    }

    // Send data to parent component
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-navy mb-2">
          Book Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter book title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-soft-blue rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent bg-ice-white text-black placeholder-soft-blue"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-2">
          Author
        </label>
        <input
          type="text"
          name="author"
          placeholder="Enter author name"
          value={formData.author}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-soft-blue rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent bg-ice-white text-black placeholder-soft-blue"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-2">
          Price (₹)
        </label>
        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-soft-blue rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent bg-ice-white text-black placeholder-soft-blue"
          required
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-2">
          Stock
        </label>
        <input
          type="number"
          name="stock"
          placeholder="Enter stock quantity"
          value={formData.stock}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-soft-blue rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent bg-ice-white text-black placeholder-soft-blue"
          required
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-2">
          Select Book Image
        </label>
        <select
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-soft-blue rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent bg-ice-white text-black"
        >
          {bookImages.map((img) => (
            <option key={img.value} value={img.value}>
              {img.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-2">
          Or enter custom image URL
        </label>
        <input
          type="text"
          name="image"
          placeholder="https://example.com/image.jpg"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-soft-blue rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent bg-ice-white text-black placeholder-soft-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-2">
          Or upload image from your device
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-soft-blue rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent bg-ice-white text-black"
        />
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-navy mb-2">Preview:</p>
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-48 h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
      </div>

      <button 
        type="submit" 
        className="w-full bg-soft-blue text-ice-white py-3 rounded-lg hover:bg-dusty-blue hover:text-navy transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
      >
        Save Book
      </button>

    </form>
  );
}