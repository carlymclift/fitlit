let welcomeTitle = document.querySelector('.welcome');
let userCardName = document.querySelector('.name');
let userAddress = document.querySelector('.address');
let userEmail = document.querySelector('.email');
let userStepGoal = document.querySelector('.user-step-goal');
let averageStepGoal = document.querySelector('.average-step-goal');
let waterIntakeForDay = document.querySelector('.water-intake-for-day');
let avgH2o = document.querySelector('.h2o-avg');
let todayH2o = document.querySelector('.today-h2o');
let weekh2o = document.querySelector('.week-h2o');

let userArray = [];

userData.forEach(user => {
	let currentUser = new User(user);
	userArray.push(currentUser);
})

let randomUser = {};
const currentUserData = new UserRepository(userArray);
let currentHydration = new Hydration(randomUser, hydrationData);
currentHydration.correctHydroData();


let chooseRandom = () => {
	let randomNum = (Math.floor(Math.random() * currentUserData.data.length));
	randomUser = currentUserData.data[randomNum];
}

let updateWelcome = () => {
	userCardName.innerText = `Name: ${randomUser.name}`;
	userAddress.innerText = `Address: ${randomUser.address}`;
	userEmail.innerText = `Email: ${randomUser.email}`;
}

let updateHydration = () => {
	let ouncesForDay = currentHydration.findOuncesForDay('2019/09/22');

	//avgH2o.innerText = `All user's daily average is `;
	todayH2o.innerText = `Your water intake today is ${ouncesForDay} ounces`;
	weekh2o.innerText = `Your past week's water intake: `;
}

let updateSteps = () => {
	userStepGoal.innerText = `Your Step Goal: ${randomUser.dailyStepGoal}`;
	averageStepGoal.innerText = `Average step goal for all users: ${currentUserData.fetchAverageStepGoal()}`
}

let updateOnload = () => {
	chooseRandom();
	welcomeTitle.innerText = `Welcome ${randomUser.name}!`;

	updateWelcome();
	updateSteps();
	updateHydration();
}

window.addEventListener('load', updateOnload);