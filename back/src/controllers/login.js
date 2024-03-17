var models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const login = async (req, res) => {

  const { password } = req.body;

  let username = req.body.username.trim().toLowerCase()


  const usuario = await models.Usuario.findOne({ where: { username } });

  if (!usuario) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }

  bcrypt.compare(password, usuario.password, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    if (!result) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ username: username, userId: usuario.id }, process.env.SECRET, { expiresIn: '5h' });
    res.status(200).json({ token });
  });

};


module.exports = {login}
  