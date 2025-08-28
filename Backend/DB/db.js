import mongoose from "mongoose";
// const DB_name ="soen"

const connect = async () => {

   try {
    const connectionresult =  await mongoose.connect(process.env.MONGODB_URI)
    console.log("mondodb connect successfully");
    
   //  console.log(`mongoodb connection done :${connectionresult.connection.host}`);
    
   } catch (error) {
    
    console.log("connection to mongodb failed ...",error.message);
   }
 
   
};





export  default connect