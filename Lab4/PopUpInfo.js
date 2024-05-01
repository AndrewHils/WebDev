import {filterUsersByParams} from "./Task/Task3.js";
import {checkedUsers} from './Task/Task1.js';

function openInfo(teacher) {
    // Створюємо оверлей для попапа
    const overlay = document.createElement("div");
    overlay.classList.add("popup-overlay-info");

    document.body.insertBefore(overlay, document.body.firstChild);

    // Створюємо контент для попапа
    const popupContent = document.createElement("div");
    popupContent.classList.add("popup-content-info");

    // Блок для закриття
    const grayPlaceholder = document.createElement("div");
    grayPlaceholder.classList.add("gray-placeholder");

    const closeButton = document.createElement("span");
    closeButton.className = "close-in";
    closeButton.textContent = "×"; // Іконка закриття
    closeButton.onclick = closeInfo;

    grayPlaceholder.appendChild(closeButton);

    // Іконка для додавання в "Favorites"
    const favIcon = document.createElement("img");
    favIcon.className = "fav special-img";
    favIcon.src = teacher.favorite ? "images/star-fill.jpg" : "images/star.png";
    favIcon.onclick = () => addToFav(teacher.id);

    // Заголовок та зображення викладача
    const title = document.createElement("h2");
    title.textContent = "Teacher Info";

    const teacherImage = document.createElement("img");
    teacherImage.src = teacher.picture_large;
    teacherImage.alt = "Teacher Photo";

    // Дані викладача
    const fullName = document.createElement("div");
    fullName.className = "FullName-info";
    fullName.textContent = teacher.full_name;

    const containerInfo = document.createElement("div");
    containerInfo.className = "Container-info";

    const specialization = document.createElement("div");
    specialization.className = "Specialization-info";
    specialization.textContent = teacher.course;

    const secondaryInfo = document.createElement("div");
    secondaryInfo.className = "Secondary-info";

    const countryInfo = document.createElement("div");
    countryInfo.className = "Country-info";
    countryInfo.textContent = `${teacher.city}, ${teacher.country}`;

    const ageInfo = document.createElement("div");
    ageInfo.className = "Age-info";
    ageInfo.textContent = `${teacher.age}, ${teacher.gender}`;

    const emailInfo = document.createElement("div");
    emailInfo.className = "Email-info";
    emailInfo.innerHTML = `<a href="mailto:${teacher.email}">${teacher.email}</a>`;

    const phoneInfo = document.createElement("div");
    phoneInfo.className = "Phone-number-info";
    phoneInfo.textContent = teacher.phone;

    // Опис викладача
    const descriptInfo = document.createElement("div");
    descriptInfo.className = "Descript-info";
    descriptInfo.textContent = teacher.note || 'No additional information provided.';

    // Додаємо елементи до popupContent
    popupContent.appendChild(grayPlaceholder);
    popupContent.appendChild(favIcon);
    popupContent.appendChild(title);
    popupContent.appendChild(teacherImage);
    popupContent.appendChild(fullName);

    containerInfo.appendChild(specialization);
    containerInfo.appendChild(secondaryInfo);

    secondaryInfo.appendChild(countryInfo);
    secondaryInfo.appendChild(ageInfo);
    secondaryInfo.appendChild(emailInfo);
    secondaryInfo.appendChild(phoneInfo);

    popupContent.appendChild(containerInfo);
    popupContent.appendChild(descriptInfo);

    // Додаємо контент до оверлея
    overlay.appendChild(popupContent);
}


// Функція для створення картки викладача
function createTeacherCard(teacher) {
    const card = document.createElement('div');
    card.className = 'CardOfTheTeacher';
    card.onclick = () =>  openInfo(teacher); // Ваш клік-обробник

    const img = document.createElement('img');
    img.src = teacher.picture_large;
    img.alt = `Photo of ${teacher.full_name}`;

    const fullName = document.createElement('div');
    fullName.className = 'FullName';
    fullName.textContent = teacher.full_name;

    const specialization = document.createElement('div');
    specialization.className = 'Specialization';
    specialization.textContent = teacher.course;

    const country = document.createElement('div');
    country.className = 'Country';
    country.textContent = teacher.country;

    card.appendChild(img);
    card.appendChild(fullName);
    card.appendChild(specialization);
    card.appendChild(country);

    return card;
}

