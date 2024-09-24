import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [blogs, setBlogs] = useState([]); // State for blogs

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/blogs');
      console.log(data); // Log the response
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Fetch blogs when the component mounts
  }, []);

  const handleImageUpload = (e) => {
    setImages(Array.from(e.target.files)); // Convert FileList to an array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('description', description);
    
    // Append each image to formData
    images.forEach((img) => {
      formData.append('images', img);
    });

    try {
      await axios.post('http://localhost:5000/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Reset form fields and fetch new blogs
      setTitle('');
      setCaption('');
      setDescription('');
      setImages([]);
      fetchBlogs(); // Fetch blogs after submission
    } catch (error) {
      console.error('Error uploading blog:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input 
            type="text" 
            className="w-full border rounded-md p-2" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Caption</label>
          <input 
            type="text" 
            className="w-full border rounded-md p-2" 
            value={caption} 
            onChange={(e) => setCaption(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <ReactQuill 
            value={description} 
            onChange={setDescription} 
            className="border rounded-md"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Upload Images</label>
          <input 
            type="file" 
            className="w-full border rounded-md p-2" 
            multiple 
            onChange={handleImageUpload} 
            name="images" // Ensure this matches the backend
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogEditor;
