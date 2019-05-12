let express = require('express');
let router = express.Router();

router.get('/post', function (req, res) {
  res.send('文章');
});

router.get('/delete', function (req, res) {
  res.send('删除文章');
});

module.exports = router;