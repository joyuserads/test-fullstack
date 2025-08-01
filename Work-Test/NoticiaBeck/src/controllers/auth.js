
import jwt from "jsonwebtoken";




const login = (req, res) => {
  try {
    usuarioController.findOne({ email: req.body.email }, (erro, usuario) => {
      if (!usuario) {
        return res.status(401).json({
          statusCode: 401,
          message: "Usuario não encontrado!!",
          data: {
            email: req.body.email
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: error.message
    });
  }
};
