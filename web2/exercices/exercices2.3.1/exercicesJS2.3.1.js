const divs = document.querySelectorAll(".div");
let i = 1;

divs.forEach((div) => {
	div.innerText = "div " + i++;
  div.addEventListener("click", () => {
  	div.classList.add("changement");
  })
})