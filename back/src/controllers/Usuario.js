
const bcrypt = require('bcrypt');
const { UsuarioService } = require("../services");
var models = require('../models');


const listAllUsuario = async (req, res) => {
  try {
    const Usuario = await UsuarioService.listAllUsuario();
    res.json(Usuario);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneUsuario = async (req, res) => {
  try {
    const id = req.params.Usuario_id;
    const Usuario = await UsuarioService.listOneUsuario(id);
    res.json(Usuario);

  } catch (err) {
    res.status(500).json({ action: "listOneUsuario", error: err.message });
  }

};

const createUsuario = async (req, res) => {

  try {
    const newUsuario = await UsuarioService.createUsuario(req.body);

    res.json(newUsuario)
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Usuario.' });
  }
};

const updateUsuario = async (req, res) => {

  try {
    const UsuarioUpdate = await UsuarioService.updateUsuario(req.params.Usuario_id, req.body);
    res.json(UsuarioUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateUsuario', error: err.message });
  }
};

const deleteUsuario = async (req, res) => {
  const id = req.params.Usuario_id;
  try {
    await UsuarioService.deleteUsuario(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deleteUsuario', error: err.message });
  }
};




module.exports = {
  listAllUsuario, listOneUsuario, createUsuario, updateUsuario, deleteUsuario,
};

