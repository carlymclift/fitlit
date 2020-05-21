/* eslint-disable no-undef */
const welcomeTitle = document.querySelector('.welcome');
const userCardName = document.querySelector('.name');
const userAddress = document.querySelector('.address');
const userEmail = document.querySelector('.email');
const userFriends = document.querySelector('.friends');
const h2o = document.querySelector('.h2o');
const userSleepTime = document.querySelector('.sleep-time');
const userSleepQuality = document.querySelector('.sleep-quality');
const userMiles = document.querySelector('.miles-walked');
const userMinAct = document.querySelector('.min-active');
const userStairs = document.querySelector('.stairs');
const userSteps = document.querySelector('.steps');
const friendSteps = document.querySelector('.friend-data');
const stepWinner = document.querySelector('.winner');

const userArray = userData.map((user) => new User(user));
const userRepo = new UserRepository(userArray);
let randomUser = {};
let currentHydration = {};
let currentActivity = {};
let currentSleep = {};

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
	updateChallenge(currentActivity);
}

window.addEventListener('load', updateOnload);

const chooseRandom = () => {
	const randomNum = (Math.floor(Math.random() * userRepo.data.length));
	
	randomUser = userRepo.data[randomNum];
	currentHydration = new Hydration(randomUser, hydrationData);
	currentHydration.correctHydroData();
	currentSleep = new Sleep(randomUser, sleepData);
	currentSleep.correctSleepData();
	currentActivity = new Activity(randomUser, activityData);
	currentActivity.correctActData();
}

const updateWelcome = (currentUser) => {
	randomUser.updateFriendName(userRepo);
	welcomeTitle.innerText = `Hello ${currentUser.findName()}!`;
	userCardName.innerText = `Name: ${currentUser.name}`;
	userAddress.innerText = `Address: ${currentUser.address}`;
	userEmail.innerText = `Email: ${currentUser.email}`;
	userFriends.innerText = `Friends:${currentUser.friends}`
}

const updateHydration = (currentHydro) => {
	const ouncesForDay = currentHydro.findOuncesForDay('2019/09/22');
	const ouncesForWeek = currentHydro.findOuncesForWeek('2019/09/22');
	const avgOunces = currentHydro.findHydrationAverage(hydrationData);

	h2o.innerHTML = `
		<p>Today, all FitLit user's water intake averaged at ${avgOunces} ounces.</br></br>
		Today you drank ${ouncesForDay} ounces.</br></br>
		Your past week water log:</br></br>
		Saturday: ${ouncesForWeek[5]} ounces</br></br>
		Friday: ${ouncesForWeek[4]} ounces</br></br>
		Thursday: ${ouncesForWeek[3]} ounces</br></br>
		Wednesday: ${ouncesForWeek[2]} ounces</br></br>
		Tuesday: ${ouncesForWeek[1]} ounces</br></br>
		Monday: ${ouncesForWeek[0]} ounces
		`;
}

const updateSleepTime = (currSleep) => {
	const todaySleep = currSleep.findUserSleepForDay('2019/09/22');
	const weekSleep = currSleep.findUserSleepForWeek('2019/09/22');
	const allUserAvgSleep = currSleep.findAllUserAverageSleep(sleepData);
	const mostSleep = currSleep.findMostSleepUser(sleepData, '2019/09/22', userRepo);
	const avgSleepTime = currSleep.findAverageSleep();

	userSleepTime.innerHTML = `
		<p>On average you sleep ${avgSleepTime} hours per night.</br></br>
		All FitLit user's average ${allUserAvgSleep} hours per night.</br></br>
		Last night you slept for ${todaySleep} hours.</br></br>
		Your past week sleeplog:</br></br>
		Saturday: ${weekSleep[5]} hours</br></br>
		Friday: ${weekSleep[4]} hours</br></br>
		Thurdsay: ${weekSleep[3]} hours</br></br>
		Wednesday: ${weekSleep[2]} hours</br></br>
		Tuesday: ${weekSleep[1]} hours</br></br>
		Monday: ${weekSleep[0]} hours</br></br>
		FitLit's sleepiest user last night was...</br></br>
		${mostSleep.user}, they slept for ${mostSleep.hoursSlept} hours -- WOW!
	`
}

