var jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: async (req, res, next) => {
        var token = req.headers.authorization;
        var userInfo = req.user;
        console.log("this is userinfo", userInfo);
        try {
            if (token) {
                var payload = await jwt.verify(token, "thisisthesecret");
                req.user = payload;
                if(payload.IsAdmin===true)
                {
                    next();
                }
                else{
                    res.json("not permitted to do so...")
                }
             }
            else {
                res.status(400).json({ error: "Token required" })
            }

        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

}


// module.exports = {
//     verifyTokenAM: async (req, res, next) => {
//       console.log(req.user);
//         if((user.role == "Admin" ) || (user.role == "Manager" ))
//         {
//             var token = req.headers.authorization;
//             try {
//                 if (token) {
//                     var payload = await jwt.verify(token, "thisisthesecret");
//                     req.user = payload;
//                     next();
//                 }
//                 else {
//                     res.status(400).json({ error: "Token required" })
//                 }
    
//             }
//             catch (error) {
//                 console.log(error);
//                 next(error);
//             }
//         }
//         else
//         {
//             res.status(400).json("Sorry, you are not allowed to perform this task"); 
//         }
        
//     }

// }


