const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
        title: {type : String, required : true},
        Category: {type : String, required : true},
        author_name : {type : String},
        Content : {type : String}
},{
    timestamps : true,
})

const BlogModel = mongoose.model("blog", blogSchema)


module.exports = {BlogModel}