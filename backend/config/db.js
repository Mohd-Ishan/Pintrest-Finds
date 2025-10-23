import mongoose from "mongoose";

const url = 'mongodb+srv://root2:ishan@cluster1.yvz3fci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'

export const connectDB = async()=>{
  await mongoose.connect(url).then(()=> console.log('DB CONNECT')
  )
}