const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post(
    "/register", async (require,respond) => {
        const { username,password } = require.body;
        const hash = await bcrypt.hash(password,10);
        try {
            const user = await User.create({
                username,password: hash
            }); //สร้างบัญชีผู้ใช้
            respond.json(user);
        } catch (error) {
            respond.status(400).json({
                error:"ชื่อผู้ใช้นี้มีในระบบ"
            });
        }
    }
);

router.post(
    "/login", async (require,respond) => {
        const { username,password } = require.body;

        //ค้นหาผู้ใช้
        const user = await User.findOne({
            where:{ username }
        });
        if (!user) {
            return respond.status(401).json({
                error:"ชื่อผู้ใช้นี้ไม่มีในระบบ"
            });
        }

        //เทียบรหัสผ่าน
        const matchpass = await bcrypt.compare(
            password,user.password
        );
        if (!matchpass) {
            return respond.status(401).json({
                error:"รหัสผ่านไม่ถูกต้อง"
            });
        }

        //เข้าสู่ระบบ
        const token = jwt.sign(
            {id:User.id},
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );
        respond.json({ token });

    }
);

module.exports = router;