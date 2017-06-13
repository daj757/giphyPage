$(document).ready(function(){

// List of heros in generated buttons 

var heroArray = ["Spider Man", "Batman", "Wonder Woman", "The Hulk", "Green Lantern", "Superman", " Hawk Girl", "Wolverine", "Magneto"]

// Generates buttons of heros

function heroButtons() {
	$("#hero-buttons").empty();

	for( var i = 0; i < heroArray.length; i++) {
		var s = $("<button>");
			s.addClass("heros");
			s.attr("data-name", heroArray[i]);
			s.text(heroArray[i]);
			$("#hero-buttons").append(s);

	}
}
$(document).on("click", "#add-hero", addHero)

// Adds the hero inputed by user into new button

function addHero() {
	var hero = $("#hero-input").val().trim();
	event.preventDefault();
	heroArray.push(hero);
	heroButtons();
	console.log(hero);
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=dc6zaTOxFJmzC";
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
      var herospot = $("#hero-gifs");
      herospot.append(response.data.images);
      console.log(response.data);
    });

}
 



});