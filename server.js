import express from "express";
import cors from "cors";

const app=express();
app.use(cors());

app.get("/search",(req,res)=>{
 const q=req.query.q||"";
 res.json([
  {id:"demo1",title:`Result for ${q}`},
  {id:"demo2",title:`Another ${q}`}
 ]);
});

app.get("/stream/:id",(req,res)=>{
 res.json({
  title:"Demo Stream",
  url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
 });
});

app.listen(3000,()=>console.log("Server running"));
