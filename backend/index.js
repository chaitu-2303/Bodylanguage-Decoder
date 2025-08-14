require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Mongo
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error('Mongo connection error', err));

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// enforce HTTPS when behind a proxy (so nginx terminates TLS)
if (process.env.TRUST_HTTPS === 'true') {
  app.enable('trust proxy');
  app.use((req, res, next) => {
    if (req.secure || req.headers['x-forwarded-proto'] === 'https') return next();
    return res.redirect('https://' + req.headers.host + req.url);
  });
}

app.use('/api', routes);

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
