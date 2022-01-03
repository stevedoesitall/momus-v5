const favoriteButtons: NodeListOf<Element> =
  document.querySelectorAll(".favorite-btn");

favoriteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log(e.target);
  });
});
