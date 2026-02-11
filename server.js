import express from "express"
import Player from "./routes/player.routes.js"
import mongoose from "mongoose"
import cors from "cors"

const app = express()               

app.use(express.json())

app.use("/api/players", Player)
const MONGO_URI='mongodb+srv://gdgocpsit_db_user:lDRKLmID1knvmWj1@biddingbattle.juhlpbi.mongodb.net/?appName=BiddingBattle'
app.listen(5004, () => {
    console.log("Server is running on port 5004")
})  
mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log(error)
})