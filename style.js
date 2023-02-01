const textarea = document.querySelector("textarea");
textarea.addEventListener("keyup", (e) => {
    textarea.style.height = "23px";
    let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;
});
