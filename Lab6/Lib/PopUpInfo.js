// import {filterUsersByParams} from "./Task/Task3.js";
import {fetchUsers} from './Task/Task1.js';
dayjs.extend(dayjs_plugin_isLeapYear);
dayjs.extend(dayjs_plugin_advancedFormat);

function getDaysUntilNextBirthday(dob) {
    const today = dayjs(); // Current date
    const birthDate = dayjs(dob); // Convert the ISO 8601 string to a Day.js object

    // Get the date component to determine the next birthday
    const birthMonth = birthDate.month();
    const birthDay = birthDate.date();

    // Set the next birthday based on the current year
    let nextBirthday = dayjs().month(birthMonth).date(birthDay).year(today.year());

    // If the next birthday has passed this year, set it to next year
    if (nextBirthday.isBefore(today, 'day')) {
        nextBirthday = nextBirthday.add(1, 'year');
    }

    // Calculate the difference in days
    return nextBirthday.diff(today, 'day');
}

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

    const daysUntilBirthdayInfo = document.createElement("div");
    daysUntilBirthdayInfo.className = "Email-info";
    const daysUntilNextBirthday = getDaysUntilNextBirthday(teacher.b_date);
    daysUntilBirthdayInfo.textContent = `Days until next birthday: ${daysUntilNextBirthday}`;

    const mapTeacher = document.createElement("div");
    mapTeacher.id = "map";

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
    secondaryInfo.appendChild(daysUntilBirthdayInfo);

    popupContent.appendChild(containerInfo);
    popupContent.appendChild(descriptInfo);
    popupContent.appendChild(mapTeacher);

    // Додаємо контент до оверлея
    overlay.appendChild(popupContent);

    const map = L.map('map').setView([parseFloat(teacher.coordinates.latitude), parseFloat(teacher.coordinates.longitude)], 13);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([parseFloat(teacher.coordinates.latitude), parseFloat(teacher.coordinates.longitude)]).addTo(map);
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

// Список "Favorites", який буде оновлюватися
let favoriteTeachers = [];

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
            minAge = ageParts[0];
            maxAge = ageParts[1];
        }
    }

    // Фільтруємо викладачів відповідно до вибраних критеріїв
    filteredTeachers = filterUsersByParams(window.allTeachers, region, minAge, maxAge, gender, onlyFavorites)

    // Оновлення списку викладачів на сторінці
    const teacherList = document.getElementById("teacher-list");
    teacherList.innerHTML = "";

    filteredTeachers.forEach((teacher) => {
        const card = createTeacherCard(teacher);
        teacherList.appendChild(card);
    });

    // Додамо кнопку "Next"
    const loadMoreButton = document.getElementById("load-more-button");
    if (!loadMoreButton) {
        const button = document.createElement("button");
        button.id = "load-more-button";
        button.className = "next-teachers";
        button.textContent = "Next";
        button.onclick = () => loadMoreTeachers();
        teacherList.appendChild(button);
    } else {
        // Відображаємо кнопку, якщо є більше викладачів для завантаження
        loadMoreButton.style.display = filteredTeachers.length < 60 ? "block" : "none";
    }
    //filter statistic table
    // fillStatisticsTable(filteredTeachers)
    updatePieChart(filteredTeachers);
}
//OLD
// function loadMoreTeachers() {
//     fetchUsers().then((users) => {
//         const teacherList = document.getElementById("teacher-list");
//         const loadMoreButton = document.getElementById("load-more-button");
//
//         // Довантажуємо наступні 10 користувачів
//         const nextTeachers = users.slice(0, 10);
//
//         nextTeachers.forEach((teacher) => {
//             const card = createTeacherCard(teacher);
//             teacherList.appendChild(card);
//         });
//
//         // Сховати кнопку, якщо немає більше користувачів для завантаження
//         loadMoreButton.style.display = "none";
//     });
// }
//NEW Using Lodash
function loadMoreTeachers() {
    fetchUsers().then((users) => {
        const teacherList = document.getElementById("teacher-list");
        const loadMoreButton = document.getElementById("load-more-button");

        // Using Lodash to get the first 10 users
        const nextTeachers = _.slice(users, 0, 10);

        // Using Lodash's forEach to iterate over the teachers
        _.forEach(nextTeachers, (teacher) => {
            const card = createTeacherCard(teacher);
            teacherList.appendChild(card);
        });

        // Hide the button if there are no more users to load
        loadMoreButton.style.display = "none";
    });
}

