//STEP 1<-------------------------- FETCH MOVIE DATA ---------------------------->
fetch("https://ghibliapi.herokuapp.com/films")
  .then((res) => {
    //parse the JSON data that comes back from our API call
    return res.json();
  })
  .then((movies) => {
    console.log("movies", movies);
    //STEP 2<-------------------------- POPULATE DROPDOWN WITH MOVIE TITLES FROM API DATA ---------------------------->

    const dropdown = document.querySelector("#dropdown select");

    for (let movie of movies) {
      const option = document.createElement("option");
      option.textContent = movie.title;
      option.setAttribute("value", movie.title);
      dropdown.append(option);
    }
    //STEP 3<-------------------------- DISPLAY SELECTED MOVIE'S DATA ---------------------------->
    const section = document.querySelector("#display-info");
    const year = document.createElement("p");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    section.append(title, year, description);

    let selectedMovie;

    dropdown.addEventListener("change", (e) => {
      for (let movie of movies) {
        if (e.target.value === movie.title) {
          selectedMovie = movie;
          year.textContent = movie.release_date;
          title.textContent = movie.title;
          description.textContent = movie.description;
        }
      }
    });

    //STEP 4<-------------------------- ADD FUNCTIONALITY TO FORM TO LEAVE MOVIE REVIEW ---------------------------->

    const form = document.querySelector("form");
    const ul = document.querySelector("ul");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let liReview = document.createElement("li");
      let reviewContent = document.querySelector("#review_input");
      liReview.innerHTML = `<b>${selectedMovie.title}:</b> ${reviewContent.value}`;
      ul.append(liReview);
      reviewContent.value = "";
    });
  });
