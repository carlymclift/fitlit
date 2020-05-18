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
let userSleepTime = document.querySelector('.sleep-time');
let userSleepQuality = document.querySelector('.sleep-quality');

const userArray = userData.map((user) => new User(user));
const userRepo = new UserRepository(userArray);
let randomUser = {};
let currentHydration = {};
let currentActivity = {};
let currentSleep = {};

const chooseRandom = () => {
	const randomNum = (Math.floor(Math.random() * userRepo.data.length));
	
	randomUser = userRepo.data[randomNum];
	currentHydration = new Hydration(randomUser, hydrationData);
	currentHydration.correctHydroData();
	currentActivity = new Activity(randomUser, activityData);
	currentActivity.correctActData();
	currentSleep = new Sleep(randomUser, sleepData);
	currentSleep.correctSleepData();
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
		<p>Today's all FitLit user's water intake averaged at ${avgOunces} ounces.</br></br>
		Today you drank ${ouncesForDay} ounces of water.</br></br>
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
		Saturday: ${weekMiles[5]} miles</br></br>
		Friday: ${weekMiles[4]} miles</br></br>
		Thursday: ${weekMiles[3]} miles</br></br>
		Wednesday: ${weekMiles[2]} miles</br></br>
		Tuesday: ${weekMiles[1]} miles</br></br>
		Monday: ${weekMiles[0]} miles
		`;
}

const updateMinAct = (currentAct) => {
	const todayMin = currentAct.minActive('2019/09/22');
	const weekMin = currentAct.weekMinActive('2019/09/22');
	const allUserTodayMin = currentAct.allUserMinActive(activityData, '2019/09/22');

	userMinAct.innerHTML = `
		<p>Today you were active for ${todayMin} minutes.</br></br>
		Today's all FitLit user's were active for an average of ${allUserTodayMin} minutes.</br></br>
		Your past week's activity:</br></br>
		Saturday: ${weekMin[5]} minutes</br></br>
		Friday: ${weekMin[4]} minutes</br></br>
		Thursday: ${weekMin[3]} minutes</br></br>
		Wednesday: ${weekMin[2]} minutes</br></br>
		Tuesday: ${weekMin[1]} minutes</br></br>
		Monday: ${weekMin[0]} minutes
		`;
}

const updateSteps = (currentAct) => {
	const todaySteps = currentAct.stepGoalResult('2019/09/22');
	const goalDays = currentAct.daysGoalAchieved();
	const allUserTodaySteps = currentAct.allUserSteps(activityData, '2019/09/22');

	userSteps.innerHTML = `
		<p>Your daily step goal is ${randomUser.dailyStepGoal} steps.</br></br>
		${todaySteps}</br></br>
		Past log for all the days you achieved your step goal:</br></br>
		<ul>${goalDaysToList(goalDays)}</ul>
		Today all FitLit user's averaged ${allUserTodaySteps} steps.
		`;
}

const goalDaysToList = (goalDays) => goalDays
	.map(day => `<li>${day}</li>`).join('');

const updateStairs = (currentAct) => {
	const stairRecord = currentAct.stairRecord();
	const allUserStairs = currentAct.allUserStairsClimbed(activityData, '2019/09/22');

	userStairs.innerHTML = `
		<p>${stairRecord}</br></br>
		Today all FitLit user's averaged ${allUserStairs} flights climbed.
		`;
}

const updateSleepTime = (currSleep) => {
	const todaySleep = currSleep.findUserSleepForDay('2019/09/22');
	const weekSleep = currSleep.findUserSleepForWeek('2019/09/22');
	const avSleep = currSleep.findUserAverageSleep(sleepData);
	const mostSleep = currSleep.findSleepiest(sleepData, '2019/09/22', userRepo);
	const avSleepTime = currSleep.findAverageSleep();

	userSleepTime.innerHTML = `
		<p>On average you sleep ${avSleep} hours per night</br></br>
		All FitLit user's average ${avSleepTime} hours per night</br></br>
		Last night you slept for ${todaySleep} hours.</br></br>
		Your past week sleeplog:</br></br>
		Saturday: ${weekSleep[5]} hours</br></br>
		Friday: ${weekSleep[4]} hours</br></br>
		Thurdsay: ${weekSleep[3]} hours</br></br>
		Wednesday: ${weekSleep[2]} hours</br></br>
		Tuesday: ${weekSleep[1]} hours</br></br>
		Monday: ${weekSleep[0]} hours</br></br>
		FitLit's sleepiest user last nigh was: ${mostSleep}.
	`
}

const updateSleepQuality = (currSleep) => {
	const todayQuality = currSleep.findUserSleepQualityForDay('2019/09/22');
	const weekQuality = currSleep.findUserQualityForWeek('2019/09/22');
	const avQuality = currSleep.findUserAverageQuality(sleepData);
	const bestSleep = currSleep.findBestSleepers(sleepData, '2019/09/22', userRepo);
	const avSleepQuality = currSleep.findAverageQuality();

	userSleepQuality.innerHTML = `
		<p>On a 1-5 scale, on average your sleep quality is at a ${avQuality}.</br></br>
		Amongst all FitLit users, the average sleep quality is ${avSleepQuality}.</br></br>
		Last night your sleep quality was ${todayQuality}.
		Your past week sleep quality:</br></br>
		Saturday: ${weekQuality[5]}</br></br>
		Friday: ${weekQuality[4]}</br></br>
		Thurdsay: ${weekQuality[3]}</br></br>
		Wednesday: ${weekQuality[2]}</br></br>
		Tuesday: ${weekQuality[1]}</br></br>
		Monday: ${weekQuality[0]}</br></br>
		FitLit users who scored above a 3 in sleep quality this last week:</br></br>
		${bestSleep}
	`
}

const updateOnload = () => {
	chooseRandom();
	updateWelcome(randomUser);
	updateHydration(currentHydration);
	updateMiles(currentActivity);
	updateMinAct(currentActivity);
	updateSteps(currentActivity);
	updateStairs(currentActivity);
	updateSleepTime(currentSleep);
	updateSleepQuality(currentSleep);
}

window.addEventListener('load', updateOnload);