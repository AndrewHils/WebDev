// import {additionalUsers, randomUserMock} from './FE4U-Lab3-mock.js';

export async function fetchUsers() {
    const response = await fetch('https://randomuser.me/api/?results=50');
    const {results} = await response.json(); // Витягуємо масив з користувачами

    const courses = [
        "Mathematics", "Physics", "English", "Computer Science", "Dancing",
        "Chess", "Biology", "Chemistry", "Law", "Art", "Medicine", "Statistics"
    ];

    // Перетворюємо кожен об'єкт, додаючи необхідні поля та рандомно вибираючи курс
    const formattedRandomUsers = results.map((user, index) => {
        const courseIndex = Math.floor(Math.random() * courses.length);
        const course = courses[courseIndex];

        // Перевірка на існування властивостей
        const fullName = user.name ? `${user.name.title} ${user.name.first} ${user.name.last}` : '';

        const city = user.location ? user.location.city : '';
        const state = user.location ? user.location.state : '';
        const country = user.location ? user.location.country : '';

        const b_date = user.dob ? user.dob.date : '';

        const picture_large = user.picture ? user.picture.large : '';
        const picture_thumbnail = user.picture ? user.picture.thumbnail : '';

        // Отримання значень координат і часового поясу
        const coordinates = user.location ? `latitude: ${user.location.coordinates.latitude}, longitude: ${user.location.coordinates.longitude}` : '';
        const timezone = user.location ? `offset: ${user.location.timezone.offset}, description: ${user.location.timezone.description}` : '';

        const bg_color = user.bg_color !== undefined ? user.bg_color : '#1f75cb';

        const note = user.note !== undefined ? user.note : null;
        // Використовуємо створені змінні
        return {
            id: index + 1, // Унікальний ідентифікатор
            gender: user.gender,
            full_name: fullName,
            city: city,
            state: state,
            country: country,
            postcode: user.location ? user.location.postcode : '',
            coordinates: coordinates,
            timezone: timezone,
            email: user.email,
            b_date: b_date,
            age: user.dob ? user.dob.age : '',
            phone: user.phone,
            picture_large: picture_large,
            picture_thumbnail: picture_thumbnail,
            favorite: false,
            course: course, // Випадковий курс
            bg_color: bg_color,
            note: note
        };
    });

    return checkAllUsers([...formattedRandomUsers]);
}

function checkAllUsers(users) {
    const uniqueUsers = [];

    users.forEach(user => {
        // Перевірка на унікальність усіх користувачів
        const isDuplicate = uniqueUsers.some(uniqueUser => {
            return Object.keys(user).every(key => {
                return user[key] === uniqueUser[key];
            });
        });

        if (!isDuplicate) {
            uniqueUsers.push(user);
        }
    });

    return uniqueUsers;
}