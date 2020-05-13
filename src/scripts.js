let welcomeTitle = document.querySelector('.welcome');
let userCardName = document.querySelector('.name');
let userAddress = document.querySelector('.address');
let userEmail = document.querySelector('.email');
let userStepGoal = document.querySelector('.user-step-goal');
let averageStepGoal = document.querySelector('.average-step-goal');

let userArray = [];


userData.forEach(user => {
	let currentUser = new User(user);
	userArray.push(currentUser);
})

const currentUserData = new UserRepository(userArray);
let userRepo = new UserRepository(userArray);
let randomUser = {};


let chooseRandom = () => {
	let randomNum = (Math.floor(Math.random() * currentUserData.data.length));
	randomUser = currentUserData.data[randomNum];
}

let changeWelcome = () => {
	chooseRandom();
	welcomeTitle.innerText = `Welcome ${randomUser.name}!`;
	userCardName.innerText = `Name: ${randomUser.name}`;
	userAddress.innerText = `Address: ${randomUser.address}`;
	userEmail.innerText = `Email: ${randomUser.email}`;
	userStepGoal.innerText = `Your Step Goal: ${randomUser.dailyStepGoal}`;
	averageStepGoal.innerText = `Average Step Goal ${userRepo.fetchAverageStepGoal()}`
}

window.addEventListener('load', changeWelcome);