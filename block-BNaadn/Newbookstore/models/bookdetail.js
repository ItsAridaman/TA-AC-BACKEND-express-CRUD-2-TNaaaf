var express=require('express');
var mongoose=require('mongoose');
Schema=mongoose.Schema;

var bookschema=new Schema (
    {
        Title:String,
        Summary:String,
        Category:String,
        Author:String
    }
)
module.exports=mongoose.model('book', bookschema);