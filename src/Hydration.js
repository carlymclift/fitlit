const hydrationData = require('../data/hydration');

class Hydration {
	constructor(userInfo) {
		this.id = userInfo.id,
		this.name = userInfo.name,
		this.address = userInfo.address,
		this.email = userInfo.email,
		this.strideLength = userInfo.strideLength,
		this.dailyStepGoal = userInfo.dailyStepGoal,
		this.friends = userInfo.friends
	}

	findHydrationAverage(userId) {
		let userHydration = hydrationData.filter(user => user.userID === userId);
		let avHydration = userHydration.reduce((ounces, user) => {
			ounces += user.numOunces / userHydration.length
			return ounces
		}, 0)
		return Math.round(avHydration);
	}

	findOuncesForDay(date) {
		let foundData = hydrationData.find(singleData => {
			return singleData.userID === this.id && singleData.date === date;
		})
		return foundData.numOunces
	}

	findOuncesForWeek() {

		//return array of past 7 days
	}
}

if (typeof module !== 'undefined') {
	module.exports = Hydration;
}