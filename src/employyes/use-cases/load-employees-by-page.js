import { localhostEmployeeToModel } from '../mappers/localhost-employee.mapper';

/**
 * @param {Number} page
 * @returns {Promise<Employee[]>}
 */

export const loadEmployeesByPage = async( page = 1 ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/employees?_page=${ page }&_limit=6&_sort=id&_order=desc`;
    const res = await fetch(url);
    const data = await res.json();

    const employees = data.map( localhostEmployeeToModel );

    return employees;

}