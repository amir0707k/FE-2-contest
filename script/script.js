document.addEventListener('DOMContentLoaded', () => {
let req = {
    method: 'GET',
    headers: {
        'Content-type' : 'application/json'
    },
    mode: 'cors',
    cache: 'default'
};


let arr;

function retriveData(data) {
    arr = data;
    pushGridContent(); 
    pushListContent(); 
}

let p = fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en");
p.then((response1) =>{
    console.log(response1);
    if (!response1.ok) {
        throw new Error('Network response was not ok');
    }
    return response1.json();
    
}).then((response2)=>{
    console.log(response2);
    retriveData(response2);
})
p.catch((err)=>{
    console.log(err);
});

const listElement = document.querySelector('.list-title');
const gridElement = document.querySelector('.grid-title');
const gridID = document.getElementById('grid');
const listID = document.getElementById('list');
const gridDiv = document.getElementById('grid-div');
const listDiv = document.getElementById('list-div');

const grid = document.querySelector('.grid-view');
const list = document.querySelector('.list-view');

listID.style.display = 'none';

listElement.addEventListener('click',listView);
gridElement.addEventListener('click', gridView);


pushGridContent();
function listView(){
    listElement.classList.add('grid-list-title');
    listDiv.classList.add('blue-bar');
    gridDiv.classList.remove('blue-bar');
    gridElement.classList.remove('grid-list-title');
    gridID.style.display = 'none';
    listID.style.display = 'block';
    

}
function gridView(){
    gridElement.classList.add('grid-list-title');
    gridDiv.classList.add('blue-bar');
    listDiv.classList.remove('blue-bar');
    listElement.classList.remove('grid-list-title');
    listID.style.display = 'none';
    gridID.style.display = 'block';
}


function pushGridContent(){
    arr.forEach(element => {
        const container = document.createElement('div');
        let str = `
        <div class="icon"><img class="card-img" src="${element.image}" alt="${element.name}"></div>
        `
        container.innerHTML = str;
        grid.appendChild(container);

        const price = document.getElementById(`${element.id}`);
        const change = document.getElementById(`${element.name}`);
        if(element.price_change_percentage_24h < 0){
            change.style.border = "2px solid red";
            price.style.color = "red";
        }
    });
}

function pushListContent(){
    const table = document.createElement('table');
    list.appendChild(table);
    arr.forEach(element => {
        const row = document.createElement('tr');
        let str = `<td> 
                    <div class="crypto-info ">
                        <div class="icon"><img class="card-img" src="${element.image}" alt="${element.name}"></div>
                        <div class="short-name">${element.symbol}</div>
                        <div class="full-name">${element.name}</div>
                    </div>
                </td>
                <td> 
                    <div class="capsule" id="${element.market_cap_rank}">
                        <div class="percentage">${element.price_change_percentage_24h}</div>
                    </div>
                </td>
                <td>
                    <div class="current-price" id="${element.symbol}">₹  ${element.current_price}</div>
                </td>
                <td>
                    <div class="total-volume">${element.total_volume.toLocaleString()}</div>
                </td>
                <td>
                    <div class="market-cap">${element.market_cap.toLocaleString()}</div>
                </td>`
                row.innerHTML = str;
                table.appendChild(row);
                const list_price = document.getElementById(`${element.symbol}`);
                const list_change = document.getElementById(`${element.market_cap_rank}`);
                if(element.price_change_percentage_24h < 0){
                    list_change.style.border = "2px solid red";
                    list_price.style.color = "red";
                }
    });
}
});
