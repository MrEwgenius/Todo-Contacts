




export function renderGroup(groupName, deleteIcon) {
    return `
    <div class="group">
        <button class="group-name">${groupName}</button>
        <img class="delete-group" src=${deleteIcon} alt="#">
    </div>
`
}

export function addGroupInput(deleteIcon) {
    return `
    <div class="group">
    <input maxlength="15" placeholder="Введите название" type="text">
    <img class="delete-group" src=${deleteIcon} alt="#">
 </div>
 `
}

export function renderSelect(groupName) {
    return `
    <option value="${groupName}">${groupName}</option>
    
    `
}

export function renderGroupFromBookContact(person, idx, obj,editIcon, deleteIcon) {

    return `
    <div class="accordion-item">
       <h2 class="accordion-header">
           <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
               data-bs-target="#flush-${idx}" aria-expanded="false" aria-controls="flush-${idx}">
               ${obj}
           </button>
       </h2>
       <div id="flush-${idx}" class="accordion-collapse collapse"
           data-bs-parent="#accordionFlushExample">
           ${person.length > 0 ? person.map((nam, innerIdx) => `
           <div class="accordion-body">
           <div  class="accordion-name">${nam.name}</div>
           <div class="accordion-number-and-control">
               <div class="number">${nam.number}</div>
               <div class="edit-delete-button">
                   <img class="edit-contact" src=${editIcon} alt="#" data-index="${idx}" >
                   <img class="delete-contact" src=${deleteIcon} alt="#">
               </div>
           </div>
           </div>
           `).join('') : '<div class="accordion-body">В группе нет контактов</div>'
        }
       </div>
       </div>
   </div>
`
}