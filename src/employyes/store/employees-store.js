import { loadEmployeesByPage } from '../use-cases/load-employees-by-page';


const state = {
    currentPage: 0,
    employees: [],
}

const loadNextPage = async() => {
    const employees = await loadEmployeesByPage( state.currentPage + 1 );
    if(employees.length === 0) return;

    state.currentPage += 1;
    state.employees = employees;
}

const loadPreviousPage = async() => {
    if(state.currentPage === 1) return;
    const employees = await loadEmployeesByPage( state.currentPage - 1 );

    state.employees = employees;
    state.currentPage -= 1;
}

/**
 *
 * @param {Employee} updatedEmployee
 */
const onEmployeeChanged = ( updatedEmployee ) => {

    if(updatedEmployee) {

        let wasFound = false;

        state.employees = state.employees.map(employee => {
            if (employee.id === updatedEmployee.id) {
                wasFound = true;
                return updatedEmployee;
            }
            return employee;
        });

        if (state.employees.length < 10 && !wasFound) {
            state.employees.push(updatedEmployee);
        }
    }

}

const reloadPage = async() => {
    const employees = await loadEmployeesByPage( state.currentPage );
    if(employees.length === 0) {
        await loadPreviousPage();
        return;
    }
    state.employees = employees;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onEmployeeChanged,
    reloadPage,

    /**
     * @returns {Employee[]}
     */
    getEmployees: () => [...state.employees],

    /**
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage
}