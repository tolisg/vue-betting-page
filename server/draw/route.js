const express = require('express');

const routes = express.Router();

const model = require('./model');

routes.route('/add').post(async (req, res) => {
  try {
    const addedBet = await model.create(req.body);
    console.log(addedBet);
    res.status(201).json(addedBet);
  } catch (error) {
    res.status(401).json(error);
  }
});

routes.route('/').get(async (req, res) => {
  try {
    const bets = await model.find().sort({ createdAt: -1 });
    res.status(200).json(bets);
  } catch (error) {
    res.status(404).json(error);
  }
});

routes.route('/:id').get(async (req, res) => {
  try {
    const bet = await model.findOne({ _id: req.params.id });
    res.status(200).json(bet);
  } catch (error) {
    res.status(404).json(error);
  }
});

routes.route('/delete/:id').delete(async (req, res) => {
  try {
    const deletedDraw = await model.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedDraw);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = routes;
