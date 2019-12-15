function changePage() {
  const screenPage = document.querySelector(".screen");
  const mainPage = document.querySelector(".main");
  if (localStorage.getItem("username") !== null) {
    screenPage.style.display = "none";
    mainPage.style.display = "block";
  } else {
    screenPage.style.display = "block";
    mainPage.style.display = "none";
  }
}

function init() {
  changePage();
}

init();
