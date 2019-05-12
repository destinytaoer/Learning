let express = require('express');
let app = express();
app.listen(3000);
let user = require('./routes/user');
let article = require('./routes/article');
app.use('/user', user);
app.use('/article', article);