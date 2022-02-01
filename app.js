//jshint esversion:6
const express = require("express");
const https = require("https"); //The server requests using express
//through a https secure protocol response
//keep in mind that the best thing about JS is that in the browser only the {.html} is visible since thats the front-end module
//but the back-end module which is {.js} is kept away securely
const bodyParser  = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

  res.sendFile(__dirname  + "/index.html");
});

app.post("/", function(req, res){

console.log(req.body.cityName);
const query = req.body.cityName;
const apiKey  = "{Enter your API Key here made from PostMan}";
const unit  = "metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q="  + query + "&appid=" + apiKey  + "&units="  + unit;

https.get(url, function(response){
//we added (response) instead of (res) to avoid the confusion as we already have (req,{res}) in the above function
console.log(response.statusCode);

response.on("data",function(data){// {response.on()} is a method thats
  //responds actively to multiple "events" triggering a {function(data)} for everytime
  //the term "data" occurs in the query of the url
  // console.log(data); This provides us with the hex format for the buffer code that translates the JSON code
  //it would be sufficient to rather parse the JSON information.
  const weatherData = JSON.parse(data)
//  console.log(weatherData); Gives parsed format of the weather data.
const temp = weatherData.main.temp  //Gives you the {temperature} from the JSON api
//and stores it into {temp} variable THEY ARE TWO DIFFERENT THINGS SO DONT GET CONFUSED!
const weatherDescription  = weatherData.weather[0].description
//If you go to the weather API JSON file/webpage you will notice that the [weather] section is an array
//with only 'One' item therefore which is element number: 0; Even though the item has 4  base elements but the root suggest
//1 item through which as the statement says {weatherData.weather[0].description} where the parsed
//data from {weatherData} gets the first and only element, The element: 0; Which is weather[0] from
//the array, and from it the description gets extracted.
// console.log(weatherDescription);
const icon  =   weatherData.weather[0].icon
const imageURL  = "http://openweathermap.org/img/wn/" + icon +  "@2x.png" //imageURL
//will store and preview the icon image from real-time detection of the weather that
//will render from {const icon} thats why we use {}"+ icon +"} to concate them.
//But again you have to write a code for this image to be in preview state.
res.write("<p>The weather is currently "  + weatherDescription  + "<p>");
res.write("<h1>The temperature in "  + query +   " is "  + temp + " degrees Celcuis.</h1>" );
res.write("<img src=" + imageURL  +">");//Preview state code
res.send();//line 32 and 33 had to be binded in {res.write} since we can use {res.send}
//only once.
//Also we are using {res} and not {respond} to ensure the app's resposibility has changed
//by a different approach now; However if we run our code, The server will crash since
//we are using another {res.send()} which is {res.send("Server is up and running");}
//which we will delete/comment out for your ease.
//Remember that there is One {send} and thats it.


})
})


// https.get("api.openweathermap.org/data/2.5/weather?q={City}&appid={API}&units=metric")
//Remember that when you trigger a {.get} from {https} the string inside the () should be in the format of how the url seems
//to align with for example https://api.openweathermap.org/data/2.5/weather?q={City}&appid={API}&unit=metric#
//notice that the url if copied from the search bar direcly rather than the PostMan Application includes {https://},
//which should be copied from the appication or without the {https://} because the {https.get} does it automatically
//not that it matters but rather saves time and space as you can see that the url itself is pretty long
//on the other hand there is a neat shortcut to it, Instead of pasting the entire url into the request create a const variable
//of the url and then include it into the request and by the end of this comment you will realize that we are no longer
//consider the long url issue anymore.

 })










app.listen(3000, function(){
console.log("Server is running on port 3000.");

})
