$(document).ready(function(){ 
    var item, title, author, publisher, bookLink, bookImg; 
    var outputList = document.getElementById("list-output"); 
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q="; 
    var placeHolder = ""; 
    var searchData; 

    //listener for search button 
    $("#search").click(function(){ 
        outputList.innerHTML = ""; //empty html output 
        document.body.style.backgroundImage = "url('')"; 
        searchData = $("#search-box").val(); 
        //handle empty search input 
        if(searchData === "" || searchData === null){ 
            displayError(); 
        }
        else { 
            $.ajax({
                url: bookUrl + searchData + ":keyes&key=AIzaSyBj-dqCtsoFlU2zw9ASRlCfFjGClHOxT5I", 
                dataType: "json", 
                success: function(response){ 
                    console.log(response)
                    if(response.totalItems === 0){ 
                        alert("No result.. please try again"); 
                    }
                    else { //search box animation 
                        $("#title").animate('margin-top: 5px', 1000); 
                        $(".book-list").css("visibility", "visible"); 
                        displayResults(response); 
                    }
                },
                error: function(){ 
                    alert("Something went wrong... <br>" + "Try again"); 
                }
            }); 
        }
        $("#search-box").val(""); //clear search box 
    }); 

    /*Function to display results fetched from API*/
    function displayResults(res){ 
        for(var i = 0; i <res.items.length; i++){ 
            item = res.items[i]; 
            title1 = item.volumeInfo.title; 
            author1 = item.volumeInfo.authors; 
            publisher1 = item.volumeInfo.publisher; 
            bookLink1 = item.volumeInfo.previewLink; 
            bookIsbn1 = item.volumeInfo.industryIdentifiers[1].identifier; 
            bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHolder; 

            outputList.innerHTML += '<div class = "row-mt-4>' + 
                                     formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn1) + 
                                    '</div>'
        }
    }

    /*template for bootstrap cards*/
    function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn){ 
        var viewUrl = 'book.html?isbn='+bookIsbn; 

        var htmlCard = 
        `<div class="row">
            <div class="col-md-4">
              <img src = "${bookImg}" class = "card-img" alt = "..." class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Author:</strong> ${author}</li>
                <li class="list-group-item"><strong>Publisher:</strong> ${publisher}</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <hr>
              <a target = "_blank" href = "${viewUrl}" class = "btn btn-secondary">Read the book</a>
              <a href="index.html" class="btn btn-default">Go Back To Search</a>
            </div>
          </div>`
    
        return htmlCard; 
    }

})
