const express = require('express')
const jwt = require('jsonwebtoken')
const dataServices = require('./services/data.services')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))

const jwtMiddleWare = (req,res,next)=>{
    try{
        const token = req.headers["x-token"]
        const data = jwt.verify(token,'supersecretkey123')
        console.log(data)
        next()
    }
    catch{
        const result = ({
            statusCode:401,
            status:false,
            message:"Please Login to Transact..."
          })
          res.status(result.statusCode).json(result)
    }
    
}

app.post('/register', (req,res)=>{
    dataServices.register(req.body.pname, req.body.uname, req.body.pwrd).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/login', (req,res)=>{
    dataServices.login(req.body.uname, req.body.pwrd).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/createnote', jwtMiddleWare, (req,res)=>{
    dataServices.createnote(req.body.uname, req.body.uId, req.body.rname, req.body.rdescription, req.body.rdate).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/viewnotes', jwtMiddleWare, (req,res)=>{
    dataServices.showNotes(req.body.uId).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/todaynote', jwtMiddleWare, (req,res)=>{
    dataServices.todayNote(req.body.uId, req.body.tDate).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/update', jwtMiddleWare, (req,res)=>{
    dataServices.updateN(req.body.uId, req.body.eId).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/save', jwtMiddleWare, (req,res)=>{
    dataServices.saveN(req.body.uId, req.body.eId, req.body.rname, req.body.rdescription, req.body.rdate).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/delete', jwtMiddleWare, (req,res)=>{
    dataServices.deleteN(req.body.uId, req.body.eId).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.listen(3000, ()=>{
    console.log("server started")
})