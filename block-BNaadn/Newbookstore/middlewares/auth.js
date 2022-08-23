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
    },

    verifyTokenA: async (req, res, next) => {
        var token = req.headers.authorization;
        var userInfo = req.user;
        console.log("this is userinfo", userInfo);
        try {
            if (token) {
                var payload = await jwt.verify(token, "thisisthesecret");
                req.user = payload;
                if(payload.role=="Admin")
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






