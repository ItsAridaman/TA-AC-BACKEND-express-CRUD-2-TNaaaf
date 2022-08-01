var express = require('express');
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var commentschema = new Schema(
    {
        content: { type: String, required: true },
        bookId: String

    }
)
module.exports = mongoose.model('comment', commentschema);