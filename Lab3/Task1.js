import { randomUserMock, additionalUsers } from './FE4U-Lab3-mock.js';

    function formatUsersData(randomUserMock, additionalUsers) {
        const courses = [
            "Mathematics", "Physics", "English", "Computer Science", "Dancing",
            "Chess", "Biology", "Chemistry", "Law", "Art", "Medicine", "Statistics"
        ];

        // Перетворюємо кожен об'єкт, додаючи необхідні поля та рандомно вибираючи курс
        const formattedRandomUsers = randomUserMock.map((user, index) => {
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

        // Перетворюємо дані для additionalUsers
        const formattedAdditionalUsers = additionalUsers.map((user, index) => {
            const fullName = user.full_name ? `${user.title} ${user.full_name}` : '';
            const city = user.city || '';
            const state = user.state || '';
            const country = user.country || '';
            const postcode = user.postcode || '';
            const coordinates = user.coordinates ? `latitude: ${user.coordinates.latitude}, longitude: ${user.coordinates.longitude}` : '';
            const timezone = user.timezone ? `offset: ${user.timezone.offset}, description: ${user.timezone.description}` : '';
            const b_date = user.b_day || '';
            const picture_large = user.picture_large || '';
            const picture_thumbnail = user.picture_thumbnail || '';
            const age = ''; // Вік для additionalUsers не зазначений у даних

            return {
                id: formattedRandomUsers.length + index + 1,
                gender: user.gender || '',
                full_name: fullName,
                city: city,
                state: state,
                country: country,
                postcode: postcode,
                coordinates: coordinates,
                timezone: timezone,
                email: user.email || '',
                b_date: b_date,
                age: age,
                phone: user.phone || '',
                picture_large: picture_large,
                picture_thumbnail: picture_thumbnail,
                favorite: user.favorite || false,
                course: user.course || null,
                bg_color: user.bg_color || '#1f75cb',
                note: user.note || null
            };
        });
        return [...formattedRandomUsers, ...formattedAdditionalUsers];
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

    // Викликаємо функцію та отримуємо відформатований масив об'єктів
    const formattedData = formatUsersData(randomUserMock, additionalUsers);
    const checkedUsers = checkAllUsers(formattedData);
    // Функція для створення результуючої таблиці
    function createTable(data) {
        const table = document.createElement('table');
        const headers = Object.keys(data[0]);

        // Создаем заголовки таблицы
        const headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });
        table.appendChild(headerRow);

        // Создаем строки с данными
        data.forEach(obj => {
            const row = document.createElement('tr');
            headers.forEach(header => {
                const cell = document.createElement('td');
                cell.textContent = obj[header];
                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        return table;
    }

    // Додаємо таблицю до body HTML документу
    document.body.appendChild(createTable(checkedUsers));

export default checkedUsers;
