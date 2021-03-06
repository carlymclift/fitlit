class Activity {
	constructor(userInfo, givenActData) {
		this.id = userInfo.id;
		this.dailyStepGoal = userInfo.dailyStepGoal;
		this.strideLength = userInfo.strideLength;
		this.friends = userInfo.friends;
		this.userActData = givenActData;
		this.todaySteps = 0;
		this.wkSteps = 0;
		this.stairs = 0;
		this.friendsWkSteps = [];
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

		const foundDate = goalDays.map(days => {
			return days.date;
		})

		return foundDate;
	}

	allUserSteps(dataset, date) {
		const filterDate = dataset.filter(dataPt => {
			return dataPt.date === date;
		})

		const weekSteps = filterDate.reduce((accu, dataPt) => {
			accu += dataPt.numSteps;
			return accu;
		}, 0)

		return Math.ceil(weekSteps / filterDate.length);
	}

	stairRecord() {
		const sortStair = this.userActData.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs);
		return { stairFlights: sortStair[0].flightsOfStairs, date: sortStair[0].date };
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

	userStairsWeek(date) {
		const firstIndex = this.userActData.findIndex(x => x.date === date);
		const pastWeek = this.userActData.slice(firstIndex - 6, firstIndex + 1).map(x => x.flightsOfStairs);
		
		const currentWkStairs = pastWeek.reduce((accu, day) => {
			accu += day;
			return accu;
		}, 0);
		this.stairs = currentWkStairs;
	}

	userStairsToday(date) {
		const foundDate = this.userActData.find(user => {
			return user.date === date;
		})

		return foundDate.flightsOfStairs;
	}

	weekSteps(date) {
		const firstIndex = this.userActData.findIndex(x => x.date === date);
		const pastWeek = this.userActData.slice(firstIndex - 6, firstIndex + 1).map(x => x.numSteps);
		
		const currentWkSteps = pastWeek.reduce((accu, day) => {
			accu += day;
			return accu;
		}, 0);
		this.wkSteps = currentWkSteps;
	}

	friendsSteps(date, dataset, givenClass) {
		this.friendsWkSteps = this.friends.map(friend => {
			const usersData = dataset.filter(dataPt => dataPt.userID === friend);
			const firstIndex = usersData.findIndex(x => x.date === date);
			const pastWeek = usersData.slice(firstIndex - 6, firstIndex + 1).map(x => x.numSteps);
			
			const wkSteps = pastWeek.reduce((accu, day) => {
				accu += day;
				return accu;
			}, 0);

			const updateName = givenClass.data.find(dataPt => {
				return dataPt.id === friend;
			}).name;

			return { user: updateName, weekTotal: wkSteps }
		})
	}

	challengeWinner() {
		this.friendsWkSteps.push({ user: this.id, weekTotal: this.wkSteps });
		const sortFriends = this.friendsWkSteps.sort((a, b) => b.weekTotal - a.weekTotal);

		return sortFriends[0];
	}
}

if (typeof module !== 'undefined') {
	module.exports = Activity;
}