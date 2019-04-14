# artsee
Making public art more public by leveraging GCP & municipal open data sets. Developed during HackSC -- [devpost](https://devpost.com/software/artsee)

## Inspiration
Public art is abundant all around the country's cities. Finding these locations can be tricky, though: there is no way to browse these points on a map despite publically available datasets that include them. artsee does this on top of using street view to allow users to virtually visit these public art installations without the plane ticket.

## What it does
artsee displays a google map with points of public art in LA, Nashville, Norfolk, and Austin (NYC temporary exhibits work when cross-origin resource sharing allowed). If you are in these areas, allowing your browser to access your location will show you where you are in relation to the art and center the map at your location. Otherwise, the app starts in Nashville, TN. Clicking on the red points will open an info window with information about the art in street view as well as in map view.

## How I built it
Good old html/css/javascript & jQuery as well as GCP for the maps and geocoding APIs. I also got the data from open data sets for different cities.

## Challenges I ran into
There weren't more cities with good public art data sets! Otherwise, I would have loved to add support for more cities. Also, the geolocation API !== geocoding API!

## Accomplishments that I'm proud of
I have a project that I was able to accomplish though I was not able to start until halfway through time that I genuinely enjoyed using 

## What I learned
I worked more with Google Maps and SODA/working with JSON responses from APIs & improved my understanding on writing clean code in javascript. I also appreciate the Google street view & maps API more now:) 

## What's next for artsee
Use the same concept for a location-based AR app :) & fix the bug that makes you refresh 3 times for it to work lol. Maybe add a suggested walking route to link all the points as well 
