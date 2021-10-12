const db = require('./db')
const jwt = require('jsonwebtoken')

const register = (pname, uname, pwrd)=>{
    return db.Note.findOne({uname})
    .then(user=>{
      if(user){
        return{
          statusCode:422,
          status:false,
          message:"Username Already Exist"
        }
      }
      else{
        const newNote = new db.Note({
          pname,uname,pwrd,notes:[]
        })
        newNote.save()
        return{
          statusCode:200,
          status:true,
          message:"User Registered Successfully.. Please Login to Continue."
        } 
      }
    })
}

const login = (uname, pwrd) => {
  return db.Note.findOne({uname,pwrd})
  .then(user=>{
    if(user){
      const token = jwt.sign({currentUser:uname},'supersecretkey123')
      return{
        statusCode:200,
        status:true,
        message:"Login Successfull.",
        token,
        currUser:user.pname,
        currUserName:user.uname,
        userId:user._id
      } 
    }
    else{
      return {
        statusCode:422,
        status:false,
        message:"Invalid Credentials."
      }
    }
    
  })
}

const createnote = (uname, uId, rname, rdescription, rdate)=>{
  return db.Note.findOne({uname})
  .then(user=>{
    if(user){
      // user.notes.push({userId:uId, rheading:rname, rdesc:rdescription, rdate:rdate})
      const newEvent = new db.Event({
        userId:uId, rheading:rname, rdesc:rdescription, rdate:rdate
      })
      user.save()
      newEvent.save()
      return {
        statusCode:200,
        status:true,
        message:"Event Added Successfully."
      }
    }
  }) 
}

const showNotes = (uId) => {
  // return db.Note.findOne({uname})
  // .then(user=>{
  //   if(user){
  //     return {
  //       statusCode:200,
  //       status:true,
  //       note:user.notes,
  //       // note:events,
  //       messageYes: "Your Events",
  //       messageNo:"No Events Created Yet"
  //     }
  //   }
  //   else{
  //     return {
  //       statusCode:422,
  //       status:false,
  //       message:"Operation Denied."
  //     }
  //   }
  // })
  
   // with event collection
  return db.Event.find({"userId":uId})
  .then(user=>{
    if(user){
      return {
        statusCode:200,
        status:true,
        note:user,
        messageYes: "Your Events",
        messageNo:"No Events Created Yet"
      }
    }
    else{
      return {
        statusCode:422,
        status:false,
        message:"Operation Denied."
      }
    }
  })

}


const todayNote = (uId, tDate) => {
  // return db.Note.find({uname})
  // .then(user=>{
  //   if(user){
  //     var note_array=[]
  //     for(let note of user.notes){
  //       if(tDate== note.rdate){
  //         note_array.push(note)
  //       }
  //     }
  //     if(note_array.length>0){
  //       return {
  //         statusCode:200,
  //         status:true,
  //         message:"Your Today's Events",
  //         note:note_array
  //       }
  //     }
  //     else{
  //       return {
  //         statusCode:422,
  //         status:false,
  //         message:"No Events Today"
  //       }
  //     }
  //   }
  // })

  // with event collection
  return db.Event.find({"userId":uId, "rdate":tDate})
  .then(user=>{
    if(user.length>0){
        return {
          statusCode:200,
          status:true,
          message:"Today's Events",
          note:user
        }
      }
      else{
        return {
          statusCode:422,
          status:false,
          message:"No Events Today"
        }
      }
  })
  
}


const updateN = (uId, eId) => {
  return db.Event.findOne({"userId":uId, _id:eId})
  .then(user=>{
    if(user){
      return {
        statusCode:200,
        status:true,
        note:user
      }
    }
  })
}

const saveN = (uId, eId, rname, rdescription, rdate) => {
  return db.Event.updateOne(
    {"userId":uId, _id:eId},
    { $set: {"rheading":rname, "rdesc":rdescription, "rdate":rdate}}
    )
  .then(user=>{
    if(user){
      return {
        statusCode:200,
        status:true,
        message:"Updated Successfully"
      }
    }
  })
}

const deleteN = (uId, eId) => {
  return db.Event.deleteOne({"userId":uId, _id:eId})
  .then(user=>{
    if(user){
      console.log("found");
      return {
        statusCode:200,
        status:true,
        message:"Event Deleted Successfully"
      }
    }
  })
}


module.exports={
    register, login, createnote, showNotes, todayNote, updateN, deleteN, saveN
  }