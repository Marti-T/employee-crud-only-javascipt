import employeeStore from './store/employees-store';
import { renderGrid } from './presentation/render-grid/render-grid';
import { renderButtons } from './presentation/render-buttons/render-buttons';
import { renderAddButton } from './presentation/render-add-button/render-add-button';
import { renderModal } from './presentation/render-modal/render-modal';
import { saveEmployee } from './use-cases/save-employee';
import { renderDeleteGroupButton } from './presentation/render-delete-group-button/render-delete-group-button';

/**
 * @param {HTMLDivElement} element
 * @returns {Promise<void>}
 */

export const employeesApp = async(element ) => {

    element.innerHTML = 'Loading ...';
    await employeeStore.loadNextPage();
    element.innerHTML = '';

    renderGrid( element );
    renderButtons( element );
    renderAddButton( element );
    renderDeleteGroupButton( element );
    renderModal( element, async( employeeLike ) => {
        const employee = await saveEmployee( employeeLike );
        employeeStore.onEmployeeChanged( employee );
        renderGrid( element );
    });

}