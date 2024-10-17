const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const { errorHandler, routeNotFoundHandler } = require('./middlewares/error-handler');

const port = process.env.PORT || 3000;

const app = express();

mongoose
    .connect('mongodb://rootuser:rootpass@localhost:27017/express_tutorial?directConnection=true&authSource=admin')
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.log(err));

app.use(express.json());

app.use(cookieParser('secret'));

app.use(session({
    secret: 'super-secret',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: MongoStore.create({ client: mongoose.connection.getClient() })
}));

app.use(passport.initialize());
app.use(passport.session({}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productsRouter);

// Error handlers
app.use(errorHandler);
app.use(routeNotFoundHandler)

app.listen(port, () => console.log(`Server running on port ${port}`));
