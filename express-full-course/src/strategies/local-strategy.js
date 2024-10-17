const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const { comparePassword } = require('../utils/helpers')

passport.serializeUser((user, done) => {
    console.log('Inside serializeUser');
    console.log(user);
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    console.log(`Inside deserializeUser: ${id}`);
    const user = await User.findById(id).exec();
    if (!user) {
        return done(new Error('User Not Found'), false);
    }
    return done(null, user);
})

module.exports = passport.use(new LocalStrategy({}, async (username, password, done) => {
    const user = await User.findOne({ username: username }).exec();
    if (!user || !await comparePassword(password, user.password)) {
        return done(new Error('Bad Credentials'), false);
    }
    return done(null, user);
}));
