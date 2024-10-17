const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const DiscordUser = require("../models/discord-user");

passport.serializeUser((user, done) => {
    console.log('Inside serializeUser');
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Inside deserializeUser');
    const user = await DiscordUser.findById(id).exec();
    if (!user) {
        return done(new Error('User Not Found'), false);
    }
    return done(null, user);
})

module.exports = passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_CALLBACK_URL,
    scope: ['identify'],
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    const user = await DiscordUser.findOne({ discordId:  profile.id }).exec();
    if (!user) {
        const newUser = new DiscordUser({
            username: profile.username,
            discordId: profile.id
        });
        const newSavedUser = await newUser.save();
        return done(null, newSavedUser);
    }
    return done(null, user);
}));