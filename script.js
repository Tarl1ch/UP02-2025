// Основные скрипты для сайта
document.addEventListener('DOMContentLoaded', function() {
    // Счетчик посетителей
    if (document.getElementById('visitor-counter')) {
        let counter = localStorage.getItem('visitorCounter');
        if (!counter) {
            counter = Math.floor(Math.random() * 100) + 50;
        } else {
            counter = parseInt(counter) + 1;
        }
        localStorage.setItem('visitorCounter', counter);
        document.getElementById('visitor-counter').textContent = counter;
    }

    // Модальное окно в админке
    const modal = document.getElementById('add-user-modal');
    const addBtn = document.getElementById('add-user-btn');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('add-user-form');

    if (addBtn) {
        addBtn.addEventListener('click', function() {
            modal.style.display = 'flex';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Пользователь успешно добавлен!');
            modal.style.display = 'none';
            // Здесь должна быть логика добавления пользователя
        });
    }

    // Удаление пользователей
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
                const row = this.closest('tr');
                row.style.opacity = '0';
                setTimeout(() => row.remove(), 300);
            }
        });
    });

    // Изменение ролей
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const roleCell = row.cells[3];
            const currentRole = roleCell.textContent;
            
            const newRole = prompt('Введите новую роль (Пользователь, Редактор, Администратор):', currentRole);
            if (newRole && ['Пользователь', 'Редактор', 'Администратор'].includes(newRole)) {
                roleCell.textContent = newRole;
            }
        });
    });

    // Активация выпадающего меню
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Закрытие выпадающего меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!e.target.matches('.dropdown a')) {
            const dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });
});