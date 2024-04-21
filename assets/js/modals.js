let modal = document.getElementById("modal");
let modalContent = document.querySelector('.modal-content');
let addBtn = document.getElementById('add-btn');

const openModal = () => {
    modalContent.style.animation = 'appear 0.3s linear';
    modal.style.display = "block";
};


const closeModal = () => {
    modalContent.style.animation = 'disapear 0.3s linear';
    setTimeout(() => {
        modal.style.display = "none";
    }, 200)
};

const searchByInput = () => {
    let inputValue = document.getElementById("city-input").value;
    if (inputValue.length != 0) {
        closeModal();
        getInfo(inputValue);
    }
}

let searchBtn = document.getElementById('search-btn')
searchBtn.addEventListener("click", searchByInput);

addBtn.addEventListener("click", openModal);