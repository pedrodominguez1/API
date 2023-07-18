import mongoose from "mongoose"

const database = process.env.DATABASE!
const mongoURL =
  process.env.API_ENV === "production"
    ? `mongodb+srv://${process.env.MONGODB_ATLAS_USER}:${process.env.MONGODB_ATLAS_PWD}@conexaapi.gcfpncn.mongodb.net/${database}?retryWrites=true&w=majority`
    : `mongodb://localhost:27017/${database}`

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURL)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error(error)
  }
}

export default connectToDatabase
