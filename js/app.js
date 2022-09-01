const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayLoadPhones(data.data, dataLimit)
}
const displayLoadPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ``;
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }

    // display all phones
    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text"></p>
            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv)
        // stop loader
        toggleSpinner(false);

    })
}
const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit)
    // searchField.value = '';
}
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    processSearch(10);
    
})

// search input field enter key handlerconst textbox = document.getElementById("txtSearch");
document.getElementById('search-field').addEventListener("keypress", function(e){
    console.log(e.key)
    if (e.key === "Enter") {
        processSearch(10);
        // document.getElementById("btnSearch").click();
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}
document.getElementById('show-all').addEventListener('click', function(){
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}

const displayPhoneDetail = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.innerHTML = `
        <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'NO release date found'}</p>
        <p>Memory : ${phone.mainFeatures ? phone.mainFeatures.memory : 'NO release date found'}</p>
    `
    
}

loadPhones('apple');

