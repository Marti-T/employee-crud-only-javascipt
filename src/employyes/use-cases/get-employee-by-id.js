import { localhostEmployeeToModel } from '../mappers/localhost-employee.mapper';

/**
 * @param {String|Number} id
 * @returns {Promise<Employee[]>}
 */

export const getEmployeeById = async( id ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/employees/${ id }`;
    const res = await fetch(url);
    const data = await res.json();

    const employee = localhostEmployeeToModel(data);
    return employee;

}