function countTeachersBySpecialty(teachers) {
    const specialtyCounts = {};

    teachers.forEach((teacher) => {
        const specialty = teacher.course;
        if (specialtyCounts[specialty]) {
            specialtyCounts[specialty] += 1;
        } else {
            specialtyCounts[specialty] = 1;
        }
    });

    return specialtyCounts;
}
let myPieChart;
function createSpecialtyPieChart(teachers) {
    // Get the counts for each specialty
    const specialtyCounts = countTeachersBySpecialty(teachers);

    // Create the data for the chart
    const data = {
        labels: Object.keys(specialtyCounts), // Specialty names
        datasets: [{
            data: Object.values(specialtyCounts), // Counts for each specialty
            backgroundColor: [
                '#FF6384', // These colors are just examples
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#FF6384',
                '#36A2EB'
            ],
            hoverOffset: 4
        }]
    };

    // Get the context of the canvas where the chart will be drawn
    const ctx = document.getElementById('myPieChart').getContext('2d');

    // Create the pie chart
    myPieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
function updatePieChart(newData) {
    // Clear existing data
    const specialtyCounts = countTeachersBySpecialty(newData);
    myPieChart.data.labels = Object.keys(specialtyCounts);
    myPieChart.data.datasets[0].data = Object.values(specialtyCounts);

    // Update the chart
    myPieChart.update();
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
//OLD
// Функція сортування викладачів
// function sortTeachers(teachers, sortBy, ascending = true) {
//     return teachers.sort((a, b) => {
//         let valueA = a[sortBy];
//         let valueB = b[sortBy];
//
//         // Сортуємо за віком як за числом
//         if (sortBy === 'age') {
//             valueA = parseInt(valueA, 10);
//             valueB = parseInt(valueB, 10);
//         }
//
//         if (ascending) {
//             return valueA > valueB ? 1 : -1;
//         } else {
//             return valueA < valueB ? 1 : -1;
//         }
//     });
// }
//NEW Using Lodash
// Function to sort teachers with Lodash
function sortTeachers(teachers, sortBy, ascending = true) {
    // Use Lodash's `orderBy` to sort by a key and specify the order
    return _.orderBy(teachers, [sortBy], [ascending ? 'asc' : 'desc']);
}
//NEW Using Lodash
function filterUsersByParams(users, country, minAge, maxAge, gender, favorite) {
    return _.filter(users, user => {
        const meetsCountry = _.isEmpty(country) || _.toLower(user.country) === _.toLower(country);
        const meetsMinAge = _.isEmpty(minAge) || user.age >= parseInt(minAge, 10);
        const meetsMaxAge = _.isEmpty(maxAge) || user.age <= parseInt(maxAge, 10);
        const meetsGender = _.isEmpty(gender) || _.toLower(user.gender) === _.toLower(gender);
        const meetsFavorite = !favorite || user.favorite === favorite;

        return meetsCountry && meetsMinAge && meetsMaxAge && meetsGender && meetsFavorite;
    });
}
//OLD
// Функція для фільтрації викладачів за текстом
// function filterTeachersByInput(inputText) {
//     const searchText = inputText.toLowerCase(); // Робимо текст малими літерами для порівняння
//
//     return window.allTeachers.filter((teacher) => {
//         const nameMatch = teacher.full_name.toLowerCase().includes(searchText);
//         const noteMatch = teacher.note && teacher.note.toLowerCase().includes(searchText);
//         const ageMatch = teacher.age.toString().includes(searchText); // Якщо хочемо порівнювати за віком
//
//         console.log("nameMatch: " + nameMatch)
//         console.log("noteMatch: " + noteMatch)
//         console.log("ageMatch: " + ageMatch)
//
//         return nameMatch || noteMatch || ageMatch; // Викладач повинен відповідати хоча б одному критерію
//     });
// }
//NEW Using Lodash
function filterTeachersByInput(inputText) {
    const searchText = inputText.toLowerCase(); // Робимо текст малими літерами для порівняння

    return _.filter(window.allTeachers, (teacher) => {
        const lowerCaseName = teacher.full_name.toLowerCase();
        const lowerCaseNote = teacher.note ? teacher.note.toLowerCase() : '';
        const ageAsString = teacher.age.toString();

        return _.some([lowerCaseName, lowerCaseNote, ageAsString], (value) => {
            return _.includes(value, searchText); // Перевірка, чи входить текст в один з критеріїв
        });
    });
}

// Слухач події для інпуту
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (event) => {
    const inputText = event.target.value; // Поточне значення інпуту
    filteredTeachers = filterTeachersByInput(inputText); // Фільтруємо викладачів

    // Оновлюємо відображення таблиці або списку викладачів
    updatePieChart(filteredTeachers);
    const teacherList = document.getElementById("teacher-list");
    teacherList.innerHTML = "";

    filteredTeachers.forEach((teacher) => {
        const card = createTeacherCard(teacher);
        teacherList.appendChild(card);
    }); // Використовуємо вашу функцію заповнення таблиці
});

fetchUsers().then((users) => {
    console.log('Користувачі:', users);

    window.allTeachers = users;
    favoriteTeachers = window.allTeachers.filter((t) => t.favorite);
    filteredTeachers = [];
    createSpecialtyPieChart(users)
    displayFilterTeachers();
    updateFavoriteList();
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


