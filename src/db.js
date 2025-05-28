// import mongoose from "mongoose";

// export const connectDB = async() =>{
//     try {
//         await mongoose.connect("mongodb://localhost/merndb");
//         console.log("Conectado a la base de datos");
//     } catch (error) {
//         console.log(error);
//     }
// }

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a la base de datos");
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
  }
};
