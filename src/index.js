const navShirts = document.querySelector("#shirts")
navShirts.addEventListener("click", getItems)

const navCart = document.querySelector("#cart")
navCart.addEventListener("click", getCart)

//bigdiv
const div = document.querySelector("#div-container")
div.addEventListener("click", handleDivEvents)

let cartTable = document.querySelector("#cart-table")
cartTable.addEventListener("click", deleteCartItem)

//innerdiv
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
// createCart()
// let cartObj 

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
    <form id="form-add">
    <div class="form-group">
        <select class="form-control custom-select" id="selectQuantity" name="quantity" required>
        <option value="">Quantity</option>
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
        <select multiple class="form-control custom-select" id="exampleFormControlSelect2" name="size" required>
        <option value="Extra Small">Extra Small</option>  
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
        <option value="Extra Large">Extra Large</option>
        </select>
    </div>
    <button type="submit" class="btn btn-primary mb-2" >Add to cart</button>
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

    const form = document.querySelector("#form-add")
    form.addEventListener("submit", (e) => addToCart(e, item) )

}

function addToCart(e, item){
    e.preventDefault()
    cartObj = 218

    formData = {
        quantity: e.target.quantity.value,
        color: e.target.color.value,
        size: e.target.size.value,
        item_id: item.id,
        cart_id: cartObj 
    }
    
    configObj = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "accept" : "application/json"
        },
        body: JSON.stringify(formData)
    }

    fetch("http://localhost:3000/cart_items", configObj)
    .then(res => res.json())
    .then(reloadCart)
}

function reloadCart(){
    alert("item(s) has been added to your cart!")
    getCart()
}



function createCart(){
    fetch("http://localhost:3000/carts", {
        method: "POST",
        headers: {"Content-Type" : "application/json",
                "accept" : "application/json"}
    })
    .then(res => res.json())
    .then(cart => cartObj = cart)
}

function getCart(){
    
    fetch("http://localhost:3000/cart_items")
    .then(res => res.json())
    .then(cart => viewCart(cart))
}

function viewCart(cart){
    
    cartTable.innerHTML = ""
    if (cart.length == 0 ){
        cartTable.innerHTML = `<p>is empty</p>`
        document.getElementById("checkout-btn").disabled = true;
    }
    else {
        document.getElementById("checkout-btn").disabled = false;
    cartTable.innerHTML = `
    
    <tr>
            <th>Item Name</th>
            <th>Color</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
            <th>Remove</th>
    </tr>`

    priceArr = []
    cart.forEach(cartItemObj => {
        
        const itemRow = document.createElement("tr")
        const nameTd = document.createElement("td")
        nameTd.textContent = cartItemObj.item.name
        
        const colorTd = document.createElement("td")
        color = cartItemObj.color
        colorTd.textContent = color.charAt(0).toUpperCase() + color.slice(1)

        const sizeTd = document.createElement("td")
        sizeTd.textContent = cartItemObj.size

        const quantityTd = document.createElement("td")
        quantityTd.className = "quantity-row"
            const select = document.createElement("select");
            select.className = "form-update form-control custom-select";
            select.id = cartItemObj.id
            select.addEventListener("change", (e) => updateQuantity(e))

            const placementHolder = document.createElement("option");
            placementHolder.value = "";
            placementHolder.text = cartItemObj.quantity;
            select.appendChild(placementHolder)
            
                let values = [1, 2, 3, 4, 5];
                for (const val of values) {
                let option = document.createElement("option");
                option.value = val;
                option.text = val;
                select.appendChild(option);
                }
        quantityTd.appendChild(select)

        const priceTd = document.createElement("td")
        const subtotal = `${cartItemObj.quantity * cartItemObj.item.price}`
        
        priceArr.push(subtotal)
        priceTd.textContent = `${cartItemObj.quantity} x $${cartItemObj.item.price} = $${subtotal}`
        
        const blankTd = document.createElement("td")
        const removeTd = document.createElement("td")
        removeTd.className = "remove"
        removeTd.id = cartItemObj.id
        removeTd.textContent = "x"

        itemRow.append(nameTd, colorTd, sizeTd, quantityTd, priceTd, blankTd, removeTd)
        cartTable.appendChild(itemRow)
    })

        const subTotal = priceArr.reduce(function(total, price){return parseInt(total) + parseInt(price)})
        const tax = subTotal * 0.725
        const grandTotal = parseInt(subTotal) + parseInt(tax)

        const subtotalTr = document.createElement("tr")
        subtotalTr.innerHTML = `<td></td><td></td>
        <td></td><td>Subtotal</td><td>$${subTotal}</td>
        <td></td><td></td>`

        const taxesTr = document.createElement("tr")
        taxesTr.innerHTML = `<td></td><td></td>
        <td></td><td>Tax 7.25%</td><td>$${tax}</td>
        <td></td><td></td>`

        const totalTr = document.createElement("tr")
        totalTr.innerHTML = `<td></td><td></td>
        <td></td><td font-weight"bold">Total</td><td>$${grandTotal}</td>
        <td></td><td></td>`

      cartTable.append(subtotalTr, taxesTr, totalTr)  

    }
}

function updateQuantity(e){
    
    formData = {
        quantity: e.target.value,
    }
    
    configObj = {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "accept" : "application/json"
        },
        body: JSON.stringify(formData)
    }

    fetch("http://localhost:3000/cart_items" + `/${e.target.id}`, configObj)
    .then(res => res.json())
    .then(getCart)

}

function deleteCartItem(e){
    if (e.target.className == "remove"){
        cartItemId = e.target.id
    fetch("http://localhost:3000/cart_items" + `/${cartItemId}`, {method: "DELETE"})
    .then(getCart)
    }
    
}

