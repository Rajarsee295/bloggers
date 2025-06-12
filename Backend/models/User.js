import mongoose from 'mongoose';
//making user schema
// This schema defines the structure of the user document in MongoDB
const userSchema = new mongoose.Schema({
  id:String,
  username: String,
  email: String,
  password:String,

});

//creating a model from the schema
// The model provides an interface to interact with the user collection in MongoDB
const User = mongoose.model('User', userSchema);
export default User;