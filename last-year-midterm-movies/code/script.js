var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
var data = [];
var showMovies = function (movies) {
    var table = document.getElementById("movie-table");
    var tbdy = table.querySelector("tbody");
    if (!tbdy) {
        tbdy = document.createElement("tbody");
        table.appendChild(tbdy);
    }
    else {
        while (tbdy.firstChild) {
            tbdy.removeChild(tbdy.firstChild);
        }
    }
    for (var _i = 0, movies_1 = movies; _i < movies_1.length; _i++) {
        var movie = movies_1[_i];
        tbdy.appendChild(showMovie(movie));
    }
};
var showMovie = function (movie) {
    var tr = document.createElement("tr");
    tr.appendChild(createMovieCell(movie.id.toString()));
    tr.appendChild(createMovieCell(movie.title));
    tr.appendChild(createMovieCell(movie.director));
    tr.appendChild(createMovieCell(movie.year.toString()));
    tr.appendChild(createMovieCell(getGenres(movie)));
    tr.appendChild(createMovieCell(movie.plot));
    var castCell = document.createElement("td");
    castCell.appendChild(displayCastMembers(movie));
    tr.appendChild(castCell);
    var oscarsCell = document.createElement("td");
    oscarsCell.appendChild(displayOscars(movie));
    tr.appendChild(oscarsCell);
    return tr;
};
var createMovieCell = function (data) {
    var td = document.createElement("td");
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
var getGenres = function (movie) {
    var genres = movie.genre;
    return genres.join("/");
};
var displayCastMembers = function (movie) {
    var cast = movie.cast;
    cast.sort(function (a, b) { return a.actor.localeCompare(b.actor); });
    var list = document.createElement("ul");
    for (var _i = 0, cast_1 = cast; _i < cast_1.length; _i++) {
        var member = cast_1[_i];
        var li = document.createElement("li");
        li.innerHTML = "<strong>".concat(member.actor, "</strong> as ").concat(member.character);
        list.appendChild(li);
    }
    return list;
};
var displayOscars = function (movie) {
    var oscars = movie.oscars;
    var oscarsEntries = Object.entries(oscars);
    oscarsEntries.sort(function (a, b) { return a[0].localeCompare(b[0]); });
    var list = document.createElement("ul");
    for (var _i = 0, oscarsEntries_1 = oscarsEntries; _i < oscarsEntries_1.length; _i++) {
        var _a = oscarsEntries_1[_i], key = _a[0], value = _a[1];
        var fixedKey = key.replace(/([a-z](?=[A-Z]))/g, "$1 ");
        var result = fixedKey.charAt(0).toUpperCase() + fixedKey.slice(1);
        var li = document.createElement("li");
        li.innerHTML = "<strong>".concat(result, ": </strong> ").concat(value);
        list.appendChild(li);
    }
    return list;
};
var getMovies = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                console.log(data);
                return [2 /*return*/, data];
        }
    });
}); };
var sortById = function () { return sortByField("id"); };
var sortBytitle = function () { return sortByField("title"); };
var sortByDirector = function () { return sortByField("director"); };
var sortByYear = function () { return sortByField("year"); };
var sortByPlot = function () { return sortByField("plot"); };
var sortByGenre = function () { return sortByField("genre"); };
var sortByCast = function () { return sortByField("cast"); };
var sortByOscars = function () { return sortByField("oscars"); };
var currentSort = { field: "id", direction: true };
var sortByField = function (field) {
    if (currentSort.field === field) {
        currentSort.direction = !currentSort.direction;
    }
    else {
        currentSort.field = field;
        currentSort.direction = true;
    }
    var allSorters = document.getElementsByClassName("sorter");
    for (var index = 0; index < allSorters.length; index++) {
        var sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
        sorter.innerHTML = '<i class="fa fa-sort"></i>';
    }
    var currentSorter = document.getElementById("sort-".concat(currentSort.field));
    currentSorter.classList.toggle("sorted", currentSort.direction);
    currentSorter.classList.toggle("unsorted", !currentSort.direction);
    currentSorter.innerHTML = currentSort.direction
        ? '<i class="fa fa-sort-up"></i>'
        : '<i class="fa fa-sort-down"></i>';
    var sortDirection = currentSort.direction ? 1 : -1;
    data.sort(function (first, second) {
        var sortDirection = currentSort.direction ? 1 : -1;
        if (field === "genre") {
            var genreCountComparison = first.genre.length - second.genre.length;
            if (genreCountComparison !== 0) {
                return genreCountComparison * sortDirection;
            }
            var sortedFirstGenres = __spreadArray([], first.genre, true).sort();
            var sortedSecondGenres = __spreadArray([], second.genre, true).sort();
            for (var i = 0; i < Math.min(sortedFirstGenres.length, sortedSecondGenres.length); i++) {
                var comparison = sortedFirstGenres[i].localeCompare(sortedSecondGenres[i]);
                if (comparison !== 0) {
                    return comparison * sortDirection;
                }
            }
            return ((sortedFirstGenres.length - sortedSecondGenres.length) * sortDirection);
        }
        else if (field === "oscars") {
            var firstOscarCount = Object.keys(first.oscars).length;
            var secondOscarCount = Object.keys(second.oscars).length;
            return (firstOscarCount - secondOscarCount) * sortDirection;
        }
        else if (field === "cast") {
            var castCountComparison = first.cast.length - second.cast.length;
            if (castCountComparison !== 0) {
                return castCountComparison * sortDirection;
            }
            var firstSortedCast = first.cast.map(function (member) { return member.actor; }).sort();
            var secondSortedCast = second.cast.map(function (member) { return member.actor; }).sort();
            for (var i = 0; i < Math.min(firstSortedCast.length, secondSortedCast.length); i++) {
                var comparison = firstSortedCast[i].localeCompare(secondSortedCast[i]);
                if (comparison !== 0) {
                    return comparison * sortDirection;
                }
            }
            return (firstSortedCast.length - secondSortedCast.length) * sortDirection;
        }
        else {
            if (typeof first[field] === "string" &&
                typeof second[field] === "string") {
                return first[field].localeCompare(second[field]) * sortDirection;
            }
            return (first[field] - second[field]) * sortDirection;
        }
    });
    showMovies(data);
};
var extractGenres = function (movies) {
    var allGenres = movies.flatMap(function (movie) { return movie.genre; });
    console.log(allGenres);
    var uniqueGenres = allGenres.filter(function (value, index, self) { return self.indexOf(value) === index; });
    return uniqueGenres;
};
var displayGenres = function (genres) {
    var select = document.getElementById("genre-search");
    select.innerHTML = "";
    var none = document.createElement("option");
    none.text = "--- Select ---";
    none.value = "";
    select.appendChild(none);
    for (var _i = 0, genres_1 = genres; _i < genres_1.length; _i++) {
        var genre = genres_1[_i];
        var option = document.createElement("option");
        option.text = genre;
        option.value = genre;
        select.appendChild(option);
    }
};
var searchMovies = function () {
    var titleSearch = document.getElementById("title-search");
    var titleValue = titleSearch.value.toLowerCase();
    var yearSearch = document.getElementById("year-search");
    var yearValue = yearSearch.value;
    var genreSearch = document.getElementById("genre-search");
    var genreValue = genreSearch.value;
    var filteredMovies = data
        .filter(function (movie) { return movie.title.toLowerCase().includes(titleValue); })
        .filter(function (movie) {
        if (yearValue === "") {
            return true;
        }
        return movie.year.toString() === yearValue;
    })
        .filter(function (movie) {
        if (genreValue === "") {
            return true;
        }
        return movie.genre.includes(genreValue);
    });
    showMovies(filteredMovies);
};
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    var loadData, genres, idSort, titleSort, directorSort, yearSort, plotSort, genreSort, castSort, oscarsSort, searchButton;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getMovies()];
            case 1:
                loadData = _a.sent();
                data.push.apply(data, loadData);
                showMovies(data);
                genres = extractGenres(data);
                displayGenres(genres);
                idSort = document.getElementById("sort-id");
                idSort.style.cursor = "pointer";
                idSort === null || idSort === void 0 ? void 0 : idSort.addEventListener("click", sortById);
                titleSort = document.getElementById("sort-title");
                titleSort.style.cursor = "pointer";
                titleSort === null || titleSort === void 0 ? void 0 : titleSort.addEventListener("click", sortBytitle);
                directorSort = document.getElementById("sort-director");
                directorSort.style.cursor = "pointer";
                directorSort === null || directorSort === void 0 ? void 0 : directorSort.addEventListener("click", sortByDirector);
                yearSort = document.getElementById("sort-year");
                yearSort.style.cursor = "pointer";
                yearSort === null || yearSort === void 0 ? void 0 : yearSort.addEventListener("click", sortByYear);
                plotSort = document.getElementById("sort-plot");
                plotSort.style.cursor = "pointer";
                plotSort === null || plotSort === void 0 ? void 0 : plotSort.addEventListener("click", sortByPlot);
                genreSort = document.getElementById("sort-genre");
                genreSort.style.cursor = "pointer";
                genreSort === null || genreSort === void 0 ? void 0 : genreSort.addEventListener("click", sortByGenre);
                castSort = document.getElementById("sort-cast");
                castSort.style.cursor = "pointer";
                castSort === null || castSort === void 0 ? void 0 : castSort.addEventListener("click", sortByCast);
                oscarsSort = document.getElementById("sort-oscars");
                oscarsSort.style.cursor = "pointer";
                oscarsSort === null || oscarsSort === void 0 ? void 0 : oscarsSort.addEventListener("click", sortByOscars);
                searchButton = document.getElementById("search-movies");
                searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", searchMovies);
                return [2 /*return*/];
        }
    });
}); });
