import db from './db.js';

// Проверка прав администратора
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'admin') {
  window.location.href = 'login.html';
}

// Элементы DOM
const usersTable = document.getElementById('usersTable').querySelector('tbody');
const userModal = document.getElementById('userModal');
const modalTitle = document.getElementById('modalTitle');
const userForm = document.getElementById('userForm');
const addUserBtn = document.getElementById('addUserBtn');

// Открытие модального окна для добавления
addUserBtn.addEventListener('click', () => {
  userForm.reset();
  document.getElementById('userId').value = '';
  modalTitle.textContent = 'Добавить пользователя';
  userModal.style.display = 'block';
});

// Закрытие модального окна
document.querySelector('.close').addEventListener('click', () => {
  userModal.style.display = 'none';
});

// Обработка отправки формы
userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const userId = document.getElementById('userId').value;
  const userData = {
    name: document.getElementById('modalName').value,
    email: document.getElementById('modalEmail').value,
    role: document.getElementById('modalRole').value
  };

  if (userId) {
    // Редактирование существующего пользователя
    const password = document.getElementById('modalPassword').value;
    if (password) {
      userData.password = password;
    }
    db.updateUser(userId, userData);
  } else {
    // Добавление нового пользователя
    userData.id = Date.now();
    userData.password = document.getElementById('modalPassword').value || 'default123';
    userData.createdAt = new Date().toISOString();
    db.addUser(userData);
  }

  userModal.style.display = 'none';
  renderUsers();
});

// Рендер списка пользователей
function renderUsers() {
  usersTable.innerHTML = '';
  
  db.loadUsers().forEach(user => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${new Date(user.createdAt).toLocaleDateString()}</td>
      <td>
        <button class="btn action-btn edit-btn" data-id="${user.id}">Изменить</button>
        <button class="btn action-btn danger delete-btn" data-id="${user.id}">Удалить</button>
      </td>
    `;
    
    usersTable.appendChild(row);
  });

  // Обработчики для кнопок редактирования и удаления
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const userId = e.target.dataset.id;
      editUser(userId);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const userId = e.target.dataset.id;
      if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
        db.deleteUser(userId);
        renderUsers();
      }
    });
  });
}

// Редактирование пользователя
function editUser(id) {
  const user = db.findUserById(id);
  if (user) {
    document.getElementById('userId').value = user.id;
    document.getElementById('modalName').value = user.name;
    document.getElementById('modalEmail').value = user.email;
    document.getElementById('modalRole').value = user.role;
    document.getElementById('modalPassword').value = '';
    
    modalTitle.textContent = 'Редактировать пользователя';
    userModal.style.display = 'block';
  }
}

// Первоначальный рендер
renderUsers();