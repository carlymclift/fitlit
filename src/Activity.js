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
		}

		return pastWeek;
	}

	stepGoalResult(date) {
		let foundDate = this.userActData.find(user => {
			return user.date === date;
		})
		if (foundDate.numSteps >= this.dailyStepGoal) {
			return 'Step goal reached!';
		} else { return 'You did not meet your step goal today.'}
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

	stairRecord() {
		let sortStair = this.userActData.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs);
		return `You're stair climb record was ${sortStair[0].flightsOfStairs} on ${sortStair[0].date}!`;
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

	//make another method!
}

if (typeof module !== 'undefined') {
	module.exports = Activity;
}