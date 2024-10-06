// Get the Sign In, Sign Up, buttons, forms, and container elements
const signInBtn = document.getElementById("signIn"); 
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1"); // Sign-Up form
const secondForm = document.getElementById("form2"); // Sign-In form
const container = document.querySelector(".container");

// When sign in button is clicked, remove the 'right-panel-active' class to show sign in form
signInBtn.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});

// When sign up button is clicked, add the 'right-panel-active' class to show sign up form
signUpBtn.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});

// 
fistForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e) => e.preventDefault());