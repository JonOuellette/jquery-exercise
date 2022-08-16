let movieList = [];

$(function(){
    $("#new-movie-form").on("submit", function(e){
        e.preventDefault();
        let title = $("#title").val();
        let rating = $("#rating").val();

        let movieDatabase = {title, rating, currentID};
        const HTMLtoAppend = createMovieDBHTML(movieDatabase)
        
        currentID++;
        movieList.push(movieDatabase);

        $("#movie-table-body").append(HTMLtoAppend);
        $("new-movie-form").trigger("reset");
    });

    $("tbody").on("click", ".btn.btn-danger", function(e){
        let removeAt = movieList.findIndex(movie => movie.currentID === +$(e.target).data("deleteID"))

        movieList.splice(removeAt, 1)
        $(e.target)
        .closest("tr")
        .remove();
    });

    $(".fas").on("click", function(e){
        let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
        let keyToSortBy = $(evt.target).attr("id");
        let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

        $('#movie-table-body').empty();

        for(let movies of sortedMovies) {
            const HTMLtoAppend = createMovieDBHTML(movie);
            $("movie-table-body").append(HTMLtoAppend);
        }
        $(e.target).toggleClass("fa-sort-down");
        $(e.target).toggleClass("fa-sort-up");
    });

});

function sortBy(array, keyToSortBy, direction){
    return array.sort(function(a,b){
        if (keyToSortBy === "rating"){
            a[keyToSortBy] = +a[keyToSortBy];
            b[keyToSortBy] = +b[keyToSortBy];
        }
        if (a[keyToSortBy] > b[keyToSortBy]){
            return direction === "up" ? 1: -1;
        }
        else if (b[keyToSortBy] > a[keyToSortBy]) {
            return direction === "up" ? -1 : 1;
          }
          return 0;
    });
}

function createMovieDBHTML(data) {
    return `
      <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td>
          <button class="btn btn-danger" data-delete-id=${data.currentId}>
            Delete
          </button>
        </td>
      <tr>
    `;
  }