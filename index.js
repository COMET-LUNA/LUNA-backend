const express = require('express')
const app = express()
const port = process.env.PORT || 3030

var findMeRouter = require('./routes/findMe')

app.use("/findMe", findMeRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})