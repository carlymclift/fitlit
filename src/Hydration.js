class Hydration {
	constructor(userInfo, givenHydroData) {
		this.id = userInfo.id,
		this.userHydroData = givenHydroData;
	}
	
	correctHydroData() {
		let currentHydration = this.userHydroData.filter(user => {
			return user.userID === this.id;
		})
		this.userHydroData = currentHydration;
	}

	findHydrationAverage(userId) {
		let avHydration = this.userHydroData.reduce((ounces, user) => {
			ounces += user.numOunces / this.userHydroData.length
			return ounces
		}, 0)
		return Math.round(avHydration);
	}

	findOuncesForDay(date) {
		let foundData = this.userHydroData.find(user => {
			return user.date === date;
		})
		return foundData.numOunces;
	}

	findOuncesForWeek(date) {
		let currentIndex = this.userHydroData.findIndex(x => x.date === date);
		
		let pastWeek = [];
		for (let i = currentIndex - 6; i <= currentIndex; i++) {
				pastWeek.push(this.userHydroData[i].numOunces);
			}
			
			return pastWeek
		}
	}

if (typeof module !== 'undefined') {
	module.exports = Hydration;
}