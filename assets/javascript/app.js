$(document).ready(function(){

// List of heros in generated buttons 
$(".col-xs-2").hide();
var heroArray = ["Spider Man", "Batman", "Wonder Woman", "The Hulk", "Green Lantern", "Superman", " Hawk Girl", "Wolverine", "Magneto", "Captain Marvel", "Firestorm", "Iron Man", "Aqua Man", "Martian Manhunter", "Captain Atom"]
var moveGif;
var stillGif;
var gifState;
var rating;
// Generates buttons of heros

function heroButtons() {
	$("#hero-buttons").empty();

	for( var i = 0; i < heroArray.length; i++) {
		var s = $("<button>");
			s.addClass("heroBtn");
			s.attr("data-name", heroArray[i]);
			s.text(heroArray[i]);
			$(".col-xs-2").show();
			$("#heroSearch").attr("class", "col-xs-offset-3")
			$("#hero-buttons").append(s);

	}
}
// Runs function on click for add hero

$(document).on("click", "#add-hero", addHero);

$(document.body).on("click", ".heroBtn", searchHero);

$(document.body).on("click", ".heroPic", moveHero);
// Adds the hero inputed by user into new button

function addHero() {
	$("#hero-gifs").empty();
	var hero = $("#hero-input").val().trim();
// Makes sure user null user input does not generate empty button
	if(!hero) {
		return false 
	}
	$("#hero-input").val("");
	event.preventDefault();
	heroArray.push(hero);
	heroButtons();

// Runs ajax to fetch gifs

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&rating=pg-13&api_key=dc6zaTOxFJmzC";
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
     for(var i = 0; i < 24; i++) {
      	var newDiv = $("<div>")
      	var heroGif = $("<img>");
      	var p = $("<p>");
      	heroGif.addClass("heroPic");
      	heroGif.attr("src", response.data[i].images.fixed_height_still.url);
      	moveGif = response.data[i].images.fixed_height.url;
      	stillGif = response.data[i].images.fixed_height_still.url;
      	rating = "Rating = " + response.data[i].rating;
      	heroGif.attr("data-still", stillGif)
      	heroGif.attr("data-move", moveGif)
      	heroGif.attr("data-type", "still")
      	if(rating === "r") {
      		return false
      	}
      	$("#hero-gifs").append(newDiv);
      	p.html(rating);
      	newDiv.append(heroGif);
      	newDiv.append(p);

      	

      }
     
 });

}
// Searchs for gifs using user input 

function searchHero() {
	$("#hero-gifs").empty();
	var hero = $(this).data("name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&rating=pg-13&api_key=dc6zaTOxFJmzC";
	
	$.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      for(var i = 0; i < 24; i++) {
      	var newDiv = $("<div>")
      	var heroGif = $("<img>");
      	var p = $("<p>");
      	heroGif.addClass("heroPic");
      	heroGif.attr("src", response.data[i].images.fixed_height_still.url);
      	moveGif = response.data[i].images.fixed_height.url;
      	stillGif = response.data[i].images.fixed_height_still.url;
      	rating = "Rating = " + response.data[i].rating;
      	heroGif.attr("data-still", stillGif)
      	heroGif.attr("data-move", moveGif)
      	heroGif.attr("data-type", "still")
      	
      	$("#hero-gifs").append(newDiv);
      	p.html(rating);
      	newDiv.append(heroGif);
      	newDiv.append(p);

      	

      }
     
 });

}

// Moves and returns gifs to a still state

function moveHero () {
		console.log("working")
		moveGif = $(this).data("move");
		
		

		stillGif= $(this).data("still");
	    gifState = $(this).data("type");
	    console.log(gifState);
	if (gifState === "still") {

		$(this).attr("src", moveGif);
		$(this).data("type", "animate");

	}
	else if (gifState === "animate") {
		$(this).attr("src", stillGif);
		$(this).data("type", "still");
	}


};
});

