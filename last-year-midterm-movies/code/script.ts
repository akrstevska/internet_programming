type CastMember = {
  actor: string;
  character: number;
};
type Oscars = {
  [oscarType: string]: string;
};
type Movie = {
  id: number;
  title: string;
  year: number;
  director: string;
  genre: string[];
  plot: string;
  cast: CastMember[];
  oscars: Oscars;
  rating: number;
};

const data: Movie[] = [];
const showMovies = (movies: Movie[]) => {
  const table = document.getElementById("movie-table");
  let tbdy = table.querySelector("tbody");

  if (!tbdy) {
    tbdy = document.createElement("tbody");
    table.appendChild(tbdy);
  } else {
    while (tbdy.firstChild) {
      tbdy.removeChild(tbdy.firstChild);
    }
  }
  for (const movie of movies) {
    tbdy.appendChild(showMovie(movie));
  }
};

const showMovie = (movie: Movie) => {
  const tr = document.createElement("tr");
  tr.appendChild(createMovieCell(movie.id.toString()));
  tr.appendChild(createMovieCell(movie.title));
  tr.appendChild(createMovieCell(movie.director));
  tr.appendChild(createMovieCell(movie.year.toString()));
  tr.appendChild(createMovieCell(getGenres(movie)));
  tr.appendChild(createMovieCell(movie.plot));

  const castCell = document.createElement("td");
  castCell.appendChild(displayCastMembers(movie));
  tr.appendChild(castCell);

  const oscarsCell = document.createElement("td");
  oscarsCell.appendChild(displayOscars(movie));
  tr.appendChild(oscarsCell);

  return tr;
};

const createMovieCell = (data: string) => {
  const td = document.createElement("td");
  td.textContent = data;
  return td;
};
//variant 1 for cast members
// const getMembers = (members: string[]) => {
//   members.sort();
//   if (members.length > 5) return members.slice(0, 5).join(", ") + "...";

//   if (members.length >= 2)
//     return (
//       members.slice(0, -1).join(", ") + " & " + members[members.length - 1]
//     );

//   return members.join(", ");
// };
const getGenres = (movie: Movie) => {
  const genres = movie.genre;
  return genres.join("/");
};

