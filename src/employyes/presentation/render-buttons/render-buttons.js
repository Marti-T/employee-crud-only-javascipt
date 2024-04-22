import employeeStore from '../../store/employees-store';
import './render-buttons.css';
import { renderGrid } from '../render-grid/render-grid';

/**
 *
 * @param {HTMLDivElement} element
 */

export const  renderButtons = ( element ) => {

    const pagination = document.createElement('div');
    pagination.className = 'pagination';

    const nextButton = document.createElement('button');
    nextButton.className = 'button button--next button--width-icon';
    nextButton.innerHTML = '<span>Next</span> <img src="../../../../public/chevron-right-svgrepo-com.svg" alt="Next" class="icons" />';

    const prevButton = document.createElement('button');
    prevButton.className = 'button button--prev button--width-icon';
    prevButton.innerHTML = '<img src="../../../../public/chevron-left-svgrepo-com.svg" alt="Prev" class="icons" /> <span>Prev</span>';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.className = 'current-page';
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerText = employeeStore.getCurrentPage();

    pagination.append(prevButton, currentPageLabel, nextButton);

    element.append(pagination);

    nextButton.addEventListener('click', async() => {
        await employeeStore.loadNextPage();
        currentPageLabel.innerText = employeeStore.getCurrentPage();
        renderGrid( element );
    });

    prevButton.addEventListener('click', async() => {
        await employeeStore.loadPreviousPage();
        currentPageLabel.innerText = employeeStore.getCurrentPage();
        renderGrid( element );
    });

}