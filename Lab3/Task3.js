const validUsersString = localStorage.getItem('validUsers');
const validUsers = JSON.parse(validUsersString);

//Функція для фільтрації
async function filterUsersByParams(users, country, minAge, maxAge, gender, favorite) {
    const favoriteBoolean = document.getElementById('favorite').checked;
    return users.filter(user => {
        console.log('Filtering user:', user);
        const meetsCountry = country === '' || user.country === country;
        const meetsMinAge = isNaN(minAge) || user.age >= parseInt(minAge);
        const meetsMaxAge = isNaN(maxAge) || user.age <= parseInt(maxAge);
        const meetsGender = gender === '' || user.gender === gender;
        const meetsFavorite = favorite === '' || user.favorite === favoriteBoolean;

        console.log('Meets country:', meetsCountry);
        console.log('Meets min age:', meetsMinAge);
        console.log('Meets max age:', meetsMaxAge);
        console.log('Meets gender:', meetsGender);
        console.log('Meets favorite:', meetsFavorite);

        const meetsAllCriteria = meetsCountry && meetsMinAge && meetsMaxAge && meetsGender && meetsFavorite;

        console.log('Meets all criteria:', meetsAllCriteria);

        return meetsAllCriteria;
    });
}

async function displayFilteredUsers(users) {
    const filteredUsersContainer = document.getElementById('filteredUsers');
    filteredUsersContainer.innerHTML = '';

    if (users.length === 0) {
        filteredUsersContainer.textContent = 'No users found.';
        return;
    }

    const table = document.createElement('table');
    const headers = Object.keys(users[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    users.forEach(obj => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const cell = document.createElement('td');
            cell.textContent = obj[header];
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    filteredUsersContainer.appendChild(table);
}

async function filterUsers(event) {
    event.preventDefault();

    const country = document.getElementById('country').value.trim();
    const minAge = parseInt(document.getElementById('minAge').value.trim());
    const maxAge = parseInt(document.getElementById('maxAge').value.trim());
    const gender = document.getElementById('gender').value.trim();
    const favorite = document.getElementById('favorite').value.trim();

    const filteredUsers = await filterUsersByParams(validUsers, country, minAge, maxAge, gender, favorite);
    displayFilteredUsers(filteredUsers);
}

document.getElementById('filterButton').addEventListener('click', filterUsers);
