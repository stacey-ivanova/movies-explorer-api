const usersRouter = require('express').Router();
const express = require('express');
const { application } = require('express');
const {
  getUser, updateUser, createUser, loginUser,
} = require('../controllers/users');
const { validationProfileUpdate } = require('../middlewares/validation');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', validationProfileUpdate, updateUser);

module.exports = usersRouter;
