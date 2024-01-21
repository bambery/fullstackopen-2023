// seed the db with some data
const { faker } = require('@faker-js/faker');
const MongoClient = require("mongodb").MongoClient;
const config = require('./utils/config')
const { saltPassword }  = require('./utils/user_helper.js')

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

const seedDB = async () => {
  const uri = config.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    console.log("connected to server");

    // create 5 users
    const userCollection = client.db("blogApp").collection("users");
    userCollection.drop();

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

    await userCollection.insertMany(usersData);
    console.log("Users seeded!");

    // create 7 blogs on random users
    const userIds = await userCollection
      .find({}, { _id: 1 })

    const blogCollection = client.db("blogApp").collection("blogs");
    blogCollection.drop();

    let blogsData = [];

    for (i = 0; i < 7; i++) {
      const tempTitle = faker.word.words({ count: { min: 3, max: 6 } });
     const userId = userIds[randomIdx(userIds.length)];
      const newBlog = {
        title: titleCase(tempTitle),
        author: faker.person.fullName(),
        url: faker.internet.url(),
        user: userId
      }
      blogsData.push(newBlog);
    }

    blogCollection.insertMany(blogsData);
    console.log("Blogs seeded!");

    // create 10 comments on random blogs

    blogIds = blogCollection.find({}, { _id: 1 });

    const commentCollection = client.db("blogApp").collection("comments");
    commentCollection.drop();

    let commentsData = [];

    for (i = 0; i < 10; i++) {
      const userId = blogIds[randomIdx(blogIds.length)];
      const newComment = {
        content: faker.word.words({ count: { min: 3, max: 10 }})
      }
      commentsData.push(newComment);
    }
    await commentCollection.insertMany(commentsData);
    console.log("Comments seeded!");
  } catch (err) {
    console.log("problems!")
    console.log(err.stack);
    exit();
  } finally {
    await client.close();
  }
}

seedDB();
