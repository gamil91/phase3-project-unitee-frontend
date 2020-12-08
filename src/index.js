

    // const navShirts = document.querySelector("#shirts")
    // navShirts.addEventListener("click", getItems)

    // const navSale = document.querySelector("#sale")
    // navSale.addEventListener("click", getSaleItems)

    // const navCart = document.querySelector("#cart")
    // navCart.addEventListener("click", getCart)

    const navListener = document.querySelector("#navListener")
    navListener.addEventListener("click", (e) => navButtons(e))

    function navButtons(e){
        if (e.target.id == "shirts"){
            getItems()
        }
        else if (e.target.id == "cart"){
            getCart()
        }
        else if (e.target.id == "sale"){
            getSaleItems()
        }
    
    }



    const placeOrderBtn = document.getElementById("placeOrder-btn")
    placeOrderBtn.addEventListener("click", placeOrder)

    //bigdiv
    const div = document.querySelector("#div-container")
    div.addEventListener("click", handleDivEvents)

    let cartTable = document.querySelector("#cart-table")
    cartTable.addEventListener("click", deleteCartItem)

    //----------------------------------->

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
    createCart()
    let cartObj
    let userObj = 0
    let colorsArr = []


    function getItems(){
        div.innerHTML = ""
        divItemContainer.innerHTML = ""
        fetch("http://localhost:3000/items")
        .then(res => res.json())
        .then(items => items.forEach(item => showEachItem(item)))
        .then(loadColors)
    }


    
    function showEachItem(item, color=""){
        div.innerHTML = ""
        div.divItemContainer = ""

        const divItemHome = document.createElement("div")
        divItemHome.className = "col-4"
        
        //pushing available colors to load to the Navbar later
        item.images.forEach(image => {colorsArr.push(image.color)})

        const image = document.createElement("img")
        image.src = item.images[1].image_url
        image.className = "item-image"
        image.id = item.id

        if (color != ""){
             sorted_image = item.images.find(image => image.color == color)
             image.src = sorted_image.image_url
        }

        const p = document.createElement("p")
        p.textContent = item.name
        p.id = item.id

        divItemHome.append(image, p)
        divItemContainer.appendChild(divItemHome)
        div.appendChild(divItemContainer)

    }


    function loadColors(){
        const uniqueColors = []
        colorsArr.forEach(color => {
            if (!uniqueColors.includes(color)){
                uniqueColors.push(color)
            }
        })

        const colorDropdown = document.querySelector("#colorDropdown")
        colorDropdown.innerHTML = ""
        colorDropdown.addEventListener("click", sortByColor)
        
        uniqueColors.sort()
        uniqueColors.forEach(color => {
            const a = document.createElement("a")
            a.textContent = color.charAt(0).toUpperCase() + color.slice(1)
            a.className = "dropdown-item"
            colorDropdown.appendChild(a)
        })
    }


    function sortByColor(e){
        div.innerHTML = ""
        divItemContainer.innerHTML = ""
        const colorChoice = e.target.text.toLowerCase()
        
        fetch(`http://localhost:3000/items/sort/${colorChoice}`)
        .then(res => res.json())
        .then(items => items.forEach(item => (showEachItem(item, colorChoice))
        ))
    }

    function getSaleItems(){
        div.innerHTML = ""
        divItemContainer.innerHTML = ""
        fetch("http://localhost:3000/items/sales/true")
        .then(res => res.json())
        .then(items => items.forEach(item => (showEachItem(item))
        ))
    }



    function handleDivEvents(e){
        
        if (e.target.className == "item-image" || e.target.matches('p')){ 
            divItemContainer.textContent = ""
            fetch("http://localhost:3000/items/" + e.target.id)
            .then(res => res.json())
            .then(item => showItem(item, e.target.src))
        }
    }
    
    function showItem(item, pic){
        //divItem -> div holding the shirt image
        divItem.textContent = ""
        divInfo.textContent = ""
        divForm.textContent = ""
        
        const image = document.createElement("img")
        image.src = pic

        const name = document.createElement("p")
        name.id = item.id
        name.textContent = item.name


        const price = document.createElement("p")
        price.id = item.id
        price.innerHTML = `$ ${item.price}`
      
        if(item.clearance == true){
            const originalPrice = item.price
            const discount = Math.floor((originalPrice * 0.15)*100)/100
            const withDiscount = originalPrice - discount      
            price.innerHTML = `<span style="color:red">$${item.price}</span>`.strike() + ` $${withDiscount}`
        } 
    

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
            <option id="color-holder"></option>
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
        
        ulColor.addEventListener("click", (e) =>{
            if (e.target.matches("button")){
                image.src = e.target.id
            }
        })
        
        let selectColorPlaceholder = document.querySelector("#color-holder")

        const selectColor = document.querySelector("#selectColor");
        selectColor.addEventListener("change", (e) => {
            clickedColor = e.target[event.target.selectedIndex].dataset.image
            image.src = clickedColor
        })
        
      
        //go through the item's images and find the specific image clicked to grab it's color
        const colorPlaceholder = item.images.find(image => image.image_url == pic).color
        // debugger
        selectColorPlaceholder.value = colorPlaceholder
        selectColorPlaceholder.text = colorPlaceholder.charAt(0).toUpperCase() + colorPlaceholder.slice(1)
        selectColorPlaceholder.dataset.image = pic
        selectColor.appendChild(selectColorPlaceholder)
        
        
            item.images.forEach(image => {
                //creating options for the color selector
                // debugger
                const color = image.color
                if (image.image_url != selectColorPlaceholder.dataset.image){
                const option = document.createElement("option");
                option.dataset.image = image.image_url
                option.value = color
                option.text = color.charAt(0).toUpperCase() + color.slice(1);

                selectColor.appendChild(option)
                }
                //creating buttons for colors for preview
                const liColor = document.createElement("li")
                const btnColor = document.createElement("button")
                btnColor.className = "btn btn-outline-dark btn-sm"
                btnColor.textContent = color
                btnColor.id = image.image_url
                liColor.appendChild(btnColor)
                

                ulColor.appendChild(liColor)
                
            })
        
       
        

        const form = document.querySelector("#form-add")
        form.addEventListener("submit", (e) => addToCart(e, item))

    }

    function addToCart(e, item){
        e.preventDefault()

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
        .then(addedItem => reloadCart(addedItem))
    }

    function reloadCart(addedItem){
        alert("item(s) has been added to your cart!")
        
        cartObj = addedItem.cart_id

        getCart()
    }



    function createCart(){
        fetch("http://localhost:3000/carts", {
            method: "POST",
            headers: {"Content-Type" : "application/json",
                    "accept" : "application/json"}
        })
        .then(res => res.json())
        .then(cart => cartObj = cart.id)
    }



    function getCart(){
        
        fetch("http://localhost:3000/cart_items")
        .then(res => res.json())
        .then(cart => viewCart(cart))
    }






    function viewCart(cart){
        
        const emptyCart = document.querySelector("#emptyCart")
        emptyCart.innerHTML = ""

        cart = cart.filter(cart_items => cart_items.cart_id == cartObj)
        cartTable.innerHTML = ""
        if (cart.length == 0 ){
           
            emptyCart.textContent = "Boo! Your shopping cart is empty"

            const receiptTitle = document.querySelector("#receiptTitle")
            receiptTitle.innerHTML = ""
        
            const receiptCustomer = document.querySelector("#receiptCustomer")
            receiptCustomer.innerHTML = ""

        }
        else 
        {
            emptyCart.innerHTML = `<img src="images/uniTeeLogo.png">Your Shopping Cart` 
            cartTable.innerHTML = `
        
        <tr>
                <th>Item Name</th>
                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th data-html2canvas-ignore></th>
                <th data-html2canvas-ignore>Remove</th>
        </tr>`
        
        
        
        let subtotalCounter = 0
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
            priceTd.innerHTML = `${cartItemObj.quantity} x $${cartItemObj.item.price}`
            let subItemTotal = `${cartItemObj.quantity * cartItemObj.item.price}`
            
            
            if(cartItemObj.item.clearance == true){
                //if the item is on sale, do some math!

                const originalPrice = cartItemObj.item.price
                const discount = Math.floor((originalPrice * 0.15)*100)/100
                const discounted = originalPrice - discount      
                    
                subItemTotal = (cartItemObj.quantity * discounted).toFixed(2)
                priceTd.innerHTML = `${cartItemObj.quantity} x ` + `<span style="color:red">$${discounted}</span>`
            } 
            
            //for every calculated subItemTotal turned to float and added to the subtotalCounter
            subtotalCounter += parseFloat(subItemTotal)
            
            const blankTd = document.createElement("td")
            blankTd.setAttribute('data-html2canvas-ignore','')

            const removeTd = document.createElement("td")
            removeTd.className = "remove"
            removeTd.id = cartItemObj.id
            removeTd.setAttribute('data-html2canvas-ignore','')
            removeTd.textContent = "x"

            itemRow.append(nameTd, colorTd, sizeTd, quantityTd, priceTd, blankTd, removeTd)
            cartTable.appendChild(itemRow)
        })

    
            const tax = Math.floor((subtotalCounter * 0.0725)*100)/100        
            const grandTotal = (subtotalCounter + parseFloat(tax)).toFixed(2)

            const subtotalTr = document.createElement("tr")
            subtotalTr.innerHTML = `
                <td></td>
                <td></td>
                <td></td>
                <td>Subtotal</td>
                <td>$${subtotalCounter}</td>
            `

            const taxesTr = document.createElement("tr")
            taxesTr.innerHTML = `
                <td></td>
                <td></td>
                <td></td>
                <td>Tax 7.25%</td>
                <td>$${tax}</td>`

            const totalTr = document.createElement("tr")
            totalTr.innerHTML = `
                <td></td>
                <td></td>
                <td></td>
                <td style="font-weight:bold;">Total</td>
                <td>$${grandTotal}</td>`

            const checkoutBtnTr = document.createElement("tr")
            checkoutBtnTr.innerHTML = `
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><button id="checkOut-btn" type="button" class="btn btn-primary" data-toggle="modal" data-target="#checkoutModal" data-html2canvas-ignore>Checkout</button></td>`

        cartTable.append(subtotalTr, taxesTr, totalTr, checkoutBtnTr)  
        
        const checkout = document.querySelector("#checkOut-btn")
        checkout.addEventListener("click", manipulateModal)

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




    function placeOrder(e){

        const customerName = e.target.parentElement.previousElementSibling.firstElementChild.customer.value

        const customerAddress = e.target.parentElement.previousElementSibling.firstElementChild.address.value

        if (e.target.innerText == "Place your Order" ) {
            // If a guest is checking out, create a pdf and download then destroy the cart
            
            if (userObj == 0) {
                const receiptTitle = document.querySelector("#receiptTitle")
                receiptTitle.innerHTML = ""
                receiptTitle.innerHTML = `u n i T e e`
                
                const receiptCustomer = document.querySelector("#receiptCustomer")
                receiptCustomer.innerHTML = ""
                receiptCustomer.innerHTML = `<br/>Thank you for your purchase, ${customerName}! 
                <br/>Shipping to: ${customerAddress}`
                
                // receiptCart.prepend(receiptTitle, receiptCustomer)
                const receipt = document.querySelector("#collapseCart")
                
                const opt = {
                    margin: 0.5,
                    filename: 'uniTeeReceipt.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                };
                html2pdf().from(receipt).set(opt).save().then(destroyCart).then(() => {
                    cartObj = 0
                    getCart
                })
            }
                //If user Obj exists then take the items from the cart and create a purchase join
            else 
            {
                // debugger
                formData = {
                    name: customerName,
                    address: customerAddress,
                    user_id: userObj.id
                }
                
                configObj = {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                        "accept" : "application/json"
                    },
                    body: JSON.stringify(formData)
                }
                //moving user's cart items to user's purchased items
                fetch("http://localhost:3000/purchases", configObj)
                .then(res => res.json())
                .then(getCart)

            }

            e.target.parentElement.previousElementSibling.firstElementChild.customer.value = ""
            e.target.parentElement.previousElementSibling.firstElementChild.address.value = ""


        }
        else if (e.target.innerText == "Sign up or Log in") 
        { login(e)}
    } 





    function login(e){

            signIn.innerHTML = ""

            logOutLi = document.querySelector("#logoutLi")
            logOutLi.style.display = 'block'
          

            purchaseLi = document.querySelector("#purchaseHistory")
            purchaseLi.addEventListener("click", getPurchases)
            purchaseLi.style.display = 'block'
            

            let userName = e.target.parentElement.previousElementSibling.firstElementChild.customer.value

            let userAddress = e.target.parentElement.previousElementSibling.firstElementChild.address.value
        // debugger
            formData = {
                name: userName,
                email: userAddress
            }
            
            configObj = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "accept" : "application/json"
                },
                body: JSON.stringify(formData)
            }
    
            fetch("http://localhost:3000/users", configObj)
            .then(res => res.json())
            .then(user => {
                userObj = user
                cartObj = user.cart.id
                e.target.parentElement.previousElementSibling.firstElementChild.customer.value = ""
                e.target.parentElement.previousElementSibling.firstElementChild.address.value = ""
                    }     
                )

    }


    function destroyCart(){
    
        fetch("http://localhost:3000/carts" + `/${cartObj}`, {method: "DELETE"})
        .then(getCart)
        
        
    }

