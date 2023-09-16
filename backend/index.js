import express from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('Sending request via get function')
});

//route foor save book
app.post('/book',async(request,response)=>{
    try {
        if(
        !request.body.title ||
        !request.body.author ||
        !request.body.publishingYear 
        ){
            return response.status(400).send({
                message:'Send all required fields: tittle,author,publishingYear',
            })
        }
        const newBook ={
            title: request.body.title,
            author: request.body.author,
            publishingYear: request.body.publishingYear
        }
        const book= await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:'Internal Server Error'});
    }

})

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