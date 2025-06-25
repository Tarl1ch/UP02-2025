import db from './db.js';

// Регистрация
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const user = {
    id: Date.now(),
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    role: 'user',
    createdAt: new Date().toISOString()
  };

  if (db.findUser(user.email)) {
    alert('Пользователь с таким email уже существует!');
    return;
  }

  db.addUser(user);
  alert('Регистрация успешна!');
  localStorage.setItem('currentUser', JSON.stringify(user));
  window.location.href = 'profile.html';
});

// Вход
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  const user = db.validateUser(email, password);
  
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    // Редирект в зависимости от роли
    if (user.role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'profile.html';
    }
  } else {
    alert('Неверный email или пароль');
  }
});