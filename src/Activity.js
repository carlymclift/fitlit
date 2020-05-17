class Activity {
	constructor(userInfo, givenActData) {
		this.id = userInfo.id;
		this.dailyStepGoal = userInfo.dailyStepGoal;
		this.strideLength = userInfo.strideLength;
		this.userActData = givenActData;
	}

	correctActData() {
		const currentActData = this.userActData.filter(user => {
			return user.userID === this.id;
		})
		this.userActData = currentActData;
	}

	milesWalk(date) {
		let foundDate = this.userActData.find(user => {
			return user.date === date;
		})

		let stepsPerMile = 5280 / this.strideLength;
		let milesWalked = foundDate.numSteps / stepsPerMile;
		return Math.round(milesWalked * 100) / 100;
	}
	
	weekMilesWalked(date) { //REFACTOR
		let currentIndex = this.userActData.findIndex(x => x.date === date);

		let pastWeek = [];
		for (let i = currentIndex - 6; i <= currentIndex; i++) {
			pastWeek.push(this.userActData[i].numSteps);
		} //TODO: replace w/ .slice & .map
			//similar to: allUsersSleepObj[user].slice(firstIndex, firstIndex + 7).map(x => x.sleepQuality)

		let miles = pastWeek.map(day => {
			let stepsPerMile = 5280 / this.strideLength;
			let milesWalked = day / stepsPerMile;
			return Math.round(milesWalked * 100) / 100;
		})

		return miles;
	}

	minActive(date) {
		let foundDate = this.userActData.find(user => {
			return user.date === date;
		})

		return foundDate.minutesActive;
	}
	
	weekMinActive(date) {
		let currentIndex = this.userActData.findIndex(x => x.date === date);
		
		let pastWeek = [];
		for (let i = currentIndex - 6; i <= currentIndex; i++) {
			pastWeek.push(this.userActData[i].minutesActive);
		} //TODO: replace w/ .slice & .map
			//similar to: allUsersSleepObj[user].slice(firstIndex, firstIndex + 7).map(x => x.sleepQuality)
		
		return pastWeek;
	}
	
	allUserMinActive(dataset, date) {
		let filterDate = dataset.filter(dataPt => {
			return dataPt.date === date;
		})

		let avMinutes = filterDate.reduce((accu, dataPt) => {
			accu += dataPt.minutesActive;
			return accu;
		}, 0)

		return Math.ceil(avMinutes / filterDate.length);
	}

	stepGoalResult(date) {
		let foundDate = this.userActData.find(user => {
			return user.date === date;
		})
		if (foundDate.numSteps >= this.dailyStepGoal) {
			return `Step goal reached today, with ${foundDate.numSteps} steps taken!`;
		} else { return `You did not meet your step goal today, with ${foundDate.numSteps} steps.`}
	}

	daysGoalAchieved() {
		let goalDays = this.userActData.filter(user => {
			return user.numSteps > this.dailyStepGoal
		})

		let justDate = goalDays.map(days => {
			return days.date;
		})

		return justDate
	}

	allUserSteps(dataset, date) {
		let filterDate = dataset.filter(dataPt => {
			return dataPt.date === date;
		})

		let avSteps = filterDate.reduce((accu, dataPt) => {
			accu += dataPt.numSteps;
			return accu;
		}, 0)

		return Math.ceil(avSteps / filterDate.length);
	}

	stairRecord() {
		let sortStair = this.userActData.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs);
		return `Your stair climb record was ${sortStair[0].flightsOfStairs} flights on ${sortStair[0].date}!`;
	}

	allUserStairsClimbed(dataset, date) {
		let filterDate = dataset.filter(dataPt => {
			return dataPt.date === date;
		})

		let avStairs = filterDate.reduce((accu, dataPt) => {
			accu += dataPt.flightsOfStairs;
			return accu;
		}, 0)

		return Math.ceil(avStairs / filterDate.length);
	}
}

if (typeof module !== 'undefined') {
	module.exports = Activity;
}