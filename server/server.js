const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/blogDB')
.then(()=>{
    console.log("CONNECTED");
    
}).catch((error)=> error);

const blogSchema = new mongoose.Schema({
    title: String,
    caption: String,
    description: String,
    images: [String], // Change this to an array of strings
  });
  

const Blog = mongoose.model('Blog', blogSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post('/api/blogs', upload.array('images'), async (req, res) => {
    const { title, caption, description } = req.body;
    const imagePaths = req.files.map(file => file.path); // Get the paths of uploaded images
  
    const newBlog = new Blog({
      title,
      caption,
      description,
      images: imagePaths, // Save multiple images
    });
  
    try {
      await newBlog.save();
      res.status(201).send(newBlog);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

app.get('/api/blogs', async (req, res) => {
    console.log('Received request for blogs'); // Add this line
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error); // Log the error
        res.status(500).send(error);
    }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});