//-----------> Stretch


    signIn = document.querySelector("#sign-in")
    signIn.addEventListener("click", manipulateModal)

    function manipulateModal(e){
        
        title =  document.querySelector(".modal-title")
        address = document.querySelector("#address")
        modalBtnForm = document.querySelector("#placeOrder-btn") 
        backBtn = document.querySelector("#back-btn")
       

        if (e.target.id == "sign-in"){
            title.innerHTML = "Sign up or Log in"
            address.innerHTML = "Email Address"
            modalBtnForm.innerHTML = "Sign up or Log in"
            backBtn.innerHTML = "No, thanks"
        }
        
        else if (e.target.id == "checkOut-btn"){
            title.innerHTML = "Shipping Information"
            address.innerHTML = "Email Address"
            modalBtnForm.innerHTML = "Place your Order"
            backBtn.innerHTML = "Back to Cart"
        }

    }


    const logoutNav = document.querySelector("#logoutNav")
    logoutNav.addEventListener("click", logout)


    function logout(e){
        logOutLi.style.display = 'none'
        purchaseLi.style.display = 'none'
        signIn.innerHTML = "Sign In"
        cartObj = 0
        userObj = 0
        getItems()
    }



    function getPurchases(){
      
        fetch("http://localhost:3000/purchases")
        .then(res => res.json())
        .then(purchases => orderHistory(purchases))
    }

    
    function orderHistory(purchases){
        
        divPurchases = document.createElement("div")
        divPurchases.innerHTML = ""
        divPurchases.id = "divPurchase"
        divPurchases.innerHTML = `<h1>Order History<hr></h1>`
        
        div.innerHTML = ""
        divItemContainer.innerHTML = ""
        
        orders = purchases.filter(p => p.user_id == userObj.id)

        if (orders.length == 0){
            divPurchases.innerHTML = `<h3>Order History<hr></h3>
            <h4>NOTHING!</h4>`
        }
        
        orders.forEach(order =>{

            olDate = document.createElement("ul")
                d = new Date(order.created_at)
                date = (d.getMonth()+1)  + "/" + d.getDate()  + "/" + d.getFullYear()
            olDate.innerHTML = `<strong>Shipped to ${order.name} at ${order.address} on ${date}</strong>`
            

            order.cart_items.forEach(purchasedItem => {
                liPurchased = document.createElement("li")
                liPurchased.id = purchasedItem.id
                num = purchasedItem.quantity
                size = purchasedItem.size
                color = purchasedItem.color
                liPurchased.textContent = `${num} x ${size} ${color}`
                olDate.appendChild(liPurchased)
            })
            divPurchases.appendChild(olDate)
        })
        divItemContainer.appendChild(divPurchases)
        div.appendChild(divItemContainer)


    }


