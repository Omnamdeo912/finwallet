const express = require('express');
const { authMiddleware } = require('../middleware');
const router = express.Router();
const { Account } = require('../db')
const mongoose = require('mongoose');

router.get('/balance' , authMiddleware , async (req,res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
})

router.post('/trasfer',authMiddleware, async (req,res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // from account info i.e from where we are sending money.
    const account  =await Account.findOne({ userId: req.userId}).session(session);

    if(!account || account.balance < amount){     // even if you do trasaction very fast that it surpases await time , so since here Critical sestion problem in implemented using session, at a time only one trasaction will happen.
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount  = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    //trasfer the money

    await Account.updateOne({ userId: req.userId },{ $inc: { balance: -amount} }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})

module.exports = router;