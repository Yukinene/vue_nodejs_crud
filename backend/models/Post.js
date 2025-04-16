const { DataType, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Post = sequelize.define("Post",{
    title: { type:DataTypes.STRING,allowNull:false},
    context: { type:DataTypes.TEXT,allowNull:false}
})

//Relation 
Post.belongsTo(User,{
    foreignKey: "userId"
});
User.hasMany(Post,{
    foreignKey: "userId"
});

module.exports = Post;