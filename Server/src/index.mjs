import express from 'express';
import routes from './routes/index.mjs';
import notFoundHandler from './middlewares/notFound.mjs';
import errorHandler from './middlewares/error.mjs';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to mongoDB'))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
