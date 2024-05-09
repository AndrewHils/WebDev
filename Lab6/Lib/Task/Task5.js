const validUsersString = localStorage.getItem('validUsers');
const validUsers = JSON.parse(validUsersString);

export function findObjectsByParam(users, param, value) {
    // Перетворюємо значення параметра в нижній регістр, щоб зробити пошук регістронезалежним
    const searchValue = typeof value === 'string' ? value.toLowerCase() : value;
    // Шукаємо всі об'єкти в масиві, які відповідають заданому параметру і значенню
    return users.filter(user => {
        // Перевіряємо, чи існує поле param у поточного користувача
        if (param in user) {
            // Якщо значення параметра - рядок, перевіряємо, чи містить значення поля параметра шукане значення
            if (typeof user[param] === 'string') {
                const fieldValue = user[param].toLowerCase();
                return fieldValue.includes(searchValue);
            } else if (typeof user[param] === 'number') { // Додаємо перевірку числових значень
                // Перетворюємо числові значення в рядки для правильного порівняння
                const fieldValue = user[param].toString().toLowerCase();
                return fieldValue === searchValue;
            }
        }
        return false; // Повертаємо false, якщо поле param не існує або не є рядком чи числом
    });
}

// Функція для обробки натискання кнопки пошуку
function searchUsers() {
    const searchParam = document.getElementById('searchParam').value;
    const searchValue = document.getElementById('searchValue').value.trim();

    // Викликаємо функцію пошуку і отримуємо знайдені об'єкти
    const searchResults = findObjectsByParam(validUsers, searchParam, searchValue);

    //Task #6
    // Вираховуємо відсоток від загальної кількості об'єктів в масиві, які відповідають пошуку
    const percentage = (searchResults.length / validUsers.length) * 100;

    // Записуємо в лог відсоток результатів пошуку
    console.log(`Percentage of results: ${percentage}%`);

    // Відображаємо результат пошуку на сторінці
    displaySearchResults(searchResults);
}

// Функція для відображення результатів пошуку
function displaySearchResults(results) {
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';

    if (results.length === 0) {
        searchResultsDiv.textContent = 'No users found.';
        return;
    }

    const table = document.createElement('table');
    const headers = ['id', 'gender', 'full_name', 'city', 'state', 'country', 'postcode', 'email', 'age', 'phone', 'course'];
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    results.forEach(user => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const cell = document.createElement('td');
            cell.textContent = user[header];
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    searchResultsDiv.appendChild(table);
}

// document.getElementById('searchButton').addEventListener('click', searchUsers);