const block_form = document.querySelector("form");
const block_message = document.querySelector("#block_message");
const btn_submit = document.querySelector("#btn_submit");

btn_submit.addEventListener("click", (e) => {
    e.preventDefault();
    block_form.style.display = "none";
    block_message.innerText = "soumis !"
})