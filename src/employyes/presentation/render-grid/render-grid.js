import employeeStore from '../../store/employees-store';
import { showModal } from '../render-modal/render-modal';
import { deleteEmployeeById } from '../../use-cases/delete-employee-by-id';
import './render-grid.css';

/**
 * @param {HTMLDivElement} element
 */

let gridContainer;

const createGridContainer = () => {
    const container = document.createElement('div');
    container.classList.add('grid__container');
    return container;
}

/**
 * @param {MouseEvent} event
 */
const gridSelectListener = (event) => {
    const element = event.target.closest('.select-employee');
    if (!element) return;

    const id = element.getAttribute('data-id');
    showModal(id);
}

/**
 * @param {MouseEvent} event
 */
const gridDeleteListener = async (event) => {
    const element = event.target.closest('.delete-employee');
    if (!element) return;

    const id = element.getAttribute('data-id');
    try {
        await deleteEmployeeById(id);
        await employeeStore.reloadPage();
        document.querySelector('#current-page').innerText = employeeStore.getCurrentPage();
        renderGrid();
    } catch (error) {
        console.log(error);
        alert('Could not be eliminated.');
    }
}

/**
 * @param {HTMLDivElement} element
 */
export const renderGrid = (element) => {
    const employees = employeeStore.getEmployees();

    if (!gridContainer) {
        gridContainer = createGridContainer();
        element.append(gridContainer);

        gridContainer.addEventListener('click', gridSelectListener);
        gridContainer.addEventListener('click', gridDeleteListener);
    }

    gridContainer.innerHTML = ''; // Limpiar contenido previo

    employees.forEach(employee => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid__item');

        gridItem.innerHTML = `
            <ul class="grid__list-item">
                <li><b>ID:</b> ${employee.id}</li>
                <li><b>Name:</b> ${employee.firstName}</li>
                <li><b>Surname:</b> ${employee.lastName}</li>
                <li><b>Birth:</b> ${employee.dateBirth}</li>
                <li><b>Email:</b> <a href="mailto:${employee.email}">${employee.email}</a></li>
                <li><b>Role:</b> ${employee.roleId}</li>
            </ul>
            <div class="grid__group-behaviors">
                <input type="checkbox" data-id="${employee.id}" name="deleteGroup" class="checkbox" />
                <a href="#" class="select-employee" data-id="${employee.id}">
                    <img src="../../../../public/edit-svgrepo-com.svg" alt="Edit" class="icons" />
                </a>
                <a href="#" class="delete-employee" data-id="${employee.id}">
                    <img src="../../../../public/trash-delete-svgrepo-com-black.svg" alt="Delete" class="icons" />
                </a>
            </div>
        `;

        gridContainer.appendChild(gridItem);
    });
}
