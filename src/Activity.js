class Activity {
	constructor(userInfo, givenActData) {
		this.id = userInfo.id;
		this.dailyStepGoal = userInfo.dailyStepGoal;
		this.strideLength = userInfo.strideLength;
		this.friends = userInfo.friends;
		this.userActData = givenActData;
		this.todaySteps = 0;
		this.weekAv = 0;
		this.friendsWeekAv = [];
	}

	correctActData() {
		const currentActData = this.userActData.filter(user => {
			return user.userID === this.id;
		})
		this.userActData = currentActData;
	}
	
	milesWalk(date) {
		const foundDate = this.userActData.find(user => {
			return user.date === date;
		})

		const stepsPerMile = 5280 / this.strideLength;
		const milesWalked = foundDate.numSteps / stepsPerMile;
		return Math.round(milesWalked * 100) / 100;
	}
	
	weekMilesWalked(date) {
		const firstIndex = this.userActData.findIndex(x => x.date === date);

		const pastWeek = this.userActData.slice(firstIndex - 6, firstIndex + 1);

		const pastWeekMiles = pastWeek.map(day => {
			const stepsPerMile = 5280 / this.strideLength;
			const milesWalked = day.numSteps / stepsPerMile;
			return Math.round(milesWalked * 100) / 100;
		})

		return pastWeekMiles;
	}

	minActive(date) {
		const foundDate = this.userActData.find(user => {
			return user.date === date;
		})

		return foundDate.minutesActive;
	}
	
	weekMinActive(date) {
		const firstIndex = this.userActData.findIndex(x => x.date === date);

		const pastWeek = this.userActData.slice(firstIndex - 6, firstIndex + 1).map(x => x.minutesActive);
		
		return pastWeek;
	}
	
	allUserMinActive(dataset, date) {
		const filterDate = dataset.filter(dataPt => {
			return dataPt.date === date;
		})

		const avMinutes = filterDate.reduce((accu, dataPt) => {
			accu += dataPt.minutesActive;
			return accu;
		}, 0)

		return Math.ceil(avMinutes / filterDate.length);
	}

	stepGoalResult(date) {
		const foundDate = this.userActData.find(user => {
			return user.date === date;
		});

		this.todaySteps = foundDate.numSteps;

		if (this.todaySteps >= this.dailyStepGoal) {
			return `Step goal reached today, with ${foundDate.numSteps} steps taken!`;
		} else { return `You did not meet your step goal today, with ${foundDate.numSteps} steps.`}
	}

	daysGoalAchieved() {
		const goalDays = this.userActData.filter(user => {
			return user.numSteps > this.dailyStepGoal;
		})

		const justDate = goalDays.map(days => {
			return days.date;
		})

		return justDate;
	}

	allUserSteps(dataset, date) {
		const filterDate = dataset.filter(dataPt => {
			return dataPt.date === date;
		})

		const avSteps = filterDate.reduce((accu, dataPt) => {
			accu += dataPt.numSteps;
			return accu;
		}, 0)

		return Math.ceil(avSteps / filterDate.length);
	}

	stairRecord() {
		const sortStair = this.userActData.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs);
		return `Your stair climb record was ${sortStair[0].flightsOfStairs} flights on ${sortStair[0].date}!`;
	}

	allUserStairsClimbed(dataset, date) {
		const filterDate = dataset.filter(dataPt => {
			return dataPt.date === date;
		})

		const avStairs = filterDate.reduce((accu, dataPt) => {
			accu += dataPt.flightsOfStairs;
			return accu;
		}, 0)

		return Math.ceil(avStairs / filterDate.length);
	}

	avSteps(date) {
		const firstIndex = this.userActData.findIndex(x => x.date === date);
		const pastWeek = this.userActData.slice(firstIndex - 6, firstIndex + 1).map(x => x.numSteps);
		
		const weekAv = pastWeek.reduce((accu, day) => {
			accu += day;
			return accu;
		}, 0);
		this.weekAv = weekAv;
	}

	friendsSteps(date, dataset, givenClass) {
		const foundSteps = this.friends.map(friend => {
			const usersData = dataset.filter(dataPt => dataPt.userID === friend);
			const firstIndex = usersData.findIndex(x => x.date === date);
			const pastWeek = usersData.slice(firstIndex - 6, firstIndex + 1).map(x => x.numSteps);
			
			const weekAv = pastWeek.reduce((accu, day) => {
				accu += day;
				return accu;
			}, 0);

			const updateName = givenClass.data.find(dataPt => {
				return dataPt.id === friend;
			}).name;

			return { user: updateName, weekTotal: weekAv }
		})
		
		this.friendsWeekAv = foundSteps;
	}

	challengeWinner() {
		this.friendsWeekAv.push({ user: this.id, weekTotal: this.weekAv });
		const sortAv = this.friendsWeekAv.sort((a, b) => b.weekTotal - a.weekTotal);
		return sortAv[0];
	}
}

if (typeof module !== 'undefined') {
	module.exports = Activity;
}