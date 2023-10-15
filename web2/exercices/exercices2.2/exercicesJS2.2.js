const compteur = document.querySelector("#compteur");
const message = document.querySelector("#message");
const btn_click = document.querySelector("#btn_click");
let c = 0;
btn_click.addEventListener("click", () => {
    c++;
    compteur.innerText = c;

    if(c >= 5 && c <= 9) 
        message.innerText = "Bravo, bel échauffement !";
    if(c >= 10)
        message.innerText = "Vous êtes passé maître en l'art du clic !";    
})