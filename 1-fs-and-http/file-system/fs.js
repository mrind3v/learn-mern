const fs = require("fs"); // importing the fs module

///////////
// read //
//////////

//// method-1: sync ////

// const data = fs.readFileSync("./f1.txt")
// console.log(""+data)

// or

// const data = fs.readFileSync("./f1.txt", "utf-8")
// console.log(data)

//// method-2: async ////

// an error-first callback - because we handle error first and then execute the fn
// function callback(err,data){
//     if (err) {
//         console.log(err)
//     }
//     setTimeout(()=>{
//         // a delay
//         console.log(data)
//     },2000)

// }
// fs.readFile("./f1.txt", "utf-8", callback)

///////////
// write //
///////////

const dataSync = "You are f2.txt (Sync)";
fs.writeFileSync("f2.txt", dataSync, "utf-8");
console.log("File has been written synchronously")

const dataAsync = "You are f2.txt (Async)";
fs.writeFile("f2.txt", dataAsync, "utf-8", (err, data) => {
  if (err) {
    console.log("The error is: " + err);
  }
  else {
    console.log("File has been written asynchronously")
  }
});


////////////
// unlink //
//////////// 

fs.unlink("f3.txt", (err)=>{
    if (err) {
        console.log("error message: "+err) 
    }
})

fs.unlinkSync("f3.txt") 
