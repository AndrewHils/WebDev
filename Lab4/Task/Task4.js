document.addEventListener("DOMContentLoaded", function() {
    const validUsersString = localStorage.getItem('validUsers');
    const validUsers = JSON.parse(validUsersString);

    function sortByParam(users, param, sortOrder = 'asc') {
        return users.sort((a, b) => {
            let comparison = 0;
            let valueA, valueB;

            if (param === 'full_name') {
                // Сортуємо саме за ІМЕНЕМ користувача
                const nameA = a.full_name.split(' ')[1];
                const nameB = b.full_name.split(' ')[1];
                valueA = nameA.toLowerCase();
                valueB = nameB.toLowerCase();
            } else if (param === 'birthday') {
                // Перетворемо задану дату в обєкт Date
                valueA = new Date(a.b_date);
                valueB = new Date(b.b_date);
            } else {
                // Стандартне сортування за іншими властивостями
                valueA = typeof a[param] === 'string' ? a[param].toLowerCase() : a[param];
                valueB = typeof b[param] === 'string' ? b[param].toLowerCase() : b[param];
            }

            if (valueA > valueB) {
                comparison = 1;
            } else if (valueA < valueB) {
                comparison = -1;
            }

            return sortOrder === 'desc' ? comparison * -1 : comparison;
        });
    }

    function sortUsers() {
        const sortParam = document.getElementById('sortParam').value;
        const sortOrder = document.getElementById('sortOrder').value;

        const sortedUsers = sortByParam(validUsers, sortParam, sortOrder);
        displaySortedUsers(sortedUsers);
    }

    function displaySortedUsers(users) {
        const sortedUsersDiv = document.getElementById('sortedUsers');
        sortedUsersDiv.innerHTML = '';

        if (users.length === 0) {
            sortedUsersDiv.textContent = 'No users found.';
            return;
        }

        const table = document.createElement('table');
        const headers = ['Full Name', 'Age', 'Birthday', 'Country'];
        const headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });
        table.appendChild(headerRow);

        users.forEach(user => {
            const row = document.createElement('tr');
            headers.forEach(header => {
                const cell = document.createElement('td');
                if (header === 'Birthday') {
                    // Формотуємо дату для коректного відображення
                    const date = new Date(user.b_date);
                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    cell.textContent = formattedDate;
                } else {
                    cell.textContent = user[header.toLowerCase().replace(' ', '_')];
                }
                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        sortedUsersDiv.appendChild(table);
    }
    document.getElementById('sortButton').addEventListener('click', sortUsers);
});
