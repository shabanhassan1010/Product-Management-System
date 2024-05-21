// get total , create product , save localstorage , clear inputs , read , count , delete , update , search , clean data

let title = document.getElementById('title'); 
let price = document.getElementById('price'); 
let taxes = document.getElementById('taxes'); 
let ads = document.getElementById('ads'); 
let discount = document.getElementById('discount'); 
let total = document.getElementById('total'); 
let count = document.getElementById('count');
let Category = document.getElementById('Category'); 
let submit = document.getElementById('submit'); 


let mood = 'Create';
let temp;

// Get Total 
function getTotal()
{
    if(price.value != ''){
        let res = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = res;
        total.style.background = '#040'
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02'
    } }

// Create Product 
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}


// with this function i can create anew product
submit.onclick = function(){
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        Category: Category.value.toLowerCase(),   
    };

    if(mood === 'Create'){
        if(newpro.count > 1){
            for(let i = 0 ; i < newpro.count ; i++){
                dataPro.push(newpro); // in this line i add only one product
            }
        }else{
            dataPro.push(newpro); // in this line i add only one product
        }
    }else{
        dataPro[temp] = newpro ;
        mood = 'Create'
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }

    // save localStorage   
    localStorage.setItem('product' , JSON.stringify(dataPro));
    clearData();
    showData();
};


// Clear Inputs 
// this function will be started when i click in (submit button)
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    count.value = '';
    discount.value = '';
    total.innerHTML='';
    Category.value ='';
}


// Read Inputs
function showData(){
    getTotal();
    let table = '';
    for(let i = 0 ; i < dataPro.length ; i++){
       table += `
       <tr>
       <td>${i}</td>
       <td>${dataPro[i].title}</td>
       <td>${dataPro[i].price}</td>
       <td>${dataPro[i].taxes}</td>
       <td>${dataPro[i].ads}</td>
       <td>${dataPro[i].discount}</td>
       <td>${dataPro[i].total}</td>
       <td>${dataPro[i].Category}</td> 
       <td> <button id="Update" onclick="updateData(${i})" > Update </button> </td> 
       <td> <button id="Delete" onclick="deleteData(${i})" > Delete  </button> </td> 
   </tr>     
   `
    }
    document.getElementById('tbody').innerHTML= table;
    let btnDelete = document.getElementById('deleteAllData');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <td> 
        <button  onclick="deleteAllData()"> Delete All(${dataPro.length}) </button> 
        </td> 
       `
    }else{
        btnDelete.innerHTML = '';
    }
}
showData();


// Delete Data
function deleteData(i){
   dataPro.splice(i , 1);
   localStorage.product = JSON.stringify(dataPro);
   showData();
};


// DeleteALL Data
function deleteAllData(){ 
    localStorage.clear();
    dataPro.splice(0);
    showData();
};


// Update Data 
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    Category.value = dataPro[i].Category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML =  'Update';
    mood = 'Update';
    temp =  i ; 
    scroll({
        top: 0 ,
        behavior: "smooth"
    })
}

// search for Data
let searchMood = 'title';
function getSearchMood(id)
{
    console.log(id)
    let search = document.getElementById('search');
    
    if(id == 'searchTitle'){
      searchMood = 'title';
    }else{
      searchMood = 'Category';
    }
    search.Placeholder = 'Search By' + searchMood;
    search.focus();
    search.value = '';
    showData();
}
   
function searchData(value){
 let table = '';
    if(searchMood == 'title')
    {
        for(let i = 0 ; i < dataPro.length ; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].Category}</td> 
                <td> <button id="Update" onclick="updateData(${i})" > Update </button> </td> 
                <td> <button id="Delete" onclick="deleteData(${i})" > Delete  </button> </td> 
            </tr>     
            `
            }
        }

    }
    else{
        for(let i = 0 ; i < dataPro.length ; i++){
            if(dataPro[i].Category.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].Category}</td> 
                <td> <button id="Update" onclick="updateData(${i})" > Update </button> </td> 
                <td> <button id="Delete" onclick="deleteData(${i})" > Delete  </button> </td> 
            </tr>     
            `
            }
        }
    }
    document.getElementById('tbody').innerHTML= table;
}



































