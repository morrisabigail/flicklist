

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "2de393df0ad479df19285e7b239a8879"
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			// TODO 2

  		response.results.forEach(function(movie) {
			model.browseItems.push(movie.title);
			});
			console.log(model.browseItems);
			// update the model, setting its .browseItems property equal to the movies we recieved in the response



			// invoke the callback function that was passed in.
			callback();
		}
	});

}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
  // clear everything from both lists
	$('#section-watchlist > ul').empty();
	$('section-browse >ul').empty();

  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
model.watchlistItems.forEach(function(movie){
	var li = $('<li />').text(movie);
	$('#section-watchlist > ul').append(li);
})
  // for each movie on the current browse list,
  model.browseItems.forEach(function(movie) {
		// TODO 3
		// insert a list item into the <ul> in the browse section
		var li = $('<li/>');
		li.text(movie);


		// TODO 4
		// the list item should include a button that says "Add to Watchlist"
		var button = $('<button />');
		button.text('Add to watchlist');
		li.append(button)

		$('#section-browse >ul').append(li);

		// TODO 5
		button.on('click',function(){
			model.watchlistItems.push(movie);
			render();
		})
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
  });

}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
