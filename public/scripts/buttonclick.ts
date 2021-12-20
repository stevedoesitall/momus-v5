const submitButton: HTMLElement | null = document.querySelector("#submit");

submitButton?.addEventListener("click", () => {
	alert("hi!");
});

export default submitButton;