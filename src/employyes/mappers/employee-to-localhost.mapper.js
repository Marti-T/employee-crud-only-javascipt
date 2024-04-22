import { Employee } from '../models/employees';

/**
 *
 * @param {Employee} employee
 */

export const employeeModelToLocalhost = ( employee ) => {

    const {
        id,
        firstName,
        lastName,
        dateBirth,
        email,
        roleId,
    } = employee;

    return {
        id,
        name: firstName,
        surname: lastName,
        date_birth: dateBirth,
        email,
        role_id: roleId
    }
}