const displayCastMembers = (movie: Movie) => {
  const cast = movie.cast;
  cast.sort((a, b) => a.actor.localeCompare(b.actor));

  const list = document.createElement("ul");
  for (const member of cast) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${member.actor}</strong> as ${member.character}`;
    list.appendChild(li);
  }
  return list;
};
const displayOscars = (movie: Movie) => {
  const oscars = movie.oscars;
  const oscarsEntries = Object.entries(oscars);

  oscarsEntries.sort((a, b) => a[0].localeCompare(b[0]));
  const list = document.createElement("ul");

  for (const [key, value] of oscarsEntries) {
    const fixedKey = key.replace(/([a-z](?=[A-Z]))/g, "$1 ");
    const result = fixedKey.charAt(0).toUpperCase() + fixedKey.slice(1);
    const li = document.createElement("li");
    li.innerHTML = `<strong>${result}: </strong> ${value}`;
    list.appendChild(li);
  }

  return list;
};

const getMovies = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json"
  );
  const data = await response.json();
  console.log(data);
  return data;
};

const sortById = () => sortByField("id");
const sortBytitle = () => sortByField("title");
const sortByDirector = () => sortByField("director");
const sortByYear = () => sortByField("year");
const sortByPlot = () => sortByField("plot");
const sortByGenre = () => sortByField("genre");
const sortByCast = () => sortByField("cast");
const sortByOscars = () => sortByField("oscars");

let currentSort = { field: "id", direction: true };

const sortByField = (field: keyof Movie) => {
  if (currentSort.field === field) {
    currentSort.direction = !currentSort.direction;
  } else {
    currentSort.field = field;
    currentSort.direction = true;
  }

  const allSorters = document.getElementsByClassName("sorter");
  for (let index = 0; index < allSorters.length; index++) {
    const sorter = allSorters[index];
    sorter.classList.remove("sorted");
    sorter.classList.add("unsorted");
    sorter.innerHTML = '<i class="fa fa-sort"></i>';
  }

  const currentSorter = document.getElementById(`sort-${currentSort.field}`)!;
  currentSorter.classList.toggle("sorted", currentSort.direction);
  currentSorter.classList.toggle("unsorted", !currentSort.direction);

  currentSorter.innerHTML = currentSort.direction
    ? '<i class="fa fa-sort-up"></i>'
    : '<i class="fa fa-sort-down"></i>';

  const sortDirection = currentSort.direction ? 1 : -1;

  data.sort((first: Movie, second: Movie) => {
    const sortDirection = currentSort.direction ? 1 : -1;

    if (field === "genre") {
      const genreCountComparison = first.genre.length - second.genre.length;
      if (genreCountComparison !== 0) {
        return genreCountComparison * sortDirection;
      }

      const sortedFirstGenres = [...first.genre].sort();
      const sortedSecondGenres = [...second.genre].sort();

      for (
        let i = 0;
        i < Math.min(sortedFirstGenres.length, sortedSecondGenres.length);
        i++
      ) {
        const comparison = sortedFirstGenres[i].localeCompare(
          sortedSecondGenres[i]
        );
        if (comparison !== 0) {
          return comparison * sortDirection;
        }
      }

      return (
        (sortedFirstGenres.length - sortedSecondGenres.length) * sortDirection
      );
    } else if (field === "oscars") {
      const firstOscarCount = Object.keys(first.oscars).length;
      const secondOscarCount = Object.keys(second.oscars).length;

      return (firstOscarCount - secondOscarCount) * sortDirection;
    } else if (field === "cast") {
      const castCountComparison = first.cast.length - second.cast.length;
      if (castCountComparison !== 0) {
        return castCountComparison * sortDirection;
      }

      const firstSortedCast = first.cast.map((member) => member.actor).sort();
      const secondSortedCast = second.cast.map((member) => member.actor).sort();

      for (
        let i = 0;
        i < Math.min(firstSortedCast.length, secondSortedCast.length);
        i++
      ) {
        const comparison = firstSortedCast[i].localeCompare(
          secondSortedCast[i]
        );
        if (comparison !== 0) {
          return comparison * sortDirection;
        }
      }

      return (firstSortedCast.length - secondSortedCast.length) * sortDirection;
    } else {
      if (
        typeof first[field] === "string" &&
        typeof second[field] === "string"
      ) {
        return first[field].localeCompare(second[field]) * sortDirection;
      }
      return (first[field] - second[field]) * sortDirection;
    }
  });

  showMovies(data);
};

const extractGenres = (movies: Movie[]) => {
  const allGenres = movies.flatMap((movie) => movie.genre);
  console.log(allGenres);
  const uniqueGenres = allGenres.filter(
    (value, index, self) => self.indexOf(value) === index
  );
  return uniqueGenres;
};

const displayGenres = (genres: string[]) => {
  const select = document.getElementById("genre-search")! as HTMLSelectElement;
  select.innerHTML = "";
  const none = document.createElement("option");
  none.text = "--- Select ---";
  none.value = "";
  select.appendChild(none);
  for (const genre of genres) {
    const option = document.createElement("option");
    option.text = genre;
    option.value = genre;
    select.appendChild(option);
  }
};
const searchMovies = () => {
  const titleSearch = document.getElementById(
    "title-search"
  )! as HTMLInputElement;
  const titleValue = titleSearch.value.toLowerCase();

  const yearSearch = document.getElementById(
    "year-search"
  )! as HTMLInputElement;
  const yearValue = yearSearch.value;

  const genreSearch = document.getElementById(
    "genre-search"
  )! as HTMLSelectElement;
  const genreValue = genreSearch.value;

  const filteredMovies = data
    .filter((movie) => movie.title.toLowerCase().includes(titleValue))
    .filter((movie) => {
      if (yearValue === "") {
        return true;
      }
      return movie.year.toString() === yearValue;
    })

    .filter((movie) => {
      if (genreValue === "") {
        return true;
      }
      return movie.genre.includes(genreValue);
    });

  showMovies(filteredMovies);
};

document.addEventListener("DOMContentLoaded", async () => {
  const loadData = await getMovies();
  data.push(...loadData);
  showMovies(data);

  const genres = extractGenres(data);
  displayGenres(genres);

  const idSort = document.getElementById("sort-id")!;
  idSort.style.cursor = "pointer";
  idSort?.addEventListener("click", sortById);

  const titleSort = document.getElementById("sort-title")!;
  titleSort.style.cursor = "pointer";
  titleSort?.addEventListener("click", sortBytitle);

  const directorSort = document.getElementById("sort-director")!;
  directorSort.style.cursor = "pointer";
  directorSort?.addEventListener("click", sortByDirector);

  const yearSort = document.getElementById("sort-year")!;
  yearSort.style.cursor = "pointer";
  yearSort?.addEventListener("click", sortByYear);

  const plotSort = document.getElementById("sort-plot")!;
  plotSort.style.cursor = "pointer";
  plotSort?.addEventListener("click", sortByPlot);

  const genreSort = document.getElementById("sort-genre")!;
  genreSort.style.cursor = "pointer";
  genreSort?.addEventListener("click", sortByGenre);

  const castSort = document.getElementById("sort-cast")!;
  castSort.style.cursor = "pointer";
  castSort?.addEventListener("click", sortByCast);

  const oscarsSort = document.getElementById("sort-oscars")!;
  oscarsSort.style.cursor = "pointer";
  oscarsSort?.addEventListener("click", sortByOscars);

  const searchButton = document.getElementById("search-movies");
  searchButton?.addEventListener("click", searchMovies);
});
