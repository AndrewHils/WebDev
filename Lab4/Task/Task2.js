// Імпортуємо створений масив з першого завдання
import checkedUsers from './Task1.js';

//?????
const countryCodes = {
    'USA': '1',
    'UK': '44',
    'Australia': '61',
    'Canada': '1',
    'France': '33',
    'Germany': '49',
    'India': '91',
    'Italy': '39',
    'Japan': '81',
    'Mexico': '52',
    'Netherlands': '31',
    'New Zealand': '64',
    'Spain': '34',
    'Switzerland': '41',
    'Turkey': '90',
    // Інші країни...
};

function getCountryCode(country) {
    return countryCodes[country] || '';
}

function extractCountryCode(phone) {
    let prefix = '';
    for (let i = 0; i < phone.length; i++) {
        if (!isNaN(phone[i])) {
            // Якщо символ - цифра, то додаємо її до префіксу
            prefix += phone[i];
        } else {
            break;
        }
    }
    return prefix;
}
//?????

// Функція валідування
function validateObjects(users) {
    const validUsers = [];

    users.forEach(user => {
        // Перевірка на збіжність форматів
        const isValidFullName = user.full_name && typeof user.full_name === 'string' && user.full_name.charAt(0) === user.full_name.charAt(0).toUpperCase();
        const isValidGender = user.gender && typeof user.gender === 'string';
        const isValidNote = user.note === null || user.note === undefined || (typeof user.note === 'string' && user.note.charAt(0) === user.note.charAt(0).toUpperCase());
        const isValidState = user.state && typeof user.state === 'string' && user.state.charAt(0) === user.state.charAt(0).toUpperCase();
        const isValidCity = user.city && typeof user.city === 'string' && user.city.charAt(0) === user.city.charAt(0).toUpperCase();
        const isValidCountry = user.country && typeof user.country === 'string' && user.country.charAt(0) === user.country.charAt(0).toUpperCase();
        const isValidAge = user.age !== null && user.age !== undefined && typeof user.age === 'number' && !isNaN(user.age);
        const isValidEmail = user.email && typeof user.email === 'string' && user.email.includes('@');

        // const countryCode = getCountryCode(user.country);
        // const phoneCountryCode = extractCountryCode(user.phone);
        // const isValidPhone = user.phone && typeof user.phone === 'string' && isValidCountry && phoneCountryCode === countryCode;
        const isValidPhone = user.phone && typeof user.phone === 'string';

        // Відправляємо в log які користувачі не пройшли валідацію
        if (!isValidFullName) {
            console.log(`ID пользователя ${user.id}: Неправильный формат имени: ${user.full_name}`);
        }
        if (!isValidGender) {
            console.log(`ID пользователя ${user.id}: Неправильный формат пола: ${user.gender}`);
        }
        if (!isValidNote) {
            console.log(`ID пользователя ${user.id}: Неправильный формат заметки: ${user.note}`);
        }
        if (!isValidState) {
            console.log(`ID пользователя ${user.id}: Неправильный формат штата: ${user.state}`);
        }
        if (!isValidCity) {
            console.log(`ID пользователя ${user.id}: Неправильный формат города: ${user.city}`);
        }
        if (!isValidCountry) {
            console.log(`ID пользователя ${user.id}: Неправильный формат страны: ${user.country}`);
        }
        if (!isValidAge) {
            console.log(`ID пользователя ${user.id}: Неправильный формат возраста: ${user.age}`);
        }
        if (!isValidEmail) {
            console.log(`ID пользователя ${user.id}: Неправильный формат email: ${user.email}`);
        }

        // Якщо обєкт пройшов - додаємо його в масив
        if (isValidFullName && isValidGender && isValidNote && isValidState && isValidCity && isValidCountry && isValidAge && isValidEmail && isValidPhone) {
            validUsers.push(user);
        }
    });
    return validUsers;
}

// Створення таблиці
function createValidTable(validUsers) {
    const table = document.createElement('table');

    if (validUsers.length > 0) {
        const headers = Object.keys(validUsers[0]);

        const headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });
        table.appendChild(headerRow);

        validUsers.forEach(obj => {
            const row = document.createElement('tr');
            headers.forEach(header => {
                const cell = document.createElement('td');
                cell.textContent = obj[header];
                row.appendChild(cell);
            });
            table.appendChild(row);
        });
    }

    return table;
}
document.body.innerHTML = '';
// Отримаємо провалідовані обєкти
const validUsers = validateObjects(checkedUsers);

document.body.appendChild(createValidTable(validUsers));

localStorage.setItem('validUsers', JSON.stringify(validUsers));