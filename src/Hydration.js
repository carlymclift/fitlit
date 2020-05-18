class Hydration {
	constructor(userInfo, givenHydroData) {
		this.id = userInfo.id;
		this.userHydroData = givenHydroData;
	}
	//TODO: change methods to output a new class property
	
	correctHydroData() {
		const currentHydration = this.userHydroData.filter(user => {
			return user.userID === this.id;
		})
		this.userHydroData = currentHydration;
	}

	findHydrationAverage(dataset) {
		let avHydration = dataset.reduce((accu, user) => {
			accu += user.numOunces;
			return accu;
		}, 0)
		return Math.ceil(avHydration / dataset.length);
	}

	findOuncesForDay(date) {
		let foundData = this.userHydroData.find(user => {
			return user.date === date;
		})
		return foundData.numOunces;
	}

	findOuncesForWeek(date) {
		const firstIndex = this.userHydroData.findIndex(x => x.date === date);

		const pastWeek = this.userHydroData.slice(firstIndex - 6, firstIndex + 1).map(x => x.numOunces);
			
		return pastWeek
		}
	}

if (typeof module !== 'undefined') {
	module.exports = Hydration;
}