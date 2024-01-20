let addGroup = document.querySelector('.add-button')
const offcanvasBody = document.querySelector('.offcanvas-body');
import deleteIcon from '../assets/icons/delete.svg'
import doneIcon from '../assets/icons/done.svg'
import editIcon from '../assets/icons/edit.svg'
import { setKeyLocalStorage } from "./localestorage.js"
import { Person } from './constructor.js';
import { addGroupInput, renderGroup, renderGroupFromBookContact, renderSelect } from './render.js';
const saveBtn = document.querySelector('.save-button');
const select = document.querySelector('.form-select');
const main = document.querySelector('.main');
const personName = document.querySelector('.person-name');
const personNumber = document.querySelector('.person-number');
const personGroup = document.querySelector('.form-select');
const saveButtonContact = document.querySelector('.save-button-contact');
const accordion = document.querySelector('.accordion');
const done = document.querySelector('.done');


let arrGroup = JSON.parse(localStorage.getItem('arrGroup')) || [];
let arrPersons = JSON.parse(localStorage.getItem('contact')) || []


showGroup()
displayGroupsFromAddContact()

accordion.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-contact')) {
        const contactToDelete = event.target.closest('.accordion-body');
        if (contactToDelete) {
            const indexToRemove = Array.from(contactToDelete.parentNode.children).indexOf(contactToDelete);
            contactToDelete.remove();
            if (indexToRemove !== -1) {
                arrPersons.splice(indexToRemove, 1);
                setKeyLocalStorage(arrGroup, 'arrGroup');
                setKeyLocalStorage(arrPersons, 'contact')
                displayBookContacts();
            }
        }
    }
});


saveButtonContact.addEventListener('click', function () {
    let contact = new Person(
        personName.value.trim(),
        personNumber.value.trim(),
        personGroup.value.trim()
    )
    arrPersons.push(contact)
    personName.value = ''
    personNumber.value = ''
    personGroup.value = ''
    setKeyLocalStorage(arrPersons, 'contact')
    showGroup()
})


addGroup.addEventListener('click', function () {
    const existingInput = offcanvasBody.querySelector('input');
    if (!existingInput) {
        offcanvasBody.innerHTML += addGroupInput(deleteIcon)
    }
});


offcanvasBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-group')) {
        const groupToDelete = event.target.closest('.group');
        if (groupToDelete) {
            const groupNameToDelete = groupToDelete.querySelector('.group-name').textContent;
            const indexToRemove = Array.from(groupToDelete.parentNode.children).indexOf(groupToDelete);
            groupToDelete.remove();
            if (indexToRemove !== -1) {
                arrGroup.splice(indexToRemove, 1);
                arrPersons = arrPersons.filter(contact => contact.group !== groupNameToDelete);
                setKeyLocalStorage(arrGroup, 'arrGroup');
                setKeyLocalStorage(arrPersons, 'contact');
                displayBookContacts()
            }
        }
    }
});


saveBtn.addEventListener('click', function () {
    const inputGroup = offcanvasBody.querySelector('input');
    const groupToRemove = inputGroup.closest('.group');
    if (inputGroup) {
        const groupName = inputGroup.value.trim()
        if (groupName) {
            groupToRemove.outerHTML = renderGroup(groupName, deleteIcon)
            arrGroup.push(groupName)
            setKeyLocalStorage(arrGroup, 'arrGroup');
        } else {
            const inputGroup = offcanvasBody.querySelector('input');
            const groupToRemove = inputGroup.closest('.group');
            groupToRemove.remove()
        }
        displayBookContacts()
    }
});

function showGroup() {
    arrGroup.forEach((groupName) => {
        offcanvasBody.innerHTML += renderGroup(groupName, deleteIcon)
    })
    displayBookContacts()
}


function displayGroupsFromAddContact() {
    arrGroup.forEach((groupName) => {
        select.innerHTML += renderSelect(groupName)
    })
    displayBookContacts()
}


function displayBookContacts() {
    accordion.innerHTML = '';
    if (arrGroup.length > 0) {
        arrGroup.forEach((groupName, idx) => {
            let person = arrPersons.filter((user) => user.group === groupName)
            accordion.innerHTML += renderGroupFromBookContact(person, idx, groupName, editIcon, deleteIcon)
        })
    } else {
        main.textContent = 'Список контактов пуст'
    }
}


document.addEventListener('click', function (event) {
    const contactToEdit = event.target.closest('.accordion-body');

    if (contactToEdit) {
        const nameContact = contactToEdit.querySelector('.accordion-name');
        const numberContact = contactToEdit.querySelector('.number');
        const editButton = contactToEdit.querySelector('.edit-contact');

        if (editButton && event.target === editButton) {
            nameContact.contentEditable = true;
            numberContact.contentEditable = true;
            nameContact.classList.add('editing');
            numberContact.classList.add('editing');

            let groupBtn = contactToEdit.querySelector('.edit-delete-button');
            if (groupBtn && groupBtn.children.length === 2) {
                groupBtn.innerHTML += ` <img class="done" src=${doneIcon} alt="#">`;
                console.log(1);
            }
        } else if (event.target.classList.contains('done')) {
            event.target.remove();
            const indexToUpdate = Array.from(contactToEdit.parentNode.children).indexOf(contactToEdit);
            const contactToUpdate = arrPersons[indexToUpdate];
            contactToUpdate.name = nameContact.textContent;
            contactToUpdate.number = numberContact.textContent;
            nameContact.contentEditable = false;
            numberContact.contentEditable = false;
            nameContact.classList.remove('editing');
            numberContact.classList.remove('editing');
            setKeyLocalStorage(arrPersons, 'contact');
        }
    }
});


