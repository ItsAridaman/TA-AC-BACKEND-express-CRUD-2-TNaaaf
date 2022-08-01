var express = require('express');
var mongoose = require('mongoose');
Schema = mongoose.Schema;


var bookschema = new Schema(
    {
        Title: String,
        Summary: String,
        Category: String,
        Author: String,
        comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
        Likes: { type: Number, default: 0 }

    }
)
module.exports = mongoose.model('book', bookschema);