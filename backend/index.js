require("dotenv").config();
//const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const userr = require("./user")
const product = require("./product");
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
// adding the middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const jwtkey = "sanjalandkhusii"

app.use("/home", (req, res) => {
  res.json("<h1><center>This is the Home Page</center></h1>")
})

app.post("/addProduct",verifyToken, async (req, res) => {
  let myprod = new product(req.body);
  let result = await myprod.save();
  res.send(result);

})

app.post("/register", async (req, res) => {
  try {
    const user = new userr(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ result: "something went wrong,please try after some time" })
      }
      res.send({ result, auth: token })
    })

  }
  catch (error) {
    console.log(error);
    res.status(501).send(error)
  }
})

app.post("/login", async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      let user = await userr.findOne(req.body).select("-password");

      if (user) {
        jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
          res.send({ result: "something went wrong,please try after some time" })
          }
          res.send({ user, auth: token })
        })

      }
      else {
        res.send({ result: "No user found" });

      }
    }
    else {
      res.send({ result: "missing any of the value" });
    }
  }
  catch (error) {
    console.log("login error");
    res.status(501).send(error)
  }
})

function verifyToken(req,res,next)
{
  let token = req.headers['authorization'];
  if(token)
  {
    token= token.split(':')[1]
    console.log("middleware call:"+token)
    jwt.verify(token,jwtkey,(err,valid)=>
    {
      if(err)
      {
        res.status(401).send({result:"please add a valid token"})
      }
      else 
      {
        next();
      }
    })
  }
  else 
  {
    res.status(403).send({result:"please add header with token"})
  }
  
}
// an backend api to list the product
app.get("/products", verifyToken,async (req, res) => {
  try {
    let products = await product.find();
    if (products.length > 0) {
      res.send(products)
    }
    else {
      res.send({result: "No Product" })
         }

  }
  catch (error) {
    console.log(error);
  } 
});


app.get("/product/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await product.findOne({ _id: id });
    res.send(result);
  }
  catch (error) {
    console.log(error);
  }
})

// an api to delete the product detail

app.delete("/product/:id", verifyToken,async (req, res) => {
  try {
    const id = req.params.id;
    const result = await product.deleteOne({ _id: id });
    res.send(result);
  }
  catch (error) {
    console.log(error);
  }
}
)

app.put("/product/:id", verifyToken,async (req, res) => {
  try {
    const id = req.params.id;
    const result = await product.updateOne(
      { _id: id },
      { $set: req.body }
    );
    res.send(result);
  }
  catch (error) {
    console.log(error);
  }
}
)

app.get("/search/:key", verifyToken,async (req, res) => {
  try {
    let result = await product.find({
      "$or": [
        { name: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { category: { $regex: req.params.key } }
      ]
    });
    res.send(result);
  }
  catch (error) {
    console.warn(error);
  }
})

//creating the mongoose and express server 
const port = process.env.PORT
mongoose.connect(process.env.MONGO_URI,
  {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected to Mongo....server..");
    app.listen(port, () => {
      console.log("Connected at port->" + port)
    })
  }).catch((error) => {
    console.log(error)
    console.log("Cant connect to the mongo server")
  })



