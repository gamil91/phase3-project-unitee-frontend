const navShirts = document.querySelector("#shirts")
navShirts.addEventListener("click", getItems)

const div = document.querySelector("#div-container")
div.addEventListener("click", handleDivEvents)

const divItemContainer = document.querySelector("#div-item-container")
//div holding the shirt in purchase page
const divItem = document.createElement("div")
divItem.id = "div-item"
//div holding the shirt's info and purchase form in purchase page
const divInfo = document.createElement("div")
divInfo.id = "div-info"

const divForm = document.createElement("div")
divForm.id = "div-select"




getItems()
createCart()

function getItems(){
    div.innerHTML = ""
    divItemContainer.innerHTML = ""
    fetch("http://localhost:3000/items")
    .then(res => res.json())
    .then(items => items.forEach(item => showEachItem(item)))
}

function showEachItem(item){

    const divItemHome = document.createElement("div")
    divItemHome.className = "col-4"
    

    const image = document.createElement("img")
    image.src = item.images[1].image_url
    image.className = "item-image"
    image.id = item.id

    const p = document.createElement("p")
    p.textContent = item.name
    p.id = item.id

    divItemHome.append(image, p)
    divItemContainer.appendChild(divItemHome)
    div.appendChild(divItemContainer)
}


function handleDivEvents(e){
    if (e.target.className == "item-image" || e.target.matches('p')){ 
        divItemContainer.textContent = ""
        fetch("http://localhost:3000/items/" + e.target.id)
        .then(res => res.json())
        .then(item => showItem(item))
    }
    // console.log(e.target)

}

function showItem(item){
    //divItem -> div holding the shirt image
    divItem.textContent = ""
    divInfo.textContent = ""
    divForm.textContent = ""

    const image = document.createElement("img")
    image.src = item.images[1].image_url

    const name = document.createElement("p")
    name.id = item.id
    name.textContent = item.name

    const price = document.createElement("p")
    price.id = item.id
    price.textContent = `$ ${item.price}`

    const ulColor = document.createElement("ul")
    ulColor.id = "horizontal-list"
    ulColor.innerHTML = `View Available Colors: <br/><br/>`

    // divForm.append(label, selectColor)
    divForm.innerHTML = `
    <form>
    <div class="form-group">
        <select class="form-control custom-select" id="selectQuantity" name="quantity">
        <option>Quantity</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        </select>
    
    
        <label for="exampleFormControlSelect1">Choose a color</label>
        <select class="form-control custom-select" id="selectColor" name="color">
        </select>
   
    
        <label for="exampleFormControlSelect2">Choose a size</label>
        <select multiple class="form-control custom-select" id="exampleFormControlSelect2" name="size">
        <option value="Extra Small">Extra Small</option>  
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
        <option value="Extra Large">Extra Large</option>
        </select>
    </div>
    <button type="submit" class="btn btn-primary mb-2">Add to cart</button>
    </form>
    `

    divItem.appendChild(image)
    divInfo.append(name, price, ulColor, divForm)

    //appending two divs into innerdiv
    divItemContainer.append(divItem, divInfo)
    //appending innderdiv to bigDiv
    div.appendChild(divItemContainer)

    //grabbing select from the DOM populating it with each item's image
    const selectColor = document.querySelector("#selectColor");
    
    ulColor.addEventListener("click", (e) =>{
        if (e.target.matches("button")){
        image.src = e.target.id
        }
        
    })
        item.images.forEach(image => {
            //creating options for the color selector
            const color = image.color
            const option = document.createElement("option");
            option.value = color
            option.text = color.charAt(0).toUpperCase() + color.slice(1);
            //creating buttons for colors for preview
            const liColor = document.createElement("li")
            const btnColor = document.createElement("button")
            btnColor.className = "btn btn-outline-dark btn-sm"
            btnColor.textContent = color
            btnColor.id = image.image_url
            liColor.appendChild(btnColor)
            

            ulColor.appendChild(liColor)
            selectColor.appendChild(option)
        })

    const form = document.querySelector("form")
    form.addEventListener("submit", (e) => addToCart(e, item) )

}

function addToCart(e, item){
    e.preventDefault()

    formData = {
        quantity: e.target.quantity.value,
        color: e.target.color.value,
        size: e.target.size.value,
        item_id: item.id,
        cart_id: something 
    }




}

