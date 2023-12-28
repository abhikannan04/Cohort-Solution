const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:abhi04@cluster0.ugz7nnh.mongodb.net/course-app");

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  purchasedCourse:[
    {
      type: mongoose.Schema.Types.ObjectId,
      red: "Course"
    }
  ]
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: { 
    type: Boolean, 
    default: true 
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
