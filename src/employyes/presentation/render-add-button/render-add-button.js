import './render-add-button.css';
import { showModal } from '../render-modal/render-modal';

/**
 *
 * @param {HTMLDivElement} element
 */

export const renderAddButton = ( element, callback ) => {

    const fabButton = document.createElement('button');
    fabButton.className = 'button button--add button--width-icon';
    fabButton.innerHTML = '<span>Add employee</span> <img src="../../../../public/circle-add-svgrepo-com.svg" alt="Add employe" class="icons" />';

    element.append( fabButton );

    fabButton.addEventListener('click', () => {
        showModal();
    });

}