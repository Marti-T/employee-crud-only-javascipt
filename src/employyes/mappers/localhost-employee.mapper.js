import { Employee } from '../models/employees';

/**
 *
 * @param {Like<Employee>} localhostEmployee
 * @returns {Employee}
 */
export const localhostEmployeeToModel = (localhostEmployee) => {

    const {
        id,
        name,
        surname,
        date_birth,
        email,
        role_id,
    } = localhostEmployee;

    return new Employee({
        id,
        firstName: name,
        lastName: surname,
        dateBirth: date_birth,
        email,
        roleId: role_id
    })

}