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
var _this = this;
var data = [];
var showBands = function (bands) {
    var table = document.getElementById("band-table");
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
    for (var _i = 0, bands_1 = bands; _i < bands_1.length; _i++) {
        var band = bands_1[_i];
        tbdy.appendChild(showBand(band));
    }
};
var showBand = function (band) {
    var tr = document.createElement("tr");
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
var createBandCell = function (data) {
    var td = document.createElement("td");
    td.textContent = data;
    return td;
};
var getFirstAlbum = function (albums) {
    var firstAlbum = albums[0];
    return firstAlbum.name !== undefined && firstAlbum.year ? "".concat(firstAlbum.name, " ").concat(firstAlbum.year) : "/";
};
var getMembers = function (members) {
    members.sort();
    if (members.length > 5)
        return members.slice(0, 5).join(", ") + "...";
    if (members.length >= 2)
        return (members.slice(0, -1).join(", ") + " & " + members[members.length - 1]);
    return members.join(", ");
};
var getCountry = function (location) {
    var parts = location.split(", ");
    return parts[parts.length - 1];
};
var getBands = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                console.log(data);
                return [2 /*return*/, data.metalBands];
        }
    });
}); };
var sortById = function () { return sortByField("id"); };
var sortByName = function () { return sortByField("name"); };
var sortByFormed = function () { return sortByField("formed"); };
var sortByGenre = function () { return sortByField("genre"); };
var sortByLocation = function () { return sortByField("location"); };
var sortByCountry = function () { return sortByField("country"); };
var sortByAlbums = function () { return sortByField("albums"); };
var sortByMembers = function () { return sortByField("members"); };
var sortByFirstAlbum = function () { return sortByField("first_album"); };
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
        var firstValue;
        var secondValue;
        if (field === "country") {
            firstValue = getCountry(first.location);
            secondValue = getCountry(second.location);
            return firstValue.localeCompare(secondValue) * sortDirection;
        }
        else if (field === "albums") {
            firstValue = first.albums.length;
            secondValue = second.albums.length;
        }
        else if (field === "members") {
            var memberCountComparison = first.members.length - second.members.length;
            if (memberCountComparison !== 0) {
                return memberCountComparison * sortDirection;
            }
            for (var i = 0; i < Math.min(first.members.length, second.members.length); i++) {
                var comparison = first.members[i].localeCompare(second.members[i]);
                if (comparison !== 0) {
                    return comparison * sortDirection;
                }
            }
            return (first.members.length - second.members.length) * sortDirection;
        }
        else if (field === "first_album") {
            var firstAlbumFirst = first.albums[0];
            var secondAlbumFirst = second.albums[0];
            if (firstAlbumFirst && secondAlbumFirst) {
                if (firstAlbumFirst.year !== secondAlbumFirst.year) {
                    return (firstAlbumFirst.year - secondAlbumFirst.year) * sortDirection;
                }
                return (firstAlbumFirst.name.localeCompare(secondAlbumFirst.name) *
                    sortDirection);
            }
        }
        else {
            if (typeof first[field] === "string" &&
                typeof second[field] === "string") {
                return first[field].localeCompare(second[field]) * sortDirection;
            }
            return (first[field] - second[field]) * sortDirection;
        }
        return (firstValue - secondValue) * sortDirection;
    });
    showBands(data);
};
var extractCountries = function (bands) {
    var allCountries = bands.map(function (band) {
        return getCountry(band.location);
    });
    var uniqueCountries = allCountries.filter(function (value, index, self) { return self.indexOf(value) === index; });
    return uniqueCountries;
};
var extractGenres = function (bands) {
    var allGenres = bands.map(function (band) {
        return band.genre;
    });
    var uniqueGenres = allGenres.filter(function (value, index, self) { return self.indexOf(value) === index; });
    return uniqueGenres;
};
var displayCountries = function (countries) {
    var select = document.getElementById("country-search");
    select.innerHTML = "";
    var none = document.createElement("option");
    none.text = "--- Select ---";
    none.value = "";
    select.appendChild(none);
    for (var _i = 0, countries_1 = countries; _i < countries_1.length; _i++) {
        var country = countries_1[_i];
        var option = document.createElement("option");
        option.text = country;
        option.value = country;
        select.appendChild(option);
    }
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
var searchBands = function () {
    var nameSearch = document.getElementById("name-search");
    var nameValue = nameSearch.value.toLowerCase();
    var countrySearch = document.getElementById("country-search");
    var countryValue = countrySearch.value;
    var genreSearch = document.getElementById("genre-search");
    var genreValue = genreSearch.value;
    var filteredBands = data
        .filter(function (band) { return band.name.toLowerCase().includes(nameValue); })
        .filter(function (band) {
        if (countryValue === "") {
            return true;
        }
        return countryValue === getCountry(band.location);
    })
        .filter(function (band) {
        if (genreValue === "") {
            return true;
        }
        return genreValue === band.genre;
    });
    showBands(filteredBands);
};
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    var loadData, countries, genres, idSort, nameSort, formedSort, genreSort, locationSort, countrySort, albumsSort, membersSort, firstAlbumSort, searchButton;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getBands()];
            case 1:
                loadData = _a.sent();
                data.push.apply(data, loadData);
                showBands(data);
                countries = extractCountries(data);
                displayCountries(countries);
                genres = extractGenres(data);
                displayGenres(genres);
                idSort = document.getElementById("sort-id");
                idSort.style.cursor = "pointer";
                idSort === null || idSort === void 0 ? void 0 : idSort.addEventListener("click", sortById);
                nameSort = document.getElementById("sort-name");
                nameSort.style.cursor = "pointer";
                nameSort === null || nameSort === void 0 ? void 0 : nameSort.addEventListener("click", sortByName);
                formedSort = document.getElementById("sort-formed");
                formedSort.style.cursor = "pointer";
                formedSort === null || formedSort === void 0 ? void 0 : formedSort.addEventListener("click", sortByFormed);
                genreSort = document.getElementById("sort-genre");
                genreSort.style.cursor = "pointer";
                genreSort === null || genreSort === void 0 ? void 0 : genreSort.addEventListener("click", sortByGenre);
                locationSort = document.getElementById("sort-location");
                locationSort.style.cursor = "pointer";
                locationSort === null || locationSort === void 0 ? void 0 : locationSort.addEventListener("click", sortByLocation);
                countrySort = document.getElementById("sort-country");
                countrySort.style.cursor = "pointer";
                countrySort === null || countrySort === void 0 ? void 0 : countrySort.addEventListener("click", sortByCountry);
                albumsSort = document.getElementById("sort-albums");
                albumsSort.style.cursor = "pointer";
                albumsSort === null || albumsSort === void 0 ? void 0 : albumsSort.addEventListener("click", sortByAlbums);
                membersSort = document.getElementById("sort-members");
                membersSort.style.cursor = "pointer";
                membersSort === null || membersSort === void 0 ? void 0 : membersSort.addEventListener("click", sortByMembers);
                firstAlbumSort = document.getElementById("sort-first_album");
                firstAlbumSort.style.cursor = "pointer";
                firstAlbumSort === null || firstAlbumSort === void 0 ? void 0 : firstAlbumSort.addEventListener("click", sortByFirstAlbum);
                searchButton = document.getElementById("search-bands");
                searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", searchBands);
                return [2 /*return*/];
        }
    });
}); });
