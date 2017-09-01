---
title: Show the Local Weather
path: /work/show-the-local-weather/
date: 2017-08-04T20:01:34Z
blurb: blurb
intro: FreeCodeCamp - Intermediate Front End Development Projects
responsibilities: Front-end development; HTML; CSS; JavaScript; Promises
---
## Callback hell

About the same time last year I got stuck in what I now know was "callback hell". At that time I was working on the ["Show the Local Weather" app](https://www.freecodecamp.org/challenges/show-the-local-weather) from FreeCodeCamp's Intermediate Front End Development Projects. I could not get it to work and I drifted away from FCC and web development. But then near the end of the year I read about a web dev guide from P1xt and this got me back on my way to becoming a web developer.

## Back on track

In the first half of 2017 I have only been following the guide ["Web Development with Computer Science Foundations - comprehensive"](https://github.com/P1xt/p1xt-guides/blob/master/wd-cs.md). And so it happened that while reading Kyle Simpson's ["You Don't Know JS: Async & Performance"](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20&%20performance/README.md#you-dont-know-js-async--performance) I had a flashback. I finally knew how to finish this "Show the Local Weather" app!

## Building the app

To complete the project the following user stories need to be implemented:

1. I can see the weather in my current location.
1. I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
1. I can push a button to toggle between Fahrenheit and Celsius.

### Location

To get the location of the user I looked at several API's which supply the location details when given an IP address. I opted for freegeoip.net. This API gave me the most accurate location for the IP addresses I could test with.

The location details are retrieved with fetch.

```
var result = fetch('//freegeoip.net/json/').then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var lat = data.latitude;
        var lon = data.longitude;
```
Fetch returns a Promise from which the response is then returned as JSON data. From this data the latitude and longitude info is assigned to variables to be used to get the weather info.

### Weather

To get the weather info I then use the location details of the user I got from the freegeoip.net API. For this I opted to use [openweathermap.org](http://openweathermap.org/api) because this API also supplied a weather icon. So I could use that straightaway to fullfill the user story.

The weather details are also retrieved with fetch. This is "chained" to the first fetch.
```
var result = fetch('//freegeoip.net/json/').then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var lat = data.latitude;
        var lon = data.longitude;
        var url = baseUrlWeather + "lat=" + lat + "&lon=" + lon + apiKey + units;
        return fetch(url);
    })
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
})
```

The returned Promise again holds a response with the JSON data containing the weather details.

### Temperature

To be able to show the temperature in Celsius or Fahrenheit I first wrote 2 helper functions which convert to the required temperature unit. 
```
function cToF(degrees) {
  return (degrees * 1.8 + 32).toFixed(0);
}

function fToC(degrees) {
  return ((degrees - 32) * .5556).toFixed(0);
}
```
I later realized it would be better to store the converted values instead of re-calculating them each time.

I then wrote another helper function to get the current temperature value and unit. This function then calls the appropriate conversion function and sets the new temperature value and unit.

```
function changeTempUnit(id){
  //Get contents off element clicked
  content = document.getElementById(id).innerText;
  var degrees = content.slice(0,-3);
  var isC = content.slice(-1);
  var newContent;
  if (isC === "C") {
    degrees = cToF(degrees);
    newContent = degrees + " " + symbolFahrenheit;
  } else {
    degrees = fToC(degrees);
    newContent = degrees + " " + symbolCelsius;
  }
  //Set new content of element clicked
  document.getElementById(id).innerHTML = newContent;
}
```

And this function was invoked when the user clicks the button showing the temperature.

```
<td>Temperature</td>
<td>
    <button id="txtTemperature" onclick="changeTempUnit(this.id);">
        <span id="temperature"></span>
    </button>
</td>
```

### Wind

As an added bonus I also wrote a function which converts the wind direction in degrees to cardinal.

```
var windDirections = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];

function getWindDirection(degrees) {
  var index = Math.round((degrees % 360) / 22.5);
  return windDirections[index];
}
```

### Styling

To quickly get going with the design of the site I used [Skeleton CSS](http://getskeleton.com/). This framework features a grid and some basic styling which make your site look better from the start.

## Finally

The live site can be found [here](http://ill-fated-circle.surge.sh/). And the source code can be found [here](https://github.com/groninge01/local-weather-app).

To do:

* make the site work on Apple IOS,
* create the same app in Angular (Material & Flex Layout).


