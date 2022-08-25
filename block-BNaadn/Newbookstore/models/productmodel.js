var express = require('express');
var mongoose = require('mongoose');
Schema = mongoose.Schema;


var productSchema = new Schema(
    {
        productName: String,
        productPrice: Number,
        productDescription: String,
        productInventry: Number
    }
)
module.exports = mongoose.model('product', productSchema);