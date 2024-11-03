type Album = {
  name: string;
  year: number;
};
type Band = {
  id: number;
  name: string;
  genre: string;
  formed: number;
  location: string;
  members: string[];
  albums: Album[];
};

const data: Band[] = [];
const showBands = (bands: Band[]) => {
  const table = document.getElementById("band-table");
  let tbdy = table.querySelector("tbody");

  if (!tbdy) {
    tbdy = document.createElement("tbody");
    table.appendChild(tbdy);
  } else {
    while (tbdy.firstChild) {
      tbdy.removeChild(tbdy.firstChild);
    }
  }
  for (const band of bands) {
    tbdy.appendChild(showBand(band));
  }
};

const showBand = (band: Band) => {
  const tr = document.createElement("tr");
  tr.appendChild(createBandCell(band.id.toString()));
  tr.appendChild(createBandCell(band.name));
  tr.appendChild(createBandCell(band.formed.toString()));
  tr.appendChild(createBandCell(band.location));
  tr.appendChild(createBandCell(band.genre));
  tr.appendChild(createBandCell(getCountry(band.location)));
  tr.appendChild(createBandCell(getMembers(band.members)));
  tr.appendChild(createBandCell(band.albums.length.toString()));
  tr.appendChild(createBandCell(getFirstAlbum(band.albums)));
  return tr;
};

const createBandCell = (data: string) => {
  const td = document.createElement("td");
  td.textContent = data;
  return td;
};

const getFirstAlbum = (albums: Album[]) => {
  const firstAlbum = albums[0];
  return firstAlbum.name !==undefined && firstAlbum.year? `${firstAlbum.name} ${firstAlbum.year}`: "/";
};

const getMembers = (members: string[]) => {
  members.sort();
  if (members.length > 5) return members.slice(0, 5).join(", ") + "...";

  if (members.length >= 2)
    return (
      members.slice(0, -1).join(", ") + " & " + members[members.length - 1]
    );

  return members.join(", ");
};
const getCountry = (location: string) => {
  const parts = location.split(", ");
  return parts[parts.length - 1];
};

const getBands = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json"
  );
  const data = await response.json();
  console.log(data);
  return data.metalBands;
};

const sortById = () => sortByField("id");
const sortByName = () => sortByField("name");
const sortByFormed = () => sortByField("formed");
const sortByGenre = () => sortByField("genre");
const sortByLocation = () => sortByField("location");
const sortByCountry = () => sortByField("country");
const sortByAlbums = () => sortByField("albums");
const sortByMembers = () => sortByField("members");
const sortByFirstAlbum = () => sortByField("first_album");

let currentSort = { field: "id", direction: true };

const sortByField = (
  field: keyof Band | "country" | "albums" | "members" | "first_album"
) => {
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

  data.sort((first: Band, second: Band) => {
    let firstValue: any;
    let secondValue: any;

    if (field === "country") {
      firstValue = getCountry(first.location);
      secondValue = getCountry(second.location);
      return firstValue.localeCompare(secondValue) * sortDirection;
    } else if (field === "albums") {
      firstValue = first.albums.length;
      secondValue = second.albums.length;
    } else if (field === "members") {
      const memberCountComparison =
        first.members.length - second.members.length;
      if (memberCountComparison !== 0) {
        return memberCountComparison * sortDirection;
      }
      for (
        let i = 0;
        i < Math.min(first.members.length, second.members.length);
        i++
      ) {
        const comparison = first.members[i].localeCompare(second.members[i]);
        if (comparison !== 0) {
          return comparison * sortDirection;
        }
      }
      return (first.members.length - second.members.length) * sortDirection;
    } else if (field === "first_album") {
      const firstAlbumFirst = first.albums[0];
      const secondAlbumFirst = second.albums[0];

      if (firstAlbumFirst && secondAlbumFirst) {
        if (firstAlbumFirst.year !== secondAlbumFirst.year) {
          return (firstAlbumFirst.year - secondAlbumFirst.year) * sortDirection;
        }
        return (
          firstAlbumFirst.name.localeCompare(secondAlbumFirst.name) *
          sortDirection
        );
      }
    } else {
      if (
        typeof first[field] === "string" &&
        typeof second[field] === "string"
      ) {
        return first[field].localeCompare(second[field]) * sortDirection;
      }
      return (first[field] - second[field]) * sortDirection;
    }

    return (firstValue - secondValue) * sortDirection;
  });

  showBands(data);
};

