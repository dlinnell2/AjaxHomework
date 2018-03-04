$(document).ready(function () {


    var topics = ['the office', 'archer', 'community', 'rick and morty', 'south park', 'supernatural', 'episodes', 'batman the animated series', 'the mist', 'black mirror', 'always sunny in philidelphia', 'good place'];

    function pageSet() {
        for (var i = 0; i < topics.length; i++) {
            createButton(topics[i]);
        };
    };

    function createButton(buttonName) {
        var newButton = $('<button>');
        newButton.text(buttonName);
        newButton.attr({
            type: 'button',
            class: 'btn btn-success movies',
        })
        $('#header').append(newButton);
    }

    function getGif() {
        var name = $(this).text();
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + name + '&api_key=GMZR7cz1zr9lSowtZf1BSY3w78yDcm5f&limit=10';

        $.ajax({
            url: queryURL,
            method: 'Get'

            
        }).then(function(res){

            console.log(res);

            for (var i = 0; i < res.data.length; i++){
                var newDiv = $('<div>');
                var image = $('<img>');

                var activeImageSrc = res.data[i].images.fixed_height.url;
                var stillImageSrc = res.data[i].images.fixed_height_still.url

                image.attr({
                    src: stillImageSrc,
                    class: 'gifs',
                    'data-still': stillImageSrc,
                    'data-active': activeImageSrc,
                });

                newDiv.append(image);
                newDiv.attr('class', 'd-inline');
                $('#gifs').append(newDiv);
            }

        });
    }

    $(document).on('click', '.movies', getGif)

    pageSet()







});