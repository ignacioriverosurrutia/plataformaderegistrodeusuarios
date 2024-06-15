document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    const confirmButton = document.getElementById('confirmButton');
    const userGrid = document.getElementById('userGrid');
    let users = [];

    // Función para mostrar la modal de confirmación
    function showConfirmationModal(user) {
        document.getElementById('confirmFirstName').textContent = user.firstName;
        document.getElementById('confirmLastName').textContent = user.lastName;
        document.getElementById('confirmBirthDate').textContent = user.birthDate;
        document.getElementById('confirmEmail').textContent = user.email;
        document.getElementById('confirmPosition').textContent = user.position;
        document.getElementById('confirmStartDate').textContent = user.startDate;
        confirmationModal.show();
    }

    // Validación del formulario
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (registrationForm.checkValidity()) {
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const birthDate = document.getElementById('birthDate').value;
            const email = document.getElementById('email').value;
            const position = document.getElementById('position').value;
            const startDate = document.getElementById('startDate').value;

            // Validación de correo único
            if (users.some(user => user.email === email)) {
                alert('El correo electrónico ya está registrado.');
                return;
            }

            // Validación de fecha de ingreso mayor a 18 años después de la fecha de nacimiento
            const birthYear = new Date(birthDate).getFullYear();
            const startYear = new Date(startDate).getFullYear();
            if (startYear - birthYear < 18) {
                alert('La fecha de ingreso no puede ser menor a 18 años desde la fecha de nacimiento.');
                return;
            }

            const newUser = {
                firstName,
                lastName,
                birthDate,
                email,
                position,
                startDate
            };

            showConfirmationModal(newUser);
        }

        registrationForm.classList.add('was-validated');
    });

    // Confirmar y agregar usuario
    confirmButton.addEventListener('click', () => {
        const newUser = {
            firstName: document.getElementById('confirmFirstName').textContent,
            lastName: document.getElementById('confirmLastName').textContent,
            birthDate: document.getElementById('confirmBirthDate').textContent,
            email: document.getElementById('confirmEmail').textContent,
            position: document.getElementById('confirmPosition').textContent,
            startDate: document.getElementById('confirmStartDate').textContent
        };

        users.push(newUser);
        addUserToGrid(newUser);
        confirmationModal.hide();
        registrationForm.reset();
        registrationForm.classList.remove('was-validated');
    });

    // Agregar usuario a la cuadricula
    function addUserToGrid(user) {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <h5>${user.firstName} ${user.lastName}</h5>
            <p>${user.email}</p>
            <p>${user.position}</p>
            <p>${user.startDate}</p>
            <button class="btn btn-danger btn-sm">Eliminar</button>
        `;

        userCard.querySelector('button').addEventListener('click', () => {
            userGrid.removeChild(userCard);
            users = users.filter(u => u.email !== user.email);
        });

        userGrid.appendChild(userCard);
    }
});
