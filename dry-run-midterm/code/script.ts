type Book = {
  name: string;
  year: number;
  type: string;
};
type Author = {
  id: number;
  name: string;
  birth_date: string;
  death_date?: string;
  nationality: string;
  bibliography: Book[];
};

const data: Author[] = [];
const showAuthors = (authors: Author[]) => {
  const table = document.getElementById("author-table");
  let tbdy = table.querySelector("tbody");

  if (!tbdy) {
    tbdy = document.createElement("tbody");
    table.appendChild(tbdy);
  } else {
    while (tbdy.firstChild) {
      tbdy.removeChild(tbdy.firstChild);
    }
  }
  for (const author of authors) {
    tbdy.appendChild(showAuthor(author));
  }
};

const showAuthor = (author: Author) => {
  const tr = document.createElement("tr");
  tr.appendChild(createAuthorCell(author.id.toString()));
  tr.appendChild(createAuthorCell(author.name));
  tr.appendChild(createAuthorCell(getBirthdate(author.birth_date)));

  const aliveCell = document.createElement("td");
  const isAlive = isAuthorAlive(author);
  aliveCell.innerHTML = isAlive
    ? "<i class='fa-regular fa-circle-check text-success'></i>"
    : "<i class='fa-regular fa-circle-xmark text-danger'></i>";

  tr.appendChild(aliveCell);
  tr.appendChild(createAuthorCell(getAge(author).toString()));
  tr.appendChild(createAuthorCell(author.nationality));
  tr.appendChild(createAuthorCell(author.bibliography.length.toString()));
  tr.appendChild(createAuthorCell("----");
  return tr;
};
const createAuthorCell = (data: string) => {
  const td = document.createElement("td");
  td.textContent = data;
  return td;
};
const getBirthdate = (birthDateString: string) => {
  const birthDate = new Date(birthDateString);
  console.log(birthDate);
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const result = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  console.log(result);
  return result;
};
const getAge = (author: Author) => {
  const endDate = author.death_date ? new Date(author.death_date) : new Date();
  const birthDate = new Date(author.birth_date);
  var age = endDate.getFullYear() - birthDate.getFullYear();
  var m = endDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && endDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
const isAuthorAlive = (author: Author) => {
  return author.death_date === undefined;
};
const getAuthors = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/dry-run-mid-term-2024/data/authors.json"
  );
  const data = await response.json();
  return data;
};

const sortById = () => sortByField("id");
const sortByName = () => sortByField("name");
const sortByBirthdate = () => sortByField("birth_date");
const sortByAge = () => sortByField("age");
const sortByAlive = () => sortByField("alive");
const sortByNationality = () => sortByField("nationality");
const sortByBibliography = () => sortByField("bibliography");

let currentSort = { field: "id", direction: true };

const sortByField = (
  field: keyof Author | "alive" | "age" | "bibliography"
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

  data.sort((first: Author, second: Author) => {
    let firstValue: any;
    let secondValue: any;

    if (field === "alive") {
      firstValue = isAuthorAlive(first) ? 1 : 0;
      secondValue = isAuthorAlive(second) ? 1 : 0;
    } else if (field === "age") {
      firstValue = getAge(first);
      secondValue = getAge(second);
    } else if (field === "bibliography") {
      firstValue = first.bibliography.length;
      secondValue = second.bibliography.length;
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

  showAuthors(data);
};

const extractNationalities = (authors: Author[]) => {
    const allNationalities = authors.map(author => author.nationality);
    const unique = allNationalities.filter((value, index, self) => self.indexOf(value) === index)
    return unique;
}

const displayNationalities = (nationalities: string[]) => {
    const select = document.getElementById("nationality-search")! as HTMLSelectElement;
    select.innerHTML = "";
    const none = document.createElement("option");
    none.text = "--- Select ---";
    none.value = "";
    select.appendChild(none);
    for (const nationality of nationalities) {
        const option = document.createElement("option");
        option.text = nationality;
        option.value = nationality;
        select.appendChild(option);
    }
}
const searchAuthors = () => {
    const nameSearch = document.getElementById("name-search")! as HTMLInputElement;
    const nameValue = nameSearch.value.toLowerCase();

    const natSearch = document.getElementById("nationality-search")! as HTMLSelectElement;
    const natValue = natSearch.value;
    const aliveCheckbox = document.getElementById("alive-search")! as HTMLInputElement;
    const showAlive = aliveCheckbox.checked;

    const filteredAuthors = data
        .filter(author => author.name.toLowerCase().includes(nameValue))
        .filter(author => {
            if (natValue === "") {
                return true; 
            }
            return (natValue === author.nationality);
        }) .filter(author => {
            return showAlive ? isAuthorAlive(author) : true; 
        });


    showAuthors(filteredAuthors);
}

document.addEventListener("DOMContentLoaded", async () => {
  const loadData = await getAuthors();
  data.push(...loadData);
  showAuthors(data);

  const nationalities = extractNationalities(data);
  displayNationalities(nationalities);

  const idSort = document.getElementById("sort-id")!;
  idSort.style.cursor = "pointer";
  idSort?.addEventListener("click", sortById);

  const nameSort = document.getElementById("sort-name")!;
  nameSort.style.cursor = "pointer";
  nameSort?.addEventListener("click", sortByName);

  const birthDateSort = document.getElementById("sort-birth_date")!;
  birthDateSort.style.cursor = "pointer";
  birthDateSort?.addEventListener("click", sortByBirthdate);

  const ageSort = document.getElementById("sort-age")!;
  ageSort.style.cursor = "pointer";
  ageSort?.addEventListener("click", sortByAge);

  const nationalitySort = document.getElementById("sort-nationality")!;
  nationalitySort.style.cursor = "pointer";
  nationalitySort?.addEventListener("click", sortByNationality);

  const bibliographySort = document.getElementById("sort-bibliography")!;
  bibliographySort.style.cursor = "pointer";
  bibliographySort?.addEventListener("click", sortByBibliography);

  const aliveSort = document.getElementById("sort-alive")!;
  aliveSort.style.cursor = "pointer";
  aliveSort?.addEventListener("click", sortByAlive);

  const searchButton = document.getElementById("search-authors");
  searchButton?.addEventListener("click", searchAuthors);


});
