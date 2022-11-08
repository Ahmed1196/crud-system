
let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let adds = document.getElementById("adds")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")

let mood = "create"
let tmp;

// get total

function gettotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +adds.value)
            - +discount.value;
        total.innerHTML = result
        total.style.backgroundColor = "green"
    } else {
        total.style.backgroundColor = "red"
        total.innerHTML = "";
    }
}

// create product & localstorage

let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
} else {
    datapro = [];
}

// let datapro = [];

submit.onclick = function () {
    newpro = {
        title: title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        adds:adds.value,
        discount:discount.value,
        count:count.value,
        category: category.value.toLowerCase(),
        total:total.innerHTML,
    }

    if (title.value !== "" && price.value !== "" && category.value !== "" &&newpro.count < 100) {
        if (mood === "create") {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro)
                }
            } else {
                datapro.push(newpro)
            }
        } else {
            datapro[tmp] = newpro;
            mood = "create"
            submit.innerHTML = "create"
            count.style.display = "block"
    
        }
        cleardata()
    } 
    




    localStorage.setItem("product",  JSON.stringify(datapro)  )


    showdata()
}

// clear inputs

function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    adds.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}

// read

function showdata() {
    let table = "";

    for (let i = 0; i < datapro.length; i++) [
        table += `
        <tr>
            <td> ${i+1} </td>
            <td> ${datapro[i].title} </td>
            <td> ${datapro[i].price} </td>
            <td> ${datapro[i].taxes} </td>
            <td> ${datapro[i].adds} </td>
            <td> ${datapro[i].discount} </td>
            <td> ${datapro[i].total} </td>
            <td> ${datapro[i].category} </td>
            <td><button onclick="updatedata(${i})" id="update"> update </button></td>
            <td><button onclick=" deletedata( ${i} )" id="delete"> delete </button></td>
        </tr>
        `
    ]

    document.getElementById("tbody").innerHTML = table;

    let btndel = document.getElementById("delall")
    if (datapro.length > 0) {
        btndel.innerHTML = `
        <button onclick="dellall()" > delete all (${datapro.length}) </button>
        `
    } else {
        btndel.innerHTML = "";
    }
    gettotal()
}
showdata()

// delete

function deletedata(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro)
    showdata()
}

// delete all

function dellall() {
    datapro.splice(0)
    localStorage.clear()
    showdata()
}

// update

function updatedata(i) {
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    adds.value = datapro[i].adds
    discount.value = datapro[i].discount
    category.value = datapro[i].category
    gettotal()
    count.style.display = "none"
    submit.innerHTML = "update"
    mood = "update"
    tmp = i
    scroll({
        top: 0,
        behavior:"smooth",
    })
}

// searchmood

let searchmood = "title";

function getsearchmood(id) {
    search = document.getElementById("search")
    if (id === "searchtitle") {
        searchmood = "title";
    } else {
        searchmood = "category"
    }
        search.placeholder = "search by " + searchmood;
        search.focus()
        search.value = "";
        showdata()
}


// search

function searchdata(value) {

    let table = '';
    if (searchmood === "title") {
        
        for (let i = 0; i < datapro.length; i++){
            if (datapro[i].title.includes(value.toLowerCase())) {
                
            table += `
        <tr>
            <td> ${i} </td>
            <td> ${datapro[i].title} </td>
            <td> ${datapro[i].price} </td>
            <td> ${datapro[i].taxes} </td>
            <td> ${datapro[i].adds} </td>
            <td> ${datapro[i].discount} </td>
            <td> ${datapro[i].total} </td>
            <td> ${datapro[i].category} </td>
            <td><button onclick="updatedata(${i})" id="update"> update </button></td>
            <td><button onclick=" deletedata( ${i} )" id="delete"> delete </button></td>
        </tr>
        `

            }
        }

    } else {
        for (let i = 0; i < datapro.length; i++){
            if (datapro[i].category.includes(value.toLowerCase())) {
                
               table += `
        <tr>
            <td> ${i} </td>
            <td> ${datapro[i].title} </td>
            <td> ${datapro[i].price} </td>
            <td> ${datapro[i].taxes} </td>
            <td> ${datapro[i].adds} </td>
            <td> ${datapro[i].discount} </td>
            <td> ${datapro[i].total} </td>
            <td> ${datapro[i].category} </td>
            <td><button onclick="updatedata(${i})" id="update"> update </button></td>
            <td><button onclick=" deletedata( ${i} )" id="delete"> delete </button></td>
        </tr>
        `

            }
        }

    }
    document.getElementById("tbody").innerHTML = table;
}




//*************************************************************************** */

// check if there is color option in local storage
let maincolors = localStorage.getItem("color_option");

if (maincolors !== null) {
    
    // get color from localstorage to body
    document.documentElement.style.setProperty('--main-color', maincolors);

    // check for active class
     // remove active class from all colors items
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

    // add active class on element widt data color === localstorage item
        if (element.dataset.color === maincolors) {
        element.classList.add("active")
    }

    });

    


} 




// toggle spin class on icon

document.querySelector(".toggle-settings .fa-gear").onclick = function () {

    // routate
    // this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open");


}


// swith colors

const colorsli = document.querySelectorAll(".colors-list li");

// loop on all li 
colorsli.forEach(li => {
    
    //click on every li
    li.addEventListener("click", (e) => {

        // set color on root 
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        // set color on localstorage
        localStorage.setItem("color_option", e.target.dataset.color);


        // remove active class from all children
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });

        //add active class on target 
        e.target.classList.add("active")

    })

})





