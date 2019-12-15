const nameForm = document.querySelector(".js-nameForm");
const greetingWords = document.querySelector(".js-greeting .greeting__words");
const greetingName = document.querySelector(".js-greeting .greeting__name");

function greeting() {
  const currentHours = new Date().getHours();
  if (currentHours >= 5 && currentHours < 12) {
    greetingWords.innerText = "Good morning, ";
  } else if (currentHours >= 12 && currentHours < 18) {
    greetingWords.innerText = "Good afternoon, ";
  } else {
    greetingWords.innerText = "Good evening, ";
  }
  const name = localStorage.getItem("username");
  greetingName.innerText = name + ".";
}

nameForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const nameInput = nameForm.querySelector("input");
  localStorage.setItem("username", nameInput.value);
  nameInput.value = "";
  greeting();
  changePage();
});

function init() {
  greeting();
}

init();
