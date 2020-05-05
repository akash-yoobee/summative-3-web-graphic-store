const mongoose = require('mongoose')

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
<<<<<<< HEAD
    useCreateIndex: true,
    useFindAndModify: false
  });
  console.log(`MongoDB connected to ${conn.connection.host} ✔`);
};
=======
    useCreateIndex: true
  })
  console.log(`MongoDB connected to ${conn.connection.host} ✔`)
}
>>>>>>> f3c8403a37f29752c00c6d0a9a3c0f56a5bacd14

module.exports = connectDB
