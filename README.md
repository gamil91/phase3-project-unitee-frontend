# Unitee - frontend

## Background

This website was my very first solo project since I started learning how to code just a little over 3 months ago. The idea sparked from a conversation I had with a good friend, Bri who has been influential to me taking this big leap of career change. The conversation was random and it was about how we both like pocket tees but there’s not much options out there. She has a couple of side businesses.  So I joked and said "Maybe when I finish school I’ll build her website for a pocket tee business.” So when I was ideating, I remembered that conversation and thought to myself, “I’m not done with school, but I think I can already do it.”


## Screenshots

#### Home Page
![Home Page](https://github.com/gamil91/phase3-project-unitee-frontend/blob/main/src/images/home.png)

#### Item Page
![Item Page](https://github.com/gamil91/phase3-project-unitee-frontend/blob/main/src/images/item.png)

#### View Cart
![Cart](https://github.com/gamil91/phase3-project-unitee-frontend/blob/main/src/images/viewCart.png)

#### Guest Checkout Receipt
![Receipt](https://github.com/gamil91/phase3-project-unitee-frontend/blob/main/src/images/receiptPdf.png)

#### User Order History
![UserOrderHistory](https://github.com/gamil91/phase3-project-unitee-frontend/blob/main/src/images/userOrderHistory.png)

## Technology Used

- Ruby on Rails
- Javascript
- CSS
- HTML
- html2pdf

## Features & Highlights

- Create and Destroy Cart
- Cread, Read, Update, and Delete Cart Items
- Read Items and Read Items' Color and Images
- Create and Read User
- Create, Read, and Update Purchases

- A user/guest can sort by color and items on clearance
- A user/guest can browse through all items and view each item
- A user/guest can sort by color and items on clearance
- A user/guest can add item(s) to the cart
- A user/guest can modify the quantity of the items as well as remove them from the cart
- A user/guest can checkout the cart by filling up the shipping form 
- Since nothing is persisted to database when guest checks out cart, a pdf of the receipt is automatically downloaded to the computer
- a user/guest can opt to sign up 
- User can checkout the cart and for every order a user purchases, it is persisted to the user's purchase history.


## Installation

- Clone this repo (https://github.com/gamil91/phase3-project-unitee-frontend)
- In the frontend repo, run open index.html (this will not render anything until the server is up on the backend)

- Clone the backend repo (https://github.com/gamil91/phase3-project-unitee-backend-again)
- Run bundle install
- Run rails db:migrate
- Run rails db:seed
- In the backend repo, run rails s to open your server
- You'll know when the server is up and running when you see "Listening on tcp://[::1]:3000" or go to "http://localhost:3000/"


