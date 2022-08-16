
const $ = document.querySelector.bind(document)

const addBox = $('.add-box')
const popupBox = $('.popup-box')

const closeIcon = $('header i')
const popupTitle  = $('header p')
const addBtn = $('button')
const titleTag = $('input')
const descTag = $('textarea')



const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"]

const notes= JSON.parse(localStorage.getItem('notes') || '[]')

let isUpdate = false, updateId

function showNotes(){
    document.querySelectorAll('.note').forEach(note=> note.remove())
    notes.forEach((note, id) =>{
        let liTag =`
        <li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="menu">
                        <li onclick="updateNote(${id}, '${note.title}', '${note.description}') "><i class="uil uil-pen"></i>Edit</li>
                        <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>
        `
        addBox.insertAdjacentHTML("afterend", liTag);
    })
}
showNotes()



addBox.onclick = ()=>{
    popupBox.classList.add('show')
    titleTag.focus()
    popupTitle.innerHTML = 'Add note'
    addBtn.innerHTML = 'Add note'

}
closeIcon.onclick = ()=>{
    popupBox.classList.remove('show')
    titleTag.value=''
    descTag.value = ''
}


function showMenu(icon){
    document.onclick = (e)=>{
        icon.parentElement.classList.add('show');
        if(e.target != icon){
        icon.parentElement.classList.remove('show');
        }
    }
}


function deleteNote(id){
    let conrfim = confirm('do you want delete note')
    if(!conrfim) return
    console.log(id);
    notes.splice(id, 1)
    localStorage.setItem('notes', JSON.stringify(notes))
    showNotes()
}


function updateNote(id, title, description){
    isUpdate = true
    updateId = id
    addBox.click()
    popupTitle.innerHTML = 'Update note'
    addBtn.innerHTML = 'Update note'
    titleTag.value = title
    descTag.value = description
    console.log(id, title, description);
}


addBtn.onclick = (e)=>{
    e.preventDefault()

    let title = titleTag.value.trim(),
        description = descTag.value.trim()

        if(title || description){
            let DateObj = new Date
            let day = DateObj.getDay(),
                month = months[DateObj.getMonth()],
                year = DateObj.getFullYear()

            let noteInfo={
                title,
                description,
                date: `${day} ${month} ${year}`
            }
            // console.log(noteInfo);
            if(!isUpdate){
                notes.push(noteInfo)
            }else{
                notes[updateId] = noteInfo
            }
            localStorage.setItem('notes', JSON.stringify(notes))
            showNotes()
            closeIcon.click()

        }
}