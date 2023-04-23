let inputTxt = document.querySelector('.text')
let inputSubmit = document.querySelector('.submit')
let listeItems = document.querySelector('.listes')
let deleteBtn = document.querySelector('.delete')
const saveInput = document.querySelector('.save')

let dataArray = []

let localStorageItem = JSON.parse(localStorage.getItem('item'))
if(localStorageItem) {
    dataArray = localStorageItem
    showData(dataArray)
}

saveInput.addEventListener('click', (e) => {
   e.preventDefault()

   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      dataArray.push(tabs[0].url)
      localStorage.setItem('item', JSON.stringify(dataArray))
      showData(dataArray)
   })
})

deleteBtn.addEventListener('dblclick', (e) => {
   e.preventDefault()

   localStorage.clear()
   dataArray = []
   showData(dataArray)
})

inputSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    
    let value = inputTxt.value
    if(value === "") {
        alert("Empty Input, please inser URL!")
    } else {
        dataArray.push(value)
         localStorage.setItem("item", JSON.stringify(dataArray))
         inputTxt.value = ''
         showData(dataArray)
    }
})

function showData(data) {
    let listItem = ""
    let id = Date.now()
    for(let item of data) {
       listItem += `<li class="liste" id=${id++}>
                      <a href="${item}" target="blanc">${item}</a>
                      <span class="close">X</span>
                   </li>
                   `
    }
    
    listeItems.innerHTML = listItem
}














