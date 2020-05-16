class Sleep {
    constructor(userInfo, givenSleepData) {
        this.id = userInfo.id;
        this.userSleepData = givenSleepData;
    }
    correctSleepData() {
		const currentSleepData = this.userSleepData.filter(user => {
			return user.userID === this.id;
		})
		this.userSleepData = currentSleepData;
    }

    findAverageSleep(dataset) {
		let avSleep = dataset.reduce((acc, user) => {
			acc += user.hoursSlept;
			return acc;
		}, 0)
		return Math.round(avSleep / dataset.length);
    }
    
    findAverageQuality(dataset) {
		let avSleepQuality = dataset.reduce((acc, user) => {
			acc += user.sleepQuality;
			return acc;
		}, 0)
		return Math.round(avSleepQuality / dataset.length);
    }

    findSleepForDay(date) {
		let sleepData = this.userSleepData.find(user => {
			return user.date === date;
		})
		return sleepData.hoursSlept;
    }
    
    findSleepQualityForDay(date) {
		let sleepData = this.userSleepData.find(user => {
			return user.date === date;
		})
		return sleepData.sleepQuality;
    }
    
    findAverageSleepForWeek(startDate, endDate) {
        let avSleep = this.findUserInfo(id)
        .filter(day => day.date >= startDate && day.date <= endDate)
        .map(day => day.hoursSlept)
        .reduce((acc, num) => {
          return acc + num;
        }, 0)
        return Math.round((totalHours / 7) * 10) / 10;
      }

      weekMinActive(date) {
		let currentIndex = this.userSleepData.findIndex(x => x.date === date);

		let pastWeek = [];
		for (let i = currentIndex - 6; i <= currentIndex; i++) {
			pastWeek.push(this.userSleepData[i].hoursSlept);
		}

		return (pastWeek.reduce((a, b) => a + b)) / 2;
    }
    
    weekMinActive(date) {
		let currentIndex = this.userSleepData.findIndex(x => x.date === date);

		let pastWeek = [];
		for (let i = currentIndex - 6; i <= currentIndex; i++) {
			pastWeek.push(this.userSleepData[i].sleepQuality);
		}

		return (pastWeek.reduce((a, b) => a + b)) / 2;
	}
}

if (typeof module !== 'undefined') {
	module.exports = Sleep;
}