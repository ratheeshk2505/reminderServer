const mongoose = require("mongoose")
// mongoose.connect('mongodb://localhost:27017/reminder',{useNewUrlParser:true})
// const connectDb = async () => {
//     try{
//         const connect = await mongoose.connect(process.env.MONGO_URI)
//         console.log(`mongoDB is connected to ${connect.connection.host}`);
//     }
//     catch(error){
//         console.log(`Error : ${error.message}`);
//         process.exit(1)
//     }
// }

const Note = mongoose.model('Note',{
    pname:String,
    uname:String,
    pwrd:String,
    notes:[]
})

const Event = mongoose.model('Event',{
    userId:String,
    rheading:String,
    rdesc:String,
    rdate:String,
})

module.exports={ Note, Event } 