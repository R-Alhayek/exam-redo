`use strict`;

let myForm = document.getElementById('myForm');
let myTable = document.getElementById('myTable');
let tableHead = document.getElementById('tableHead');
let tableBody = document.getElementById('tableBody');

let list = [];

function Order(userName, foodType) {
    this.userName = userName;
    this.foodType = foodType;
    this.foodImg = `images/${foodType}.jpg`;

    
    list.push(this);
    settingItems ();
}
function randomPrice() {
    return Math.floor(Math.random() * (20 - 2 + 1) + 2);

}

function settingItems (){
    let data = JSON.stringify(list);
    localStorage.setItem('food', data);
}

function gettinItem(){
    let stringObj = localStorage.getItem('food');
    let normalObj = JSON.parse(stringObj);

    if(normalObj !== null){
        list =  normalObj;
    }
    render();
}

function handelSubmit(event) {
    event.preventDefault();
    let userName = event.target.userName.value;
    let foodType = event.target.foodType.value;
    new Order(userName, foodType);
    render();
}

function render() {
    tableBody.textContent = '';

    for (let i = 0; i < list.length; i++) {
        let trEl = document.createElement('tr');
        tableBody.appendChild(trEl);

        let tdEl1 = document.createElement('td');
        trEl.appendChild(tdEl1);
        let imageEl = document.createElement('img');
        tdEl1.appendChild(imageEl);
        imageEl.setAttribute('src', `${list[i].foodImg}`);

        let tdEl2 = document.createElement('td');
        trEl.appendChild(tdEl2);
        tdEl2.textContent= `Customer Name:${list[i].userName}`+` \b `+`Food Type:${list[i].foodType}`+` \b `+` Food Price:${randomPrice()}`;

    }


}



gettinItem();
myForm.addEventListener('submit', handelSubmit);

let removeItems = document.getElementById('removeItems');

function removeOrders(){
    localStorage.removeItem('food');
    window.location.reload();

}