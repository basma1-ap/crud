var nameInput=document.getElementById('itemNameInput');
var priceInput=document.getElementById('itemPriceInput');
var quantityInput=document.getElementById('itemQuantityInput');
var feedbackInput=document.getElementById('itemFeedbackInput');
var searchInput=document.getElementById('searchInput');
var itemsContainer=[];
var addBtn=document.getElementById('addBtn');
var updateBtn=document.getElementById('updateBtn');
var indexUpdate=0;

if(localStorage.getItem('items')!=null){

itemsContainer=JSON.parse(localStorage.getItem('items'));
displayItems();
}




function addItem(){
    var item={
        name:nameInput.value,
        price:priceInput.value,
        quantity:quantityInput.value,
        feedback:feedbackInput.value
    }
    itemsContainer.push(item);
    localStorage.setItem('items',JSON.stringify(itemsContainer) )
    clearForm();
    displayItems()

    console.log(item);
}

function clearForm(){

    nameInput.value='';
    priceInput.value='';
    quantityInput.value='';
    feedbackInput.value='';
}

function displayItems(){
    var cartona='';
    for(var i=0; i<itemsContainer.length;i++){

        cartona+=`<tr>
        <td>${i}</td>
        <td>${itemsContainer[i].name}</td>
        <td>${itemsContainer[i].price}</td>
        <td>${itemsContainer[i].quantity}</td>
        <td>${itemsContainer[i].feedback}</td>
        <td>
            <button onclick='deleteItem(${i})' class="btn btn-danger btn-sm">delete</button>
            <button onclick='setData(${i});' class="btn btn-info btn-sm">update</button>
        </td>
        </tr>`

    }
    
    document.getElementById('tableBody').innerHTML=cartona;
}

function deleteItem(index){
    itemsContainer.splice(index,1);
    localStorage.setItem('items',JSON.stringify(itemsContainer))
    displayItems();
}


function sreachitem(){
    var term=searchInput.value;

    var cartona='';
    for(var i=0; i<itemsContainer.length;i++){

        if(itemsContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            cartona+=`<tr>
            <td>${i}</td>
            <td>${itemsContainer[i].name}</td>
            <td>${itemsContainer[i].price}</td>
            <td>${itemsContainer[i].quantity}</td>
            <td>${itemsContainer[i].feedback}</td>
            <td>
                <button onclick='deleteItem(${i})' class="btn btn-danger btn-sm">delete</button>
                <button class="btn btn-info btn-sm" >update</button>
            </td>
            </tr>`

        }
    }
    
    document.getElementById('tableBody').innerHTML=cartona;

}

function setData(index){
    var currentElement=itemsContainer[index];

    indexUpdate=index;
    nameInput.value=currentElement.name;
    priceInput.value=currentElement.price;
    quantityInput.value=currentElement.quantity;
    feedbackInput.value=currentElement.feedback;

    updateBtn.classList.remove('d-none');
    addBtn.classList.add('d-none')
}

function updateItems(){

    var item={
        name:nameInput.value,
        price:priceInput.value,
        quantity:quantityInput.value,
        feedback:feedbackInput.value
    }
    itemsContainer.splice(indexUpdate,1,item);
    displayItems()

    updateBtn.classList.add('d-none');
    addBtn.classList.remove('d-none');
    clearForm()
}
