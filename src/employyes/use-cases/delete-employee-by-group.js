/**
 * @param {Array} id
 */
import employeeStore from '../store/employees-store';
import { renderGrid } from '../presentation/render-grid/render-grid';


export const deleteEmployeeByGroup = async() => {

    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="deleteGroup"]:checked');
    const groupIds = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-id'));

    if (groupIds.length > 0) {

        try {
            const deletePromises = groupIds.map(async(id) => {
                const url = `${import.meta.env.VITE_BASE_URL}/employees/${id}`;
                const res = await fetch(url, {
                    method: 'DELETE',
                });
                return res.json();
            });

            await Promise.all(deletePromises);
            await employeeStore.reloadPage();
            document.querySelector('#current-page').innerText = employeeStore.getCurrentPage();
            renderGrid();

            return true;
        } catch (error) {
            console.error('Error deleting employees:', error);
            return false;
        }

    } else {
        alert('No Employees have been selected for deletion.');
    }


}