const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app isn't listening at http://localhost:${port}`)
})

 //this is only needed for Cloud foundry 
 require("cf-deployment-tracker-client").track();