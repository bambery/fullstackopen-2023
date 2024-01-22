// seed the db with some data
const { faker } = require('@faker-js/faker');
//const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const config = require('./utils/config')
const { saltPassword }  = require('./utils/user_helper.js')

const User = require('./models/user')
const Comment = require('./models/comment');
const Blog = require('./models/blog');

let i;

const randomIdx = (len) => {
  return Math.floor(Math.random() * len);
}

const titleCase = (str) => {
  return str.replace(/\w\S*/g,
    (txt) => (
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
  )
}

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => {
    console.log("connected to server");
  })
  .catch((err) => {
    console.log(err);
  })

const seedDB = async () => {
  /*
  const uri = config.MONGODB_URI;
  const client = new MongoClient(uri, {
  });
  */

  try {
    //
    // create 5 users
    //
    await User.deleteMany({});

    let usersData = [];
    const passwordHash = await saltPassword("secretPassword")

    for (i = 0; i < 5; i++) {
      const newUser = {
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        passwordHash
      }
      usersData.push(newUser);
    }

    await User.insertMany(usersData);
    console.log("Users seeded!");

    //
    // create 7 blogs on random users
    //
    const users = await User.find({})
    console.log(`Users created: ${users.map((user) => user.id)}`);

    await Blog.deleteMany({});

    for (i = 0; i < 7; i++) {
      const tempTitle = faker.word.words({ count: { min: 3, max: 6 } });
     const randUser = users[randomIdx(users.length)];
      const blogData = {
        title: titleCase(tempTitle),
        author: faker.person.fullName(),
        url: faker.internet.url(),
        user: randUser.id
      }
      const newBlog = new Blog(blogData);
      const savedBlog = await newBlog.save()
    }

    console.log("Blogs seeded!");

    //
    // create 10 comments on random blogs
    //
    blogs = await Blog.find({});
    console.log(`Blogs created: ${blogs.map((blog) => blog.id)}`);

    await Comment.deleteMany({});

    for (i = 0; i < 10; i++) {
      const randBlog = blogs[randomIdx(blogs.length)];
      const commentData = {
        content: faker.word.words({ count: { min: 3, max: 10 }}),
        blog: randBlog.id
      }
      const newComment = new Comment(commentData);
      const savedComment = await newComment.save();
    }
    console.log("Comments seeded!");
  } catch (err) {
    console.log("problems!")
    console.log(err.stack);
    exit();
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
