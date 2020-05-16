class Sleep {
    constructor(userInfo, givenSleepData) {
        this.id = userInfo.id;
        this.userSleepData = givenSleepData;
    }
    getUserSleepData() {
		const currentSleepData = this.userSleepData.filter(user => {
			return user.userID === this.id;
		})
		this.userSleepData = currentSleepData;
    }

    findUserAverageSleep(dataset) {
		let avSleep = dataset.reduce((acc, user) => {
			acc += user.hoursSlept;
			return acc;
		}, 0)
		return Math.round(avSleep / dataset.length);
    }
    
    findUserAverageQuality(dataset) {
		let avSleepQuality = dataset.reduce((acc, user) => {
			acc += user.sleepQuality;
			return acc;
		}, 0)
		return Math.round(avSleepQuality / dataset.length);
    }

    findUserSleepForDay(date) {
		let sleepData = this.userSleepData.find(user => {
			return user.date === date;
		})
		return sleepData.hoursSlept;
    }
    
    findUserSleepQualityForDay(date) {
		let sleepData = this.userSleepData.find(user => {
			return user.date === date;
		})
		return sleepData.sleepQuality;
    }

    findUserAverageSleepForWeek(date) {
		let currentIndex = this.userSleepData.findIndex(x => x.date === date);

		let pastWeek = [];
		for (let i = currentIndex - 6; i <= currentIndex; i++) {
			pastWeek.push(this.userSleepData[i].hoursSlept);
		}

		return (pastWeek.reduce((a, b) => a + b)) / 2;
    }
    
    findAverageSleep() {
        let average = this.userSleepData.reduce((acc, user) => {
                acc += user.hoursSlept
                return acc;
        }, 0)
        return Math.round(average / this.userSleepData.length)
    }

    findBestSleepQuality(user) {
        let currentIndex = this.userSleepData.findIndex(x => x.date === date);

		let sleepyPpl = [];
		for (let i = currentIndex - 6; i <= currentIndex; i++) {
			if (this.userSleepData[i] > 3) {
        sleepPpl.push(this.userSleepData[i].userID); //Find name of user based on id, right now I think it's returning ID #
          }
        }
        return sleepyPpl;
    }

    findUsersWhoSleptBest() {

    }

    /// Make metric of our own that we want to display
}

if (typeof module !== 'undefined') {
	module.exports = Sleep;
}