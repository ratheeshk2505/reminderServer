const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/reminder',{useNewUrlParser:true})
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