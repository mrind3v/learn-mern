const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  // default response to a req on port 8000
  const dataTimeIST = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  log = `${dataTimeIST} : ${req.url} new request received\n`;
  fs.appendFile("log.txt", log, function (err, data) {
    if (err) {
      console.log(err);
    }
    console.log("Log updated");
  });

  switch (req.url) {
    case "/":
      res.end("Home page"); // can also send a whole html page under the quotes ` `
      break;
    case "/about":
      res.end("About Page");
      break;
    case "/contact":
      res.end("Contact Page");
      break;
    default:
      res.end("Page doesn't exist!");
  }
});

// cannot directly run the server after creating using createServer
// we need to first run this server on a port in our machine
myServer.listen(8000, () => {
  console.log("Server is listening on PORT: 8000");
});

// also need to make sure this file is running, for the server to be running on a port and
// hence to respond to any request