// Список всіх викладачів, який можна оновити
window.allTeachers  = checkedUsers;

// Список "Favorites", який буде оновлюватися
let favoriteTeachers = window.allTeachers.filter((t) => t.favorite);

let filteredTeachers = [];

// Функція для додавання/видалення з "Favorites"
function addToFav(teacherId) {
    const teacher = window.allTeachers.find((t) => t.id === teacherId);
    if (!teacher) return;
    // Зміна статусу "Favorites"
    teacher.favorite = !teacher.favorite;
    // Оновлення іконки в попапі, якщо він відкритий
    const popup = document.querySelector(".popup-overlay-info");
    if (popup) {
        const starIcon = popup.querySelector("img.fav.special-img");
        if (starIcon) {
            starIcon.src = teacher.favorite ? "images/star-fill.jpg" : "images/star.png";
        }
    }
    // Оновлення списку "Favorites"
    favoriteTeachers = window.allTeachers.filter((t) => t.favorite);

    // Оновлення відображення списку "Favorites"
    updateFavoriteList();
}

// Функція для оновлення списку "Favorites"
function updateFavoriteList() {
    const favoriteList = document.getElementById('favorites-list');

    favoriteList.innerHTML = '<div class="favorites-title">Favorites</div>'; // Очищення списку перед додаванням нових елементів

    favoriteTeachers.forEach((teacher) => {
        const card = createTeacherCard(teacher);
        favoriteList.appendChild(card); // Додати викладача до списку "Favorites"
    });
}
// Приклад функції для фільтрації викладачів
function displayFilterTeachers() {
    const ageRange = document.getElementById("age").value;
    const region = document.getElementById("region").value.toLowerCase();
    const gender = document.getElementById("sex").value.toLowerCase();
    const onlyWithPhoto = document.getElementById("only-with-photo").checked;
    const onlyFavorites = document.getElementById("only-favorites").checked;

    let minAge = '';
    let maxAge = '';

    if (ageRange) {
        const ageParts = ageRange.split("-");
        if (ageParts.length === 2) {
            minAge = parseInt(ageParts[0]);
            maxAge = parseInt(ageParts[1]);
        }
    }

    // Фільтруємо викладачів відповідно до вибраних критеріїв
    filteredTeachers = filterUsersByParams(allTeachers, region, minAge, maxAge, gender, onlyFavorites)

    // Оновлення списку викладачів на сторінці
    const teacherList = document.getElementById("teacher-list");
    teacherList.innerHTML = "";

    filteredTeachers.forEach((teacher) => {
        const card = createTeacherCard(teacher);
        teacherList.appendChild(card);
    });

    //filter statistic table
    fillStatisticsTable(filteredTeachers)
}
// Функція для заповнення статистичної таблиці
function fillStatisticsTable(teachers) {
    const statisticsTable = document.querySelector(".statistics-table");

    // Очищаємо таблицю перед заповненням
    statisticsTable.innerHTML = ""; // Це видалить всі поточні рядки

    // Заголовок таблиці
    const headerRow = document.createElement("div");
    headerRow.className = "statistics-row";

    const headers = [
        { text: "Name", sortKey: "name" },
        { text: "Specialty", sortKey: "specialty" },
        { text: "Age", sortKey: "age" },
        { text: "Gender", sortKey: "gender" },
        { text: "Nationality", sortKey: "country" }
    ];
    headers.forEach((header) => {
        const headerCell = document.createElement("div");
        headerCell.className = "statistics-header";
        headerCell.textContent = header.text;
        headerCell.setAttribute("data-sort", header.sortKey);
        headerCell.onclick = handleSortClick
        headerRow.appendChild(headerCell);
    });

    // Додаємо заголовки в таблицю
    statisticsTable.appendChild(headerRow);

    const table = document.createElement("div");
    table.className = "statistics-table2";

    statisticsTable.appendChild(table);

    // Створення рядків для кожного викладача
    teachers.forEach((teacher) => {
        const row = document.createElement("div");
        row.className = "statistics-row";

        const nameCell = document.createElement("div");
        nameCell.className = "statistics-item";
        nameCell.textContent = teacher.full_name;

        const specialtyCell = document.createElement("div");
        specialtyCell.className = "statistics-item";
        specialtyCell.textContent = teacher.course;

        const ageCell = document.createElement("div");
        ageCell.className = "statistics-item";
        ageCell.textContent = teacher.age;

        const genderCell = document.createElement("div");
        genderCell.className = "statistics-item";
        genderCell.textContent = teacher.gender;

        const nationalityCell = document.createElement("div");
        nationalityCell.className = "statistics-item";
        nationalityCell.textContent = teacher.country;

        row.appendChild(nameCell);
        row.appendChild(specialtyCell);
        row.appendChild(ageCell);
        row.appendChild(genderCell);
        row.appendChild(nationalityCell);

        table.appendChild(row);
    });
}
// Функція сортування викладачів
function sortTeachers(teachers, sortBy, ascending = true) {
    return teachers.sort((a, b) => {
        let valueA = a[sortBy];
        let valueB = b[sortBy];

        // Сортуємо за віком як за числом
        if (sortBy === 'age') {
            valueA = parseInt(valueA, 10);
            valueB = parseInt(valueB, 10);
        }

        if (ascending) {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });
}

// Поточний напрямок сортування для кожного стовпця
const sortDirections = {
    name: true,
    specialty: true,
    age: true,
    gender: true,
    country: true
};

// Функція для обробки кліку на заголовок таблиці
function handleSortClick(event) {
    const sortKey = event.target.dataset.sort;

    if (sortKey) {
        // Переключити напрямок сортування
        sortDirections[sortKey] = !sortDirections[sortKey];
        // Відсортувати викладачів
        filteredTeachers = sortTeachers(filteredTeachers, sortKey, sortDirections[sortKey]);

        // Заповнити таблицю відсортованими викладачами
        fillStatisticsTable(filteredTeachers);
    }
}
// Функція для фільтрації викладачів за текстом
function filterTeachersByInput(inputText) {
    const searchText = inputText.toLowerCase(); // Робимо текст малими літерами для порівняння

    return window.allTeachers.filter((teacher) => {
        const nameMatch = teacher.full_name.toLowerCase().includes(searchText);
        const noteMatch = teacher.note && teacher.note.toLowerCase().includes(searchText);
        const ageMatch = teacher.age.toString().includes(searchText); // Якщо хочемо порівнювати за віком

        console.log("nameMatch: " + nameMatch)
        console.log("noteMatch: " + noteMatch)
        console.log("ageMatch: " + ageMatch)

        return nameMatch || noteMatch || ageMatch; // Викладач повинен відповідати хоча б одному критерію
    });
}

// Слухач події для інпуту
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (event) => {
    const inputText = event.target.value; // Поточне значення інпуту
    filteredTeachers = filterTeachersByInput(inputText); // Фільтруємо викладачів

    // Оновлюємо відображення таблиці або списку викладачів
    fillStatisticsTable(filteredTeachers);
    const teacherList = document.getElementById("teacher-list");
    teacherList.innerHTML = "";

    filteredTeachers.forEach((teacher) => {
        const card = createTeacherCard(teacher);
        teacherList.appendChild(card);
    }); // Використовуємо вашу функцію заповнення таблиці
});

window.displayFilterTeachers = displayFilterTeachers;

// Додаємо слухачі подій для фільтрів
document.getElementById("age").addEventListener("change", displayFilterTeachers);
document.getElementById("region").addEventListener("change", displayFilterTeachers);
document.getElementById("sex").addEventListener("change", displayFilterTeachers);
document.getElementById("only-with-photo").addEventListener("change", displayFilterTeachers);
document.getElementById("only-favorites").addEventListener("change", displayFilterTeachers);

// Спочатку відображаємо всіх викладачів
document.addEventListener("DOMContentLoaded", displayFilterTeachers);

// Функція для відображення списку "Favorites" при завантаженні
document.addEventListener('DOMContentLoaded', updateFavoriteList);