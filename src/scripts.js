/* eslint-disable no-undef */
let welcomeTitle = document.querySelector('.welcome');
let userCardName = document.querySelector('.name');
let userAddress = document.querySelector('.address');
let userEmail = document.querySelector('.email');
let h2o = document.querySelector('.h2o');
let userMiles = document.querySelector('.miles-walked');
let userMinAct = document.querySelector('.min-active');
let userSteps = document.querySelector('.steps');
let userStairs = document.querySelector('.stairs');

const userArray = userData.map((user) => new User(user));
const userRepo = new UserRepository(userArray);
let randomUser = {};
let currentHydration = {};
let currentActivity = {};

const chooseRandom = () => {
	const randomNum = (Math.floor(Math.random() * userRepo.data.length));
	
	randomUser = userRepo.data[randomNum];
	currentHydration = new Hydration(randomUser, hydrationData);
	currentHydration.correctHydroData();
	currentActivity = new Activity(randomUser, activityData);
	currentActivity.correctActData();
}

const updateWelcome = (currentUser) => {
	welcomeTitle.innerText = `Hello ${currentUser.findName()}!`;
	userCardName.innerText = `Name: ${currentUser.name}`;
	userAddress.innerText = `Address: ${currentUser.address}`;
	userEmail.innerText = `Email: ${currentUser.email}`;
}

const updateHydration = (currentHydro) => {
	const ouncesForDay = currentHydro.findOuncesForDay('2019/09/22');
	const ouncesForWeek = currentHydro.findOuncesForWeek('2019/09/22');
	const avgOunces = currentHydro.findHydrationAverage(hydrationData);

	h2o.innerHTML = `
		<p>All user's average water intake is ${avgOunces} ounces per day.</br></br>
		Your water intake today was ${ouncesForDay} ounces</br></br>
		Your past week's water intake:</br></br>
		Saturday: ${ouncesForWeek[5]} ounces</br></br>
		Friday: ${ouncesForWeek[4]} ounces</br></br>
		Thursday: ${ouncesForWeek[3]} ounces</br></br>
		Wednesday: ${ouncesForWeek[2]} ounces</br></br>
		Tuesday: ${ouncesForWeek[1]} ounces</br></br>
		Monday: ${ouncesForWeek[0]} ounces
		`;
}

const updateMiles = (currentAct) => {
	const todayMiles = currentAct.milesWalk('2019/09/22');
	const weekMiles = currentAct.weekMilesWalked('2019/09/22');

	userMiles.innerHTML = `
		<p>Today you walked ${todayMiles} miles.</br></br>
		In the past week you've walked:</br></br>
		Saturday: ${weekMiles[5]} miles.</br></br>
		Friday: ${weekMiles[4]} miles.</br></br>
		Thursday: ${weekMiles[3]} miles.</br></br>
		Wednesday: ${weekMiles[2]} miles.</br></br>
		Tuesday: ${weekMiles[1]} miles.</br></br>
		Monday: ${weekMiles[0]} miles.
		`;
}

const updateMinAct = (currentAct) => {
	const todayMin = currentAct.minActive('2019/09/22');
	const weekMin = currentAct.weekMinActive('2019/09/22');
	const allUserTodayMin = currentAct.allUserMinActive(activityData, '2019/09/22');

	userMinAct.innerHTML = `
		<p>Today you were active for ${todayMin} minutes.</br></br>
		Today's average minutes active for all users was ${allUserTodayMin} minutes.</br></br>
		Your past week's activity:</br></br>
		Saturday: ${weekMin[5]} minutes.</br></br>
		Friday: ${weekMin[4]} minutes.</br></br>
		Thursday: ${weekMin[3]} minutes.</br></br>
		Wednesday: ${weekMin[2]} minutes.</br></br>
		Tuesday: ${weekMin[1]} minutes.</br></br>
		Monday: ${weekMin[0]} minutes.</br></br>
		`;
}

const updateSteps = (currentAct) => {
	const todaySteps = currentAct.stepGoalResult('2019/09/22');
	const goalDays = currentAct.daysGoalAchieved();
	const allUserTodaySteps = currentAct.allUserSteps(activityData, '2019/09/22');

	userSteps.innerHTML = `
		<p>You're daily step goal is ${randomUser.dailyStepGoal} steps.</br></br>
		${todaySteps}</br></br>
		Today's average steps for all users was ${allUserTodaySteps} steps.
		`;
		//<p>Here's the past log for all the days you achieved your step goal: ${goalDays}</p>
}

const updateStairs = (currentAct) => {
	const stairRecord = currentAct.stairRecord();
	const allUserStairs = currentAct.allUserStairsClimbed(activityData, '2019/09/22');

	userStairs.innerHTML = `
		<p>${stairRecord}</br></br>
		Today's average flights of stairs climbed for all users was ${allUserStairs} flights.
		`;
}

const updateOnload = () => {
	chooseRandom();
	updateWelcome(randomUser);
	updateHydration(currentHydration);
	updateMiles(currentActivity);
	updateMinAct(currentActivity);
	updateSteps(currentActivity);
	updateStairs(currentActivity);
}

window.addEventListener('load', updateOnload);