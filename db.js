class Database {
  constructor() {
    this.users = this.loadUsers();
  }

  loadUsers() {
    const usersJson = localStorage.getItem('museumUsers');
    return usersJson ? JSON.parse(usersJson) : [];
  }

  saveUsers() {
    localStorage.setItem('museumUsers', JSON.stringify(this.users));
  }

  addUser(user) {
    this.users.push(user);
    this.saveUsers();
  }

  findUser(email) {
    return this.users.find(u => u.email === email);
  }

  findUserById(id) {
    return this.users.find(u => u.id == id);
  }

  validateUser(email, password) {
    const user = this.findUser(email);
    return user && user.password === password ? user : null;
  }

  updateUser(id, updates) {
    const user = this.findUserById(id);
    if (user) {
      Object.assign(user, updates);
      this.saveUsers();
      return true;
    }
    return false;
  }

  deleteUser(id) {
    this.users = this.users.filter(u => u.id != id);
    this.saveUsers();
  }
}

const db = new Database();
export default db;