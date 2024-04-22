import './render-delete-group-button.css';
import { deleteEmployeeByGroup } from '../../use-cases/delete-employee-by-group';


/**
 *
 * @param {HTMLDivElement} element
 */

export const renderDeleteGroupButton = ( element ) => {

    const deleteGroupButton = document.createElement('button');
    deleteGroupButton.className = 'button button--delete-group button--width-icon';
    deleteGroupButton.innerHTML = '<span>Delete group</span> <img src="../../../../public/trash-delete-svgrepo-com-white.svg" alt="Delete Employee" class="icons" />';

    element.append( deleteGroupButton );

    deleteGroupButton.addEventListener('click', () => {
        deleteEmployeeByGroup();
    });

}