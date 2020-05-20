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

const updateSleepTime = (currSleep) => {
	const todaySleep = currSleep.findUserSleepForDay('2019/09/22');
	const weekSleep = currSleep.findUserSleepForWeek('2019/09/22');
	const avSleep = currSleep.findUserAverageSleep(sleepData);
	const mostSleep = currSleep.findMostSleepUser(sleepData, '2019/09/22', userRepo);
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
		FitLit's sleepiest user last night was: ${mostSleep}.
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
		Last night your sleep quality was ${todayQuality}.</br></br>
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

const updateStairs = (currentAct) => {
	const stairRecord = currentAct.stairRecord();
	const allUserStairs = currentAct.allUserStairsClimbed(activityData, '2019/09/22');

	userStairs.innerHTML = `
		<p>${stairRecord}</br></br>
		Today all FitLit user's averaged ${allUserStairs} flights climbed.
		`;
}

const updateSteps = (currentAct) => {
	const todaySteps = currentAct.stepGoalResult('2019/09/22');
	const avGoal = userRepo.fetchAverageStepGoal();
	const goalDays = currentAct.daysGoalAchieved();
	const allUserTodaySteps = currentAct.allUserSteps(activityData, '2019/09/22');
	currentAct.weekSteps('2019/09/22');

	userSteps.innerHTML = `
		<p>You took ${currentAct.wkSteps} steps this week.</br></br>
		Your daily step goal is ${randomUser.dailyStepGoal} steps.</br></br>
		The average step goal amongst all users is ${avGoal} steps.</br></br>
		${todaySteps}</br></br>
		Past log for all the days you achieved your step goal:</br></br>
		<ul class="goal-log">${goalDaysToList(goalDays)}</ul>
		Today all FitLit user's averaged ${allUserTodaySteps} steps.
		`;
}

const goalDaysToList = (goalDays) => goalDays
	.map(day => `<li>${day}</li>`).join('');

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

// Charts:

var hydro = document.getElementById('hydro-per-week').getContext('2d');
let hydration = new Hydration(randomUser, hydrationData);
const hydrationChart = hydration.findOuncesForWeek('2019/09/22');
var chart = new Chart(hydro, {
    type: 'bar',
    data: {
        labels: ['Saturday', 'Friday', 'Thurdsay', 'Wednesday', 'Tuesday', 'Monday', 'Today'],
        datasets: [{
            label: 'Hydration for the past week:',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: hydrationChart
        }]
    },
    options: {}
});

var slTime = document.getElementById('sleep-time-per-week').getContext('2d');
let sleep = new Sleep(randomUser, sleepData);
const sleepChart = sleep.findUserSleepForWeek('2019/09/22');
var chart = new Chart(slTime, {
    type: 'bar',
    data: {
        labels: ['Saturday', 'Friday', 'Thurdsay', 'Wednesday', 'Tuesday', 'Monday', 'Today'],
        datasets: [{
            label: 'Hydration for the past week:',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: sleepChart
        }]
    },
    options: {}
});

var slQual = document.getElementById('sleep-quality-per-week').getContext('2d');
const qualityChart = sleep.findUserQualityForWeek('2019/09/22');
var chart = new Chart(slQual, {
    type: 'bar',
    data: {
        labels: ['Saturday', 'Friday', 'Thurdsay', 'Wednesday', 'Tuesday', 'Monday', 'Today'],
        datasets: [{
            label: 'Hydration for the past week:',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: qualityChart
        }]
    },
    options: {}
});

var walk = document.getElementById('miles-walked-per-week').getContext('2d');
let activity = new Activity(randomUser, sleepData);
const milesChart = activity.weekMilesWalked('2019/09/22');
var chart = new Chart(walk, {
    type: 'bar',
    data: {
        labels: ['Saturday', 'Friday', 'Thurdsay', 'Wednesday', 'Tuesday', 'Monday', 'Today'],
        datasets: [{
            label: 'Hydration for the past week:',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: milesChart
        }]
    },
    options: {}
});

var activ = document.getElementById('activity-per-week').getContext('2d');
const activeChart = activity.weekMinActive('2019/09/22');
var chart = new Chart(activ, {
    type: 'bar',
    data: {
        labels: ['Saturday', 'Friday', 'Thurdsay', 'Wednesday', 'Tuesday', 'Monday', 'Today'],
        datasets: [{
            label: 'Hydration for the past week:',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: activeChart
        }]
    },
    options: {}
});