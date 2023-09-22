import express from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import booksRoute from "./routes/booksRoute.js";
import { Book } from "./models/bookModel.js";
import cors from 'cors';

const app = express();

app.use(express.json());

//middleware for handeling CORS policy
// option 1 - allow all origins with default of cors(*)
// app.use(cors());
//option two - allows custom origin (Safer)
app.use(
    cors({
        origin:'http://localhost:3000',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeader:['Content-Type'],
    })
)

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('Sending request via get function')
});

app.use('/books',booksRoute)

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to DB');
    //function to listen to port
    // backticks ` imp
app.listen(PORT,()=>{
    console.log(`App is listening to port: ${PORT}`);
});
})
.catch((error)=>{
    console.log(error);
});