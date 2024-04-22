import { Employee } from '../models/employees';
import { employeeModelToLocalhost } from '../mappers/employee-to-localhost.mapper';
import { localhostEmployeeToModel } from '../mappers/localhost-employee.mapper';
import employeeStore from '../store/employees-store';
import { renderGrid } from '../presentation/render-grid/render-grid';

/**
 *
 * @param {Like<Employee>} employeeLike
 */

export const saveEmployee = async(employeeLike ) => {

    const employee = new Employee( employeeLike );

    const employeeToSave = employeeModelToLocalhost( employee );

    let employeeUpdated;

    if ( employee.id ) {

        employeeUpdated =  await updateEmployee( employeeToSave );

    } else {

        const existingEmployees = await getAllEmployees();
        const employeeExists = existingEmployees.some(existingEmployee => {
            return existingEmployee.id === employee.id || existingEmployee.email === employee.email;
        });

        if (employeeExists) {
            alert('The employee already exists (look id or email).');
        } else {
            employeeUpdated = await createEmployee( employeeToSave );
            await employeeStore.reloadPage();
            document.querySelector('#current-page').innerText = employeeStore.getCurrentPage();
            document.querySelector('#current-page').innerText = employeeStore.getCurrentPage();
            renderGrid();
        }

    }

    return localhostEmployeeToModel( employeeUpdated );

}

/**
 * @param {Like<Employee>} Employee
 */

const createEmployee = async( employee ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/employees`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(employee),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newEmployee = await res.json();

    return newEmployee;

}


const getAllEmployees = async() => {
    const url = `${ import.meta.env.VITE_BASE_URL }/employees`;
    const res = await fetch(url);
    const data = await res.json();
    const allEmployees = data.map( localhostEmployeeToModel );
    return allEmployees;
}

/**
 * @param {Like<Employye>} employee
 */

const updateEmployee = async( employee ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/employees/${ employee.id }`;
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(employee),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updatedEmployee = await res.json();

    return updatedEmployee;

}