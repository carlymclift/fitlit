/* eslint-disable no-undef */
let welcomeTitle = document.querySelector('.welcome');
let userCardName = document.querySelector('.name');
let userAddress = document.querySelector('.address');
let userEmail = document.querySelector('.email');
let userStepGoal = document.querySelector('.user-step-goal');
let averageStepGoal = document.querySelector('.average-step-goal');
let avgH2o = document.querySelector('.h2o-avg');
let todayH2o = document.querySelector('.today-h2o');
let weekh2o = document.querySelector('.week-h2o');

let userArray = [];
let randomUser = {};
let currentHydration = {};
const userRepo = new UserRepository(userArray);

userData.forEach(user => { // TODO: use map prototype
	let currentUser = new User(user);
	userArray.push(currentUser);
})

const chooseRandom = () => {
	const randomNum = (Math.floor(Math.random() * userRepo.data.length));
	randomUser = userRepo.data[randomNum];
	
	const newHydration = new Hydration(randomUser, hydrationData)
	
	newHydration.correctHydroData();
	console.log("after hydration", newHydration)
	
	//currentHydration = newHydration;
	// console.log("USER", randomUser)
	
	updateHydration(newHydration);
}

// let currentHydration = new Hydration(randomUser, hydrationData);

const updateWelcome = (currentUser) => {
	userCardName.innerText = `Name: ${currentUser.name}`;
	userAddress.innerText = `Address: ${currentUser.address}`;
	userEmail.innerText = `Email: ${currentUser.email}`;
}

const updateHydration = (hydrationData) => {
	let ouncesForDay = hydrationData.findOuncesForDay('2019/09/22');
	console.log('OUNCES :', hydrationData.findOuncesForDay)
	//avgH2o.innerText = `All user's daily average is `;
	todayH2o.innerText = `Your water intake today is ${ouncesForDay}`;
	weekh2o.innerText = `Your past week's water intake: `;
}

const updateSteps = () => {
	userStepGoal.innerText = `Your Step Goal: ${randomUser.dailyStepGoal}`;
	averageStepGoal.innerText = `Average step goal for all users: ${userRepo.fetchAverageStepGoal()}`
}

const updateOnload = () => {
	chooseRandom();
	welcomeTitle.innerText = `Welcome ${randomUser.name}!`;
	updateWelcome(randomUser);
	updateSteps();
	// updateHydration();
}

window.addEventListener('load', updateOnload);