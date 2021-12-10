var account = document.querySelector(".account-list");
document.querySelector(".account-btn").onclick = (e) => {
    e.preventDefault();
    account.classList.toggle("active");
    searchForm.classList.remove("active");
};
var searchForm = document.querySelector(".search");
document.querySelector("#search-btn").onclick = () => {
    searchForm.classList.toggle("active");
    account.classList.remove("active");
};
// window.onscroll = () => {
//     searchForm.classList.remove("active");
//     account.classList.remove("active");
// };