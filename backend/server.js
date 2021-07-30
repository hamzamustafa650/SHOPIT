const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv'); 
 process.on('uncaughtException',err =>{
    console.log(`Error: ${err.stack}`);
    console.log('Shutting down the server due to unhandled Promise rejection');
    process.exit(1) 
    
 })
 //Setting up config file 
 dotenv.config({path:'backend/config/config.env'})
 //Connecting to database
 connectDatabase(); 


const server =app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})


 process.on('unhandleRejection',err => {
     console.log(`Error: ${err.message}`);
     console.log('Shutting down the server due to unhandled Promise rejection');
     server.close(()=>{
         process.exit(1) 
     })
 })