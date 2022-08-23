var mongoose = require('mongoose');
var bcrypt = require("bcrypt");
var jwt= require('jsonwebtoken');

var Schema = mongoose.Schema;


var UserSchema = new Schema(
    {   
         username: { type: String, required: true },
         phone: { type: Number},
         email: { type: String, unique: true },
         password: { type: String, minlength:5, required: true },
         role: {type:String},
         IsAdmin: {type:Boolean, default:false}
    }
);

UserSchema.pre('save', async function(next)
{
    if((this.role && this.role==="Manager") || (this.role && this.role==="Admin") )
    {
        this.IsAdmin=true;
    }
    if(this.password && this.isModified('password'))
    {
        this.password= await bcrypt.hash(this.password, 10);

    }
    next()
})

UserSchema.methods.verifypassword= async function(password)
{
    try{
        var result= await bcrypt.compare(password, this.password);
        return result;
    }
    catch (error) {
        return error;
    }
    bcrypt.compare()
}


UserSchema.methods.signToken= async function()
{
    var payload = {userId: this.id, email:this.email, role:this.role, username:this.username, IsAdmin:this.IsAdmin};
    try{
        var token = await jwt.sign(payload, "thisisthesecret");
        return token;
    }
    catch (error)
    {
        return error;
    }
}

UserSchema.methods.userJSON = function(token)
{
    return{
        name: this.name,
        email: this.email,
        role: this.role,
        token: token
    }
}

// UserSchema.pre('save', function (next) {
//     if (this.password && this.isModified('password')) {

//         bcrypt.hash(this.password, 10, (err, hashed) => {
//             // Store hash in your password DB.
//             if (err) return next(err);
//             this.password = hashed;

//             return next()
//         })
//     }
//     else {
//         next();
//     }
// });

// UserSchema.methods.verifypassword = function (password, cb) {
//     bcrypt.compare(password, this.password, (err, result) => {
//         return cb(err, result);
//     })
// };





module.exports = mongoose.model('user', UserSchema);