const jwt = require("jsonwebtoken");

function usuarioAutenticado(res, req, next){
    let authorization = req.headers.authorization;
    if(!authorization){
        res.authorization(401).json({
            type: "warning",
            description: "Token não necessário."
        });
        return;
    }

    let token = authorization.split(" ")[1];

    jwt.verify(token, process.env.SEGREDO, (error) => {
        if(error){
            res.status(401).json({
                type: "warning",
                description: "Token Inválido"
            })
        }
        
        next();
    });
}

module.exports = {
    usuarioAutenticado
}