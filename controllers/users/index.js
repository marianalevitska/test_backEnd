const signUp = require('./signUp');
const signIn = require('./signIn');
const logOut = require('./logOut');
const current = require('./current');
const updateSubscription = require('./updateSubscription');
const avatar = require('./avatar');
const emailVerify = require('./emailVerify');
const reVerify = require('./reVerify');

module.exports = {
    signUp,
    signIn,
    logOut,
    current,
    updateSubscription,
    avatar,
    emailVerify,
    reVerify
}