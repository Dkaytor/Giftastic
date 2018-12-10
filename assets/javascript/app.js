//Setting up the jquery function 
$(document).ready(function () {

  // Setting up an array of 10 great vacation spots
  var topics = ["Rome", "Cancun", "London", "Miami", "Orlando", "Jamaica", "San Francisco", "Hawaii", "Paris","NYC"];

  // displayVacationSpot function re-renders the HTML to display the appropriate content
  function displayVacationSpot() {

    var topic = $(this).attr("spot-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LROvVF2eoeCLQzzJ7fxLdyblEINc4dSo&q="+ topic +"&limit=10&offset=0&rating=G&lang=en";
    
    $("#vacation-view").empty();
    // Creating an AJAX call for the specific vacation button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      for (var j = 0; j < 10; j++) {

      // Creating a div to hold the vacation spot
      var topicDiv = $("<div class='vacation'>");
        
      // Storing the rating data
      var ratingG = response.data[j].rating;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + ratingG);

      // Displaying the rating
      topicDiv.append(pOne);
          
      // Retrieving the URL for the image
      var imgURL = response.data[j].images.fixed_height_downsampled.url;
      
      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      topicDiv.append(image);

      // Putting the pictures above the previous pictures
      $("#vacation-view").prepend(topicDiv);
      }
    });

  }

  // Function for displaying vacation spot data
  function renderButtons() {

    // Deleting the vacation spots prior to adding new vacation spots
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of locations
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each vacation spot in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of vacation-btn to our button
      a.addClass("vacation-btn");
      // Adding a spot-attribute
      a.attr("spot-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where a location button is clicked
  $("#add-spot").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#vacation-input").val().trim();

    // Adding a location from the textbox to our array
    topics.push(topic);

    // Calling renderButtons which handles the processing of our topics array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "vacation-btn"
  $(document).on("click", ".vacation-btn", displayVacationSpot);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

})
