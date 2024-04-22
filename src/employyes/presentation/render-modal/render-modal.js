import modalHtml from './render-modal.html?raw';
import './render-modal.css';
import { Employee } from '../../models/employees';
import { getEmployeeById } from '../../use-cases/get-employee-by-id';

/**
 *
 * @param {HTMLDivElement} element
 */

let modal, form;
let loadedEmployee = {};

/**
 * @param {String|Number} id
 */

export const showModal = async( id ) => {

    modal?.classList.remove('hide-modal');
    loadedEmployee = {};

    if ( !id ) return;
    const employee = await getEmployeeById( id );
    setFormValues( employee );

}

export const hideModal = () => {

    modal?.classList.add('hide-modal');
    form?.reset();
    form.querySelector('#messages').innerHTML = '';

}

/**
 *
 * @param {Employee} employee
 */
const setFormValues = ( employee ) => {
    form.querySelector('[name="firstName"]').value = employee.firstName;
    form.querySelector('[name="lastName"]').value = employee.lastName;
    form.querySelector('[name="dateBirth"]').value = employee.dateBirth;
    form.querySelector('[name="email"]').value = employee.email;

    const roleIdSelect = form.querySelector('[name="roleId"]');
    for (let option of roleIdSelect.options) {
        if (option.value === employee.roleId) {
            option.selected = true;
            break;
        }
    }

    loadedEmployee = employee;
}


/**
 *
 * @param {HTMLDivElement} element
 * @param {(employeeLike) => Promise<void>} callback (employeeCallback)
 */

export const renderModal = ( element, callback ) => {

    if ( modal ) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form');

    modal.addEventListener('click', ( event ) => {
       if( event.target.className === 'modal-container' ) {
           hideModal();
       }
    });

    form.addEventListener('submit', async(event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const employeeLike = { ...loadedEmployee };

        for (const [key, value] of formData) {
            employeeLike[key] = value;
        }

        let isValid = true;

        const firstName = formData.get('firstName');
        if (!firstName.trim()) {
            isValid = false;
            showMessage('The Name is required.');
        }

        const dateOfBirth = formData.get('dateBirth');
        const dobParts = dateOfBirth.split('-');
        if (dobParts.length !== 3) {
            isValid = false;
            showMessage('Enter a valid birth date in dd-mm-yyyy format.');
        } else {
            const [day, month, year] = dobParts.map(part => parseInt(part, 10));
            const dob = new Date(year, month - 1, day); // Meses en JavaScript son de 0 a 11

            if (isNaN(dob.getTime())) {
                isValid = false;
                showMessage('Enter a valid birth date in dd-mm-yyyy format.');
            } else {
                const currentDate = new Date();
                const minAgeDate = new Date(currentDate);
                minAgeDate.setFullYear(minAgeDate.getFullYear() - 65);
                const maxAgeDate = new Date(currentDate);
                maxAgeDate.setFullYear(maxAgeDate.getFullYear() - 18);

                if (dob < minAgeDate || dob > maxAgeDate) {
                    isValid = false;
                    showMessage('Must be between 18 and 65 years old.');
                }
            }
        }

        const email = formData.get('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            isValid = false;
            showMessage('Enter a valid email address.');
        }

        const roleId = formData.get('roleId');
        console.log(roleId);
        if (roleId === '') {
            isValid = false;
            showMessage('The Role is required.');
        }

        if (!isValid) return;

        await callback(employeeLike);

        hideModal();
    });


    const messagesContainer = form.querySelector('#messages');
    const showMessage = (message) => {
        messagesContainer.innerHTML = '';
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
    };

    element.append( modal );

}
