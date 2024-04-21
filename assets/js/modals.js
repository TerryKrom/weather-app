let modal = document.getElementById("modal");
let modalContent = document.querySelector('.modal-content');
let addBtn = document.getElementById('add-btn');
let input = document.getElementById("city-input");
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
    let inputValue = input.value;
    if (inputValue.length != 0) {
        closeModal();
        getInfo(inputValue);
    }
}

let searchBtn = document.getElementById('search-btn')
searchBtn.addEventListener("click", searchByInput);

input.addEventListener('keydown', (e) => {
    if(e.code === 'Enter'){
        searchByInput()
    }
})
addBtn.addEventListener("click", openModal);