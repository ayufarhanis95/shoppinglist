// to create input and link to the ul
// link to firebase database

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    let shoppingArray = Object.values(snapshot.val())
    shoppingListEl.innerHTML = ""
    // put the <li>array[0]<li> into the <ul>
    for (let i = 0; i < shoppingArray.length; i++) {
        shoppingListEl.innerHTML += `<li>${shoppingArray[i]}</li>`
    }
 

} )

// deleting the list after being clicked



