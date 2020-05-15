class Hydration {
	constructor(userInfo, givenHydroData) {
		this.id = userInfo.id;
		this.userHydroData = givenHydroData;
	}
	
	correctHydroData() {
		const currentHydration = this.userHydroData.filter(user => {
			return user.userID === this.id;
		})
		this.userHydroData = currentHydration;
	}

	findHydrationAverage() {
		let avHydration = hydrationData.reduce((accu, user) => {
			accu += user.numOunces;
			return accu;
		}, 0)
		return Math.ceil(avHydration / hydrationData.length);
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