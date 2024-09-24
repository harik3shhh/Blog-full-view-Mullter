import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/blogs');
        console.log(data); // Log the response
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <div key={blog._id} className="border rounded-lg p-4 shadow-md">
          {blog.images.map((img, index) => (
            <img key={index} src={`http://localhost:5000/${img}`} alt={`${blog.title} image ${index + 1}`} className="w-full h- object-fill mb-2" />
          ))}

          <p className="text-gray-600">{blog.caption}</p>
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="text-gray-800">
            <span
              dangerouslySetInnerHTML={{
                __html: blog.description.replace(/<a /g, '<a style="color: blue; text-decoration: underline;" ')
              }}
            />
          </p>
          {/* <a
            href={`/blogs/${blog._id}`}
            className="text-blue-600 underline"
          >
            Read more
          </a> */}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