const updateSleepQuality = (currSleep) => {
	const todayQuality = currSleep.findUserSleepQualityForDay('2019/09/22');
	const weekQuality = currSleep.findUserQualityForWeek('2019/09/22');
	const avQuality = currSleep.findUserAverageQuality(sleepData);
	const bestSleep = currSleep.findBestSleepers(sleepData, '2019/09/22', userRepo);
	const avSleepQuality = currSleep.findAverageQuality();

	userSleepQuality.innerHTML = `
		<p>On a scale of 1-5, your sleep quality average's at ${avQuality}.</br></br>
		The average sleep quality is ${avSleepQuality} amongst all FitLit users.</br></br>
		Last night your sleep quality was at ${todayQuality}.</br></br>
		Your past week sleep quality log:</br></br>
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

const updateMiles = (currentAct) => {
	const todayMiles = currentAct.milesWalk('2019/09/22');
	const weekMiles = currentAct.weekMilesWalked('2019/09/22');

	userMiles.innerHTML = `
		<p>Today you walked ${todayMiles} miles.</br></br>
		Your past week miles walked:</br></br>
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
		Today, all FitLit user's were active for an average of ${allUserTodayMin} minutes.</br></br>
		Your past week activity log:</br></br>
		Saturday: ${weekMin[5]} minutes</br></br>
		Friday: ${weekMin[4]} minutes</br></br>
		Thursday: ${weekMin[3]} minutes</br></br>
		Wednesday: ${weekMin[2]} minutes</br></br>
		Tuesday: ${weekMin[1]} minutes</br></br>
		Monday: ${weekMin[0]} minutes
		`;
}

const updateStairs = (currentAct) => {
	currentAct.userStairsWeek('2019/09/22');
	const stairRecord = currentAct.stairRecord();
	const allUserStairs = currentAct.allUserStairsClimbed(activityData, '2019/09/22');
	const todayStairs = currentAct.userStairsToday('2019/09/22');

	userStairs.innerHTML = `
		<p>Your stair climb record is ${stairRecord.stairFlights} flights on ${stairRecord.date}.</br></br>
		Today, all FitLit user's averaged ${allUserStairs} flights climbed.</br></br>
		Today you climbed ${todayStairs} flights of stairs.</br></br>
		You've climbed ${currentAct.stairs} flights of stairs this week!
		`;
}

const updateSteps = (currentAct) => {
	currentAct.weekSteps('2019/09/22');
	const todaySteps = currentAct.stepGoalResult('2019/09/22');
	const avGoal = userRepo.fetchAverageStepGoal();
	const goalDays = currentAct.daysGoalAchieved();
	const allUserTodaySteps = currentAct.allUserSteps(activityData, '2019/09/22');

	userSteps.innerHTML = `
		<p>You took ${currentAct.wkSteps} steps this week.</br></br>
		Your daily step goal is ${randomUser.dailyStepGoal} steps.</br></br>
		The average step goal amongst all FitLit users is ${avGoal} steps.</br></br>
		${todaySteps}</br></br>
		Today all FitLit user's averaged ${allUserTodaySteps} steps.</br></br>
		All previous days you've exceeded your step goal:</br></br>
		<ul class="goal-log">${goalDaysToList(goalDays)}</ul>
		`;
}

const goalDaysToList = (goalDays) => goalDays.map(day => `<li>${day}</li>`).join('');

const updateChallenge = (currentAct) => {
	updateSteps(currentAct);
	currentAct.weekSteps('2019/09/22');
	currentAct.friendsSteps('2019/09/22', activityData, userRepo);

	for (let i =0; i< currentAct.friendsWkSteps.length; i++) {
		friendSteps.insertAdjacentHTML('beforeend', `<li>${currentAct.friendsWkSteps[i].user} took ${currentAct.friendsWkSteps[i].weekTotal} steps this week.</li></br>`);
	}

	const weekWinner = currentAct.challengeWinner();
	if (weekWinner.user === randomUser.id) {
		stepWinner.innerHTML = `Congrats, you win this week! You took ${weekWinner.weekTotal} steps!</br></br>`;
	} else {
		stepWinner.innerHTML = `${weekWinner.user} wins this week! They took ${weekWinner.weekTotal} steps!</br></br>`;
	}
}