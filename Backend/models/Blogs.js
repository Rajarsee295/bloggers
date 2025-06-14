import mongoose from 'mongoose';
//making user schema
// This schema defines the structure of the user document in MongoDB
const blogSchema = new mongoose.Schema({
  id:String,
  blog_title:String,
  blog_content: String,
  blog_comments:[],
  blog_upvotes: Number,   
  blog_downvotes: Number,
  username: String,
},{timestamps:true});

//creating a model from the schema
// The model provides an interface to interact with the user collection in MongoDB
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;  