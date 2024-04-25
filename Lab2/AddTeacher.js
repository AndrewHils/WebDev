function openPopup() {
    // Создаем элемент подложки попапа
    var overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");

    // Добавляем подложку перед закрывающим тегом body
    document.body.insertBefore(overlay, document.body.firstChild);

    var popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");

    // Добавляем форму в попап
    popupContent.innerHTML = `
        <form action="#" method="post">
  <div class="popup-overlay" id="popup">
    <div class="popup-content">
      <div class="gray-place"></div>
      <span class="close" onclick="closePopup()">&times;</span>

      <h2>Add Teacher</h2>
      <div class="popup-info">
        <label for="teacher-name">Name</label>
        <input type="text" id="teacher-name" name="teacher-name" placeholder="Enter name"><br><br>

        <label for="teacher-specialty">Specialty</label>
        <select id="teacher-specialty" name="teacher-specialty">
          <option value="Math">Math</option>
          <option value="Science">Chemistry</option>
          <option value="Language">English Language</option>
          <option value="History">History</option>
          <option value="Art">Art</option>
          <option value="Music">Music</option>
          <option value="Physical Education">Physical Education</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Literature">Literature</option>
          <option value="Business">Business</option>
        </select><br><br>

        <label for="teacher-country">Country</label>
        <select id="teacher-country" name="teacher-country">
          <option value="Ukraine">Ukraine</option>
          <option value="Italy">Italy</option>
          <option value="United States">United States</option>
          <option value="China">China</option>
          <option value="India">India</option>
          <option value="Brazil">Brazil</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Mexico">Mexico</option>
          <option value="Japan">Japan</option>
          <option value="Philippines">Philippines</option>
          <option value="Vietnam">Vietnam</option>
          <option value="Ethiopia">Ethiopia</option>
          <option value="Egypt">Egypt</option>
          <option value="Germany">Germany</option>
          <option value="Iran">Iran</option>
          <option value="Turkey">Turkey</option>
          <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
        </select><br><br>

        <label for="teacher-city">City</label>
        <input type="text" id="teacher-city" name="teacher-city"><br><br>

        <label for="teacher-email">Email</label>
        <input type="email" id="teacher-email" name="teacher-email"><br><br>

        <label for="teacher-phone">Phone</label>
        <input type="tel" id="teacher-phone" name="teacher-phone"><br><br>

        <label for="teacher-dob">Date of Birth</label>
        <input type="date" id="teacher-dob" name="teacher-dob"><br><br>

        <fieldset id="teacher-gender">
          <legend>Sex</legend>
          <label>
            <input type="radio" name="gender" value="male">
            <span>Male</span>
          </label>
          <label>
            <input type="radio" name="gender" value="female">
            <span>Female</span>
          </label>
          <label>
            <input type="radio" name="gender" value="other">
            <span>Other</span>
          </label>
        </fieldset>

        <label for="background-color">Background Color</label>
        <input type="color" id="background-color" name="background-color">

        <label for="teacher-note">Notes (optional)</label>
        <textarea id="teacher-note" name="teacher-note"></textarea><br><br>
        <input type="button" id="teacher-add" value="Add">
      </div>
    </div>
  </div>
</form>
    `;

    overlay.appendChild(popupContent);

    var clearButton = document.getElementById('teacher-add');

    // Добавляем обработчик события на клик
    clearButton.addEventListener('click', function() {
        // Очищаем все поля формы
        document.getElementById('teacher-name').value = '';
        document.getElementById('teacher-specialty').value = '';
        document.getElementById('teacher-country').value = '';
        document.getElementById('teacher-city').value = '';
        document.getElementById('teacher-email').value = '';
        document.getElementById('teacher-phone').value = '';
        document.getElementById('teacher-dob').value = '';
        // Сбрасываем выбор радиокнопок
        var radioButtons = document.getElementsByName('gender');
        for (var i = 0; i < radioButtons.length; i++) {
            radioButtons[i].checked = false;
        }
        document.getElementById('background-color').value = '';
        document.getElementById('teacher-note').value = '';
    });
}


function closePopup() {
    // Находим элемент подложки попапа
    var overlay = document.querySelector(".popup-overlay");

    // Проверяем, существует ли подложка
    if (overlay && overlay.parentNode) {
        console.log("Overlay:", overlay); // Debug information
        console.log("Overlay parentNode:", overlay.parentNode); // Debug information

        overlay.classList.replace('popup-overlay', 'popup-overlay-hide');

        // Если подложка существует, удаляем ее из DOM
        overlay.parentNode.removeChild(overlay);
    }
}



