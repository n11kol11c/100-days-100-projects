
let menuToggle = document.querySelector(".toggle");
let menu = document.querySelector(".menu");
menuToggle.onclick = function () {
  menu.classList.toggle("active");
  menuToggle.classList.toggle("active");
};
let list = document.querySelectorAll(".menu li");
function activeLink() {
  list.forEach((item) => {
    item.classList.remove("active");
    this.classList.add("active");
  });
}
list.forEach((item) => {
  item.addEventListener("click", activeLink);
});