const extractCountries = (bands: Band[]) => {
  const allCountries = bands.map((band) => {
    return getCountry(band.location);
  });

  const uniqueCountries = allCountries.filter(
    (value, index, self) => self.indexOf(value) === index
  );
  return uniqueCountries;
};

const extractGenres = (bands: Band[]) => {
  const allGenres = bands.map((band) => {
    return band.genre;
  });

  const uniqueGenres = allGenres.filter(
    (value, index, self) => self.indexOf(value) === index
  );
  return uniqueGenres;
};

const displayCountries = (countries: string[]) => {
  const select = document.getElementById(
    "country-search"
  )! as HTMLSelectElement;
  select.innerHTML = "";
  const none = document.createElement("option");
  none.text = "--- Select ---";
  none.value = "";
  select.appendChild(none);
  for (const country of countries) {
    const option = document.createElement("option");
    option.text = country;
    option.value = country;
    select.appendChild(option);
  }
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
const searchBands = () => {
  const nameSearch = document.getElementById(
    "name-search"
  )! as HTMLInputElement;
  const nameValue = nameSearch.value.toLowerCase();

  const countrySearch = document.getElementById(
    "country-search"
  )! as HTMLSelectElement;
  const countryValue = countrySearch.value;

  const genreSearch = document.getElementById(
    "genre-search"
  )! as HTMLSelectElement;
  const genreValue = genreSearch.value;

  const filteredBands = data
    .filter((band) => band.name.toLowerCase().includes(nameValue))
    .filter((band) => {
      if (countryValue === "") {
        return true;
      }
      return countryValue === getCountry(band.location);
    })
    .filter((band) => {
      if (genreValue === "") {
        return true;
      }
      return genreValue === band.genre;
    });

  showBands(filteredBands);
};

document.addEventListener("DOMContentLoaded", async () => {
  const loadData = await getBands();
  data.push(...loadData);
  showBands(data);

  const countries = extractCountries(data);
  displayCountries(countries);

  const genres = extractGenres(data);
  displayGenres(genres);

  const idSort = document.getElementById("sort-id")!;
  idSort.style.cursor = "pointer";
  idSort?.addEventListener("click", sortById);

  const nameSort = document.getElementById("sort-name")!;
  nameSort.style.cursor = "pointer";
  nameSort?.addEventListener("click", sortByName);

  const formedSort = document.getElementById("sort-formed")!;
  formedSort.style.cursor = "pointer";
  formedSort?.addEventListener("click", sortByFormed);

  const genreSort = document.getElementById("sort-genre")!;
  genreSort.style.cursor = "pointer";
  genreSort?.addEventListener("click", sortByGenre);

  const locationSort = document.getElementById("sort-location")!;
  locationSort.style.cursor = "pointer";
  locationSort?.addEventListener("click", sortByLocation);

  const countrySort = document.getElementById("sort-country")!;
  countrySort.style.cursor = "pointer";
  countrySort?.addEventListener("click", sortByCountry);

  const albumsSort = document.getElementById("sort-albums")!;
  albumsSort.style.cursor = "pointer";
  albumsSort?.addEventListener("click", sortByAlbums);

  const membersSort = document.getElementById("sort-members")!;
  membersSort.style.cursor = "pointer";
  membersSort?.addEventListener("click", sortByMembers);

  const firstAlbumSort = document.getElementById("sort-first_album")!;
  firstAlbumSort.style.cursor = "pointer";
  firstAlbumSort?.addEventListener("click", sortByFirstAlbum);

  const searchButton = document.getElementById("search-bands");
  searchButton?.addEventListener("click", searchBands);
});
