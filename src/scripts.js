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

const userArray = userData.map((user) => new User(user));
const userRepo = new UserRepository(userArray);
let randomUser = {};
let currentHydration = {};

const chooseRandom = () => {
	const randomNum = (Math.floor(Math.random() * userRepo.data.length));

	randomUser = userRepo.data[randomNum];
	currentHydration = new Hydration(randomUser, hydrationData);
	currentHydration.correctHydroData();	
}

const updateWelcome = (currentUser) => {
	welcomeTitle.innerText = `Welcome ${currentUser.name}!`;
	userCardName.innerText = `Name: ${currentUser.name}`;
	userAddress.innerText = `Address: ${currentUser.address}`;
	userEmail.innerText = `Email: ${currentUser.email}`;
}

const updateHydration = (currentHydro) => {
	const ouncesForDay = currentHydro.findOuncesForDay('2019/09/22');
	const ouncesForWeek = currentHydro.findOuncesForWeek('2019/09/22');
	const avgOunces = currentHydro.findHydrationAverage(hydrationData);

	avgH2o.innerText = `All user's daily average is ${avgOunces}`;
	todayH2o.innerText = `Your water intake today is ${ouncesForDay} ounces`;
	weekh2o.innerHTML = `<p>Your past week's water intake:</p>
						<p>Monday: ${ouncesForWeek[0]} ounces</p>
						<p>Tuesday: ${ouncesForWeek[1]} ounces</p>
						<p>Wednesday: ${ouncesForWeek[2]} ounces</p>
						<p>Thursday: ${ouncesForWeek[3]} ounces</p>
						<p>Friday: ${ouncesForWeek[4]} ounces</p>
						<p>Saturday: ${ouncesForWeek[5]} ounces</p>
						<p>Today: ${ouncesForWeek[6]} ounces</p>`;
}

const updateSteps = () => { //TODO: pass in argument like other fn's
	userStepGoal.innerText = `Your Step Goal: ${randomUser.dailyStepGoal}`;
	averageStepGoal.innerText = 
		`Average step goal for all users: ${userRepo.fetchAverageStepGoal()}`;
}

const updateOnload = () => {
	chooseRandom();
	updateWelcome(randomUser);
	updateHydration(currentHydration);
	updateSteps();
}

window.addEventListener('load', updateOnload);