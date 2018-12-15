//Setting up the jquery function 
$(document).ready(function () {

  // Setting up an array of 10 great vacation spots
  var topics = ["Rome", "Cancun", "London", "Miami", "Orlando", "Jamaica", "San Francisco", "Hawaii", "Paris", "NYC"];

  // displayVacationSpot function re-renders the HTML to display the appropriate content
  function displayVacationSpot() {

      //Setting up global variable to take in spot name
    var topic = $(this).attr("spot-name");

    //Linking to Giphy with my API key and a variable for the topic, using parameters of 10 pictures and a rating of G
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LROvVF2eoeCLQzzJ7fxLdyblEINc4dSo&q=" + topic + "&limit=10&offset=0&rating=G&lang=en";

      //Empties any vacation spots that may be there
    $("#vacation-view").empty();

    // Creating an AJAX call for the specific vacation button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      //For loop to go through my 10 spots, linking a path to an image for them and setting up the button
      for (var j = 0; j < 10; j++) {

        // Creating a div to hold the vacation spot
        var topicDiv = $("<div class='vacation'>");
        topicDiv.attr("style", "display: inline-block");

        // Storing the rating data
        var ratingG = response.data[j].rating;

        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + ratingG);

        // Displaying the rating
        topicDiv.append(pOne);

        // Retrieving the URL for the images, a still one and an animated one
        var imgStill = response.data[j].images.fixed_height_still.url;
        var imgAnimate = response.data[j].images.fixed_height_downsampled.url;


        // Creating an element to hold the image and assigning attributes to it
        var image = $("<img>");
        image.attr("src", imgStill);
        image.attr("data-still", imgStill);
        image.attr("data-state", "still");
        image.attr( "data-animate", imgAnimate);
        image.addClass("gif");
        image.attr("style", "padding:10px");
        image.on("click", changeImage)

        // Appending the image
        topicDiv.append(image);


        // Putting the pictures above the previous pictures
        $("#vacation-view").prepend(topicDiv);
      }


    });

  }

  //Function to change picture between the still one and the animated one on a click of the picture
  function changeImage() {

    // Variable picks up the data-state attribute, still or animate
    var state = $(this).attr("data-state");

    //Checks what the data-state is and changes it to the opposite state
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
      
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }



  // Function for displaying vacation spot data
  function renderButtons() {

    // Deleting the vacation spots prior to adding new vacation spots
        $("#buttons-view").empty();

    // Looping through the array of locations
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each vacation spot in the array
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

  // Function to take input from the text box and create a new button with a new location
  $("#add-spot").on("click", function (event) {
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

