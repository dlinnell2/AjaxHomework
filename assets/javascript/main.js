$(document).ready(function () {


    var topics = ['the office', 'archer', 'community', 'rick and morty', 'south park', 'supernatural', 'scrubs', 'batman the animated series', 'greys anatomy', 'black mirror', 'always sunny in philidelphia', 'good place'];

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
            class: 'btn btn-success shows',
        })
        $('#header').append(newButton);
    };

    function randomIndex(x){
        return Math.floor((Math.random() * x));
    };

    function getGif() {

        $('#gifs').empty();

        var name = $(this).text();
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + name + '&api_key=GMZR7cz1zr9lSowtZf1BSY3w78yDcm5f&limit=50';

        $.ajax({
            url: queryURL,
            method: 'Get'


        }).then(function(res){

            var allGifsArray = [];
            
            for (var i=0; i < res.data.length; i++){
                allGifsArray.push(res.data[i]);
            }

            var selectedGifsArray = [];

            for (var i=0; i<10; i++) {
                var index = randomIndex(allGifsArray.length);
                selectedGifsArray.push(allGifsArray[index]);
                allGifsArray.splice(index, 1);
            }


            for (var i = 0; i < selectedGifsArray.length; i++){
                var newDiv = $('<div>');
                var image = $('<img>');
                var text = $('<p>');

                var activeImageSrc = selectedGifsArray[i].images.fixed_height.url;
                var stillImageSrc = selectedGifsArray[i].images.fixed_height_still.url;
                var rating = selectedGifsArray[i].rating;

                image.attr({
                    src: stillImageSrc,
                    class: 'gifs',
                }).data({
                    still: stillImageSrc,
                    active: activeImageSrc,
                });

                text.text(rating);

                newDiv.append(text, image);
                newDiv.attr('class', 'd-inline-block');
                $('#gifs').append(newDiv);
            };

        });
    };

    function startStop(){
        if ($(this).data('still') === $(this).attr('src')){
            var newSrc = $(this).data('active');
            $(this).attr('src', newSrc);
        } else {
            var newSrc = $(this).data('still');
            $(this).attr('src', newSrc);
        }
    };

    function addShow(){

        event.preventDefault();
        var newShow = $('#addShowForm').val().trim();
        createButton(newShow);
        $('form')[0].reset();
    }

    $(document).on('click', '.shows', getGif);

    $(document).on('click', '.gifs', startStop);

    $('.addShowButton').on('click', addShow);

    pageSet();







});