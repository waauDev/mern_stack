import app	 from "./app.js";
import {connectDB } from "./db.js";


connectDB();
app.listen(5000, '0.0.0.0', () => {
  console.log('Server on port 5000');
});


//console.log('Server on port',3000);