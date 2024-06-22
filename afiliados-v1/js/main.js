'use strict';

const modal = document.querySelector('.modal');
const buttonModal = document.querySelectorAll(".js-modal");
const buttonCloseModal = document.querySelector('.modal__close');

buttonModal.forEach((button) => {
	button.addEventListener('click', () => {
	modal.classList.add('active');})});

buttonCloseModal.addEventListener('click', () => {
	modal.classList.remove('active');
});

