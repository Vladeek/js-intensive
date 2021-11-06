const buttonAuth = document.querySelector('.button-auth');
const buttonCloseAuth = document.querySelector('.close-auth');
const buttonOut = document.querySelector('.button-out');
const modalAuth = document.querySelector('.modal-auth');
const userName = document.querySelector('.user-name');
const logInForm = document.getElementById('logInForm');
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');
const errorMesageLogin = document.querySelector('.error-message')

const login = (user) => {
   buttonAuth.style.display = 'none';
   buttonOut.style.display = 'flex';

   userName.style.display = 'flex';
   userName.textContent = user.login;

   modalAuth.style.display = 'none';
}

const logout = (user) => {
   buttonAuth.style.display = 'flex';
   buttonOut.style.display = 'none';

   userName.style.display = 'none';
   userName.textContent = '';

   localStorage.removeItem('user');
}

buttonAuth.addEventListener('click', () => {
   modalAuth.style.display = 'flex';
})

buttonOut.addEventListener('click', () => {
   logout();
})

buttonCloseAuth.addEventListener('click', () => {
   modalAuth.style.display = 'none';
   errorMesageLogin.style.visibility = 'hidden';
})

logInForm.addEventListener('submit', (event) => {
   event.preventDefault();
   const user = {
      login: inputLogin.value,
      password: inputPassword.value
   }
   if (inputLogin.value == '') {
      errorMesageLogin.style.visibility = 'visible';
      errorMesageLogin.textContent = 'Введите логин!';
   }
   else {
      localStorage.setItem('user', JSON.stringify(user));
      login(user);
   }

})

if (localStorage.getItem('user')) {
   login(JSON.parse(localStorage.getItem('user')));
}