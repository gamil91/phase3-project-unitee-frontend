const div = document.querySelector("#div-container")
div.addEventListener("click", handleDivEvents)

const divShow = document.querySelector("#div-show")
const divItemContainer = document.querySelector("#div-item-container")

const divItem = document.createElement("div")
divItem.id = "div-item"

const divInfo = document.createElement("div")
divInfo.id = "div-info"

const divSelect = document.createElement("div")
divSelect.id = "div-select"



getItems()

function getItems(){
    fetch("http://localhost:3000/items")
    .then(res => res.json())
    .then(items => items.forEach(item => showEachItem(item)))
}

function showEachItem(item){
    
    const divItem = document.createElement("div")
    divItem.className = "div-item"

    const image = document.createElement("img")
    image.src = item.images[1].image_url
    image.className = "item-image"
    image.id = item.id

    const p = document.createElement("p")
    p.textContent = item.name
    p.id = item.id

    divItem.append(image, p)
    divItemContainer.appendChild(divItem)
    div.appendChild(divItemContainer)
}


function handleDivEvents(e){
    if (e.target.className == "item-image" || e.target.matches('p')){ 
        // div.textContent = ""
        divItemContainer.textContent = ""
        fetch("http://localhost:3000/items/" + e.target.id)
        .then(res => res.json())
        .then(item => showItem(item))
    }
    console.log(e.target)

}

function showItem(item){
    divItem.textContent = ""
    divInfo.textContent = ""

    const image = document.createElement("img")
    image.src = item.images[1].image_url

    const name = document.createElement("p")
    name.id = item.id
    name.textContent = item.name
    const price = document.createElement("p")
    price.id = item.id
    price.textContent = `$ ${item.price}`

    
    const select = document.createElement("select");
    select.addEventListener("change", (e) =>{
        image.src = e.target.value
    } )
    
    item.images.forEach(image => {
        const color = image.color
        const option = document.createElement("option");
        option.value = image.image_url
        option.text = color.charAt(0).toUpperCase() + color.slice(1);
        select.appendChild(option)
    })

    const label = document.createElement("label");
    label.innerHTML = "Choose a color "

    divSelect.append(label, select)
    divItem.appendChild(image)
    divInfo.append(name, price, divSelect)

    divShow.append(divItem, divInfo)
    div.appendChild(divShow)
}