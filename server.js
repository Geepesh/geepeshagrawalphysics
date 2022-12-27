const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 8000 || process.env.PORT
const bp = require('body-parser')
const Data = require('./models/schema_')
const uri = "mongodb+srv://geepesh_agrawal:geepeshagrawal@cluster0.n8viw.mongodb.net/message-database?retryWrites=true&w=majority"

app.use(bp.urlencoded({
  extended : false
}))

app.set('view engine','ejs')
app.set('views','templates')

mongoose.connect(uri,{
  useNewUrlParser : true
}).then(()=>{
    console.log('DATABASE CONNECTED!!!!!!!!');
})

app.get('/',(req,res)=>{
  res.render('register')
})

app.post('/dashboard',(req,res)=>{
  let name , email , password , reentered_password;
  name = req.body.name;
  email = req.body.email;
  password = req.body.password;
  reentered_password = req.body.reentered_password;
  Data.findOne({email:email},(err,dta)=>{
    if(!dta){
      let newData =new Data({
          name  : name ,
          email : email ,
          password : password,
        });
        console.log(newData);
        newData.save().then(()=>{
          res.render('dashboard',{
            name : name,
            email : email,
            password : password
          })
          console.log("user's data saved");
          
        })
    }else{
      res.send('This Email is already associated with us')
    }
  })
})
  /*let newData =new Data({
      name  : name ,
      email : email ,
      password : password,
    });
    newData.save().then(()=>{
      res.render('dashboard',{
        name : name,
        email : email,
        password : password
      })
      console.log("user's data saved");
      */
//})
//})
app.get('/login',(req,res)=>{
  res.render('login')
})

app.post('/login',(req,res)=>{
  let email = req.body.email
  let password = req.body.password
  Data.findOne({email:email,password:password},(err,item)=>{
    if(err){
      console.log('errrrrrrrrrrrrrrr');
    }else{
      res.send(item)
    }
  })
})


/*
app.post('/login',(req,res)=>{
  let email = req.body.email
  let password = req.body.password
  Data.findOne({email:email,password:password},(err,item)=>{
    if(err){
      console.log("errrrrrrr");
    }else{
      res.send(item)
    }
  })
  })
  console.log(Data.findOne({email:email,password:password}));
})
*/
app.listen(port,()=>{
  console.log(`server is running on localhost:${port}`);
})
