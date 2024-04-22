import './style.css';
import { employeesApp } from './src/employyes/employees-app';

document.querySelector('#app').innerHTML = `
  <div>
    <h1 class="header__title">EMPLOYEES CRUD</h1>
    <div class="grid">
    </div>
  </div>
`;

const element = document.querySelector('.grid');

employeesApp( element );
