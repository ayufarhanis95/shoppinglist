// to create input and link to the ul
// link to firebase database

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-6317a-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingListApp")
const addBtn = document.getElementById("addcart")
const inputEl = document.getElementById("shopping-item")
const shoppingListEl = document.getElementById("shopping-list")

// what to do after add cart button has been clicked
addBtn.addEventListener("click", function() {
    let inputValue = inputEl.value
    push(shoppingListInDB,inputValue)
    inputEl.value = ""
})

// obtaining information from database to be inside the shopping list
onValue(shoppingListInDB,function(snapshot){
    

    if (snapshot.exists()) {
        let shoppingArray = Object.entries(snapshot.val())
        shoppingListEl.innerHTML = ""
        // put the <li>array[0]<li> into the <ul>
        for (let i = 0; i < shoppingArray.length; i++) {
            // shoppingListEl.innerHTML += `<li>${shoppingArray[i]}</li>`
            // replaced by adding another function that can be deleted after clicked
            let currentItem = shoppingArray[i]
            appendItemToShoppingList(currentItem)
        } 
    } else {
        shoppingListEl.innerHTML = "No items here ... yet"
    }
    
 

} )

// deleting the list after being clicked
function appendItemToShoppingList(item) {
    let itemId = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li") //creates a <li></li> element
    newEl.textContent = itemValue //adding item inside the element

    newEl.addEventListener("click", function(){
        let exactLocationOfShoppingListInDB = ref(database,`shoppingListApp/${itemId}`)

        remove(exactLocationOfShoppingListInDB)
    })
    shoppingListEl.append(newEl) //adding the new element into the ul
}



