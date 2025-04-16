require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

const app = express();
app.use(cors());
app.use(express.json());

//ใช้ Route
app.use("/api/auth",authRoutes);
app.use("api/posts",postRoutes);

sequelize.sync().then(
    () => {
        app.listen(3000, 
            () => console.log("เซิฟเวอร์กำลังทำงานบนพอร์ต 3000")
            );
    }    
);