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
		let foundData = hydrationData.find(user => {
			return user.userID === this.id && user.date === date;
		})
		return foundData.numOunces
	}

	findOuncesForWeek(date) {
		let allUsersDates = hydrationData.filter(user => {
			return user.userID === this.id;
		})

		let currentIndex = allUsersDates.findIndex(x => x.date === date);
		
		let pastWeek = [];
		for (let i = currentIndex - 6; i <= currentIndex; i++) {
				pastWeek.push(allUsersDates[i].numOunces);
			}
			
			return pastWeek
		}
	}

if (typeof module !== 'undefined') {
	module.exports = Hydration;
}