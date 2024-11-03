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
var showAuthors = function (authors) {
    var table = document.getElementById("author-table");
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
    for (var _i = 0, authors_1 = authors; _i < authors_1.length; _i++) {
        var author = authors_1[_i];
        tbdy.appendChild(showAuthor(author));
    }
};
var showAuthor = function (author) {
    var tr = document.createElement("tr");
    tr.appendChild(createAuthorCell(author.id.toString()));
    tr.appendChild(createAuthorCell(author.name));
    tr.appendChild(createAuthorCell(getBirthdate(author.birth_date)));
    var aliveCell = document.createElement("td");
    var isAlive = isAuthorAlive(author);
    aliveCell.innerHTML = isAlive
        ? "<i class='fa-regular fa-circle-check text-success'></i>"
        : "<i class='fa-regular fa-circle-xmark text-danger'></i>";
    tr.appendChild(aliveCell);
    tr.appendChild(createAuthorCell(getAge(author).toString()));
    tr.appendChild(createAuthorCell(author.nationality));
    tr.appendChild(createAuthorCell(author.bibliography.length.toString()));
    tr.appendChild(createAuthorCell("----"));
    return tr;
};
var createAuthorCell = function (data) {
    var td = document.createElement("td");
    td.textContent = data;
    return td;
};
var getBirthdate = function (birthDateString) {
    var birthDate = new Date(birthDateString);
    console.log(birthDate);
    var year = birthDate.getFullYear();
    var month = birthDate.getMonth() + 1;
    var day = birthDate.getDate();
    var result = "".concat(year, "-").concat(month.toString().padStart(2, "0"), "-").concat(day
        .toString()
        .padStart(2, "0"));
    console.log(result);
    return result;
};
var getAge = function (author) {
    var endDate = author.death_date ? new Date(author.death_date) : new Date();
    var birthDate = new Date(author.birth_date);
    var age = endDate.getFullYear() - birthDate.getFullYear();
    var m = endDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && endDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
var isAuthorAlive = function (author) {
    return author.death_date === undefined;
};
var getAuthors = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/dry-run-mid-term-2024/data/authors.json")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
var sortById = function () { return sortByField("id"); };
var sortByName = function () { return sortByField("name"); };
var sortByBirthdate = function () { return sortByField("birth_date"); };
var sortByAge = function () { return sortByField("age"); };
var sortByAlive = function () { return sortByField("alive"); };
var sortByNationality = function () { return sortByField("nationality"); };
var sortByBibliography = function () { return sortByField("bibliography"); };
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
        if (field === "alive") {
            firstValue = isAuthorAlive(first) ? 1 : 0;
            secondValue = isAuthorAlive(second) ? 1 : 0;
        }
        else if (field === "age") {
            firstValue = getAge(first);
            secondValue = getAge(second);
        }
        else if (field === "bibliography") {
            firstValue = first.bibliography.length;
            secondValue = second.bibliography.length;
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
    showAuthors(data);
};
var extractNationalities = function (authors) {
    var allNationalities = authors.map(function (author) { return author.nationality; });
    var unique = allNationalities.filter(function (value, index, self) { return self.indexOf(value) === index; });
    return unique;
};
var displayNationalities = function (nationalities) {
    var select = document.getElementById("nationality-search");
    select.innerHTML = "";
    var none = document.createElement("option");
    none.text = "--- Select ---";
    none.value = "";
    select.appendChild(none);
    for (var _i = 0, nationalities_1 = nationalities; _i < nationalities_1.length; _i++) {
        var nationality = nationalities_1[_i];
        var option = document.createElement("option");
        option.text = nationality;
        option.value = nationality;
        select.appendChild(option);
    }
};
var searchAuthors = function () {
    var nameSearch = document.getElementById("name-search");
    var nameValue = nameSearch.value.toLowerCase();
    var natSearch = document.getElementById("nationality-search");
    var natValue = natSearch.value;
    var aliveCheckbox = document.getElementById("alive-search");
    var showAlive = aliveCheckbox.checked;
    var filteredAuthors = data
        .filter(function (author) { return author.name.toLowerCase().includes(nameValue); })
        .filter(function (author) {
        if (natValue === "") {
            return true;
        }
        return (natValue === author.nationality);
    }).filter(function (author) {
        return showAlive ? isAuthorAlive(author) : true;
    });
    showAuthors(filteredAuthors);
};
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    var loadData, nationalities, idSort, nameSort, birthDateSort, ageSort, nationalitySort, bibliographySort, aliveSort, searchButton;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAuthors()];
            case 1:
                loadData = _a.sent();
                data.push.apply(data, loadData);
                showAuthors(data);
                nationalities = extractNationalities(data);
                displayNationalities(nationalities);
                idSort = document.getElementById("sort-id");
                idSort.style.cursor = "pointer";
                idSort === null || idSort === void 0 ? void 0 : idSort.addEventListener("click", sortById);
                nameSort = document.getElementById("sort-name");
                nameSort.style.cursor = "pointer";
                nameSort === null || nameSort === void 0 ? void 0 : nameSort.addEventListener("click", sortByName);
                birthDateSort = document.getElementById("sort-birth_date");
                birthDateSort.style.cursor = "pointer";
                birthDateSort === null || birthDateSort === void 0 ? void 0 : birthDateSort.addEventListener("click", sortByBirthdate);
                ageSort = document.getElementById("sort-age");
                ageSort.style.cursor = "pointer";
                ageSort === null || ageSort === void 0 ? void 0 : ageSort.addEventListener("click", sortByAge);
                nationalitySort = document.getElementById("sort-nationality");
                nationalitySort.style.cursor = "pointer";
                nationalitySort === null || nationalitySort === void 0 ? void 0 : nationalitySort.addEventListener("click", sortByNationality);
                bibliographySort = document.getElementById("sort-bibliography");
                bibliographySort.style.cursor = "pointer";
                bibliographySort === null || bibliographySort === void 0 ? void 0 : bibliographySort.addEventListener("click", sortByBibliography);
                aliveSort = document.getElementById("sort-alive");
                aliveSort.style.cursor = "pointer";
                aliveSort === null || aliveSort === void 0 ? void 0 : aliveSort.addEventListener("click", sortByAlive);
                searchButton = document.getElementById("search-authors");
                searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", searchAuthors);
                return [2 /*return*/];
        }
    });
}); });
