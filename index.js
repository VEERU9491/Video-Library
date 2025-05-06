var mongoClient=require("mongodb").MongoClient;
var express=require("express");
var cors=require("cors");

 var app=express();
 // cors require for handling request methods like post,put,delete
 app.use(cors());
 //for converting data into Json
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));

 var connectionstring="mongodb://127.0.0.1:27017";

 app.get("/get-admin",(req,res)=>{

   mongoClient.connect(connectionstring).then(conobj=>{
       var database=conobj.db("videodb");
       database.collection("tbladmin").find({}).toArray().then(documents=>{
           res.send(documents);
           res.end();
       })
   })

 })
 app.get("/get-videos",(req,res)=>{

   mongoClient.connect(connectionstring).then(conobj=>{
       var database=conobj.db("videodb");
       database.collection("tblvideos").find({}).toArray().then(documents=>{
           res.send(documents);
           res.end();
       })
   })

 })
 app.get("/get-video/:id",(req,res)=>{

   mongoClient.connect(connectionstring).then(conobj=>{
       var database=conobj.db("videodb");
       database.collection("tblvideos").find({videoid:parseInt(req.params.id)}).toArray().then(documents=>{
           res.send(documents);
           res.end();
       })
   })

 })
 app.get("/filtervideo/:categoryid",(req,res)=>{

    mongoClient.connect(connectionstring).then(conobj=>{
        var database=conobj.db("videodb");
        database.collection("tblvideos").find({categoryId:parseInt(req.params.categoryid)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
 
  })
 app.get("/get-users",(req,res)=>{
   mongoClient.connect(connectionstring).then(conobj=>{
       var database=conobj.db("videodb");
       database.collection("tblusers").find({userid:req.params.userid}).toArray().then(documents=>{
           res.send(documents);
           res.end();
       })
   })
 })

 app.get("/get-user/:id",(req,res)=>{
   mongoClient.connect(connectionstring).then(conobj=>{
       var database=conobj.db("videodb");
       database.collection("tblusers").find({userId:parseInt(req.params.id)}).toArray().then(documents=>{
           res.send(documents);
           res.end();
       })
   })
 })
app.get("/get-categories",(req,res)=>{
   mongoClient.connect(connectionstring).then(conobj=>{
       var database=conobj.db("videodb");
       database.collection("tblcategories").find({}).toArray().then(documents=>{
           res.send(documents);
           res.end();
       })
   })
})
app.get("/get-category/:id",(req,res)=>{
   mongoClient.connect(connectionstring).then(conobj=>{
       var database=conobj.db("videodb");
       database.collection("tblcategories").find({categoryId:parseInt(req.params.id)}).toArray().then(documents=>{
           res.send(documents);
           res.end();
       })
   })
})
app.post("/register-users",(req,res)=>{
    mongoClient.connect(connectionstring).then(conobj=>{
        var database=conobj.db("videodb");

var user={

    UserId:req.body.UserId,
    UserName:req.body.UserName,
    Password:req.body.Password,
    Mobile:req.body.Mobile,
    Email:req.body.Email
}

database.collection("tblusers").insertOne(user).then(()=>{
    console.log(`user registered`);
    res.end();
})

    })
})
app.post("/edit-video/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
  
    mongoClient.connect(connectionstring).then(clientObj => {
      const db = clientObj.db("videodb");
      db.collection("tblvideos").updateOne(
        { videoid: id },
        { $set: updatedData }
      ).then(result => {
        res.send({ message: "Video updated successfully" });
      });
    });
  });
app.post("/add-video",(req,res)=>{
    mongoClient.connect(connectionstring).then(conobj=>{
        var database=conobj.db("videodb");

var videos={

   videoid:parseInt(req.body.videoid),
  Title:req.body.Title,
  url:req.body.url,
  Description:req.body.Description,
  Likes:parseInt(req.body.Likes),
  Dislikes:parseInt(req.body.Dislikes),
  views:parseInt(req.body.views),
  CategoryId:parseInt(req.body.categoryId),
  Comments:[req.body.Comments]
}

database.collection("tblvideos").insertOne(videos).then(()=>{
    console.log(`video added`);
    res.end();
})

    })
})
app.post("/add-category",(req,res)=>{
    mongoClient.connect(connectionstring).then(conobj=>{
        var database=conobj.db("videodb");

var category={

    categoryId:parseInt(req.body.categoryId),
    categoryName:req.body.categoryName
}

database.collection("tblcategories").insertOne(category).then(()=>{
    console.log(`added category`);
    res.end();
})

    })
})
app.put("/edit-video/:id",(req,res)=>{
    mongoClient.connect(connectionstring).then(conobj=>{
        var database=conobj.db("videodb");
        var videos={

            videoid:parseInt(req.body.videoid),
           Title:req.body.Title,
           url:req.body.url,
           Description:req.body.Description,
           Likes:parseInt(req.body.Likes),
           Dislikes:parseInt(req.body.Dislikes),
           views:parseInt(req.body.views),
           categoryId:parseInt(req.body.categoryId),
           Comments:[req.body.Comments]
         }

        database.collection("tblvideos").updateOne({videoid:parseInt(req.params.id)},{$set:videos}).then(()=>{
            console.log(`video updated....`);
            res.end();
        })

    })
})
app.delete("/delete-video/:id",(req,res)=>{
    mongoClient.connect(connectionstring).then(conobj=>{
        var database= conobj.db("videodb");

        database.collection("tblvideos").deleteOne({videoid:parseInt(req.params.id)}).then(()=>{
            console.log(`video deleted....`);
            res.end();
        })
    })
    
})
 app.listen(5050);
 console.log(`server started http://127.0.0.1:5050`)