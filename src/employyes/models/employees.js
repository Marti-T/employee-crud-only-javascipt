


export class Employee {

    /**
     *
     * @param {Like<Employees>} employeeDataLike
     */

    constructor({ id, firstName, lastName, dateBirth, email, roleId }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateBirth = dateBirth;
        this.email = email;
        this.roleId = roleId;
    }

}