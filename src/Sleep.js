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

		return Math.round((pastWeek.reduce((a, b) => a + b)) / 7);
    }

    findUserAverageQualityForWeek(date) {
		let currentIndex = this.userSleepData.findIndex(x => x.date === date);

		let pastWeek = [];
		for (let i = currentIndex - 6; i <= currentIndex; i++) {
			pastWeek.push(this.userSleepData[i].sleepQuality);
		}

		return Math.round((pastWeek.reduce((a, b) => a + b)) / 7);
    }
    
    findAverageSleep() {
        let average = this.userSleepData.reduce((acc, user) => {
                acc += user.hoursSlept
                return acc;
        }, 0)
        return Math.round(average / this.userSleepData.length)
    }

    // findBestSleepQualityForWeek(date) {
    //     let currentIndex = this.userSleepData.findIndex(x => x.date === date);

	// 	let sleepyPpl = [];
	// 	for (let i = currentIndex - 6; i <= currentIndex; i++) {
	// 		if(this.userSleepData[i].sleepQuality > 3) {
    //             sleepyPpl.push(this.userSleepData[i].userID); //Find name of user based on id, right now I think it's returning ID #
    //         }
    //     }
    //     return sleepyPpl;
    // }

    findBestSleepQualityForWeek(date) {
        let userIds = this.getUserSleepData()
        return userIds.reduce((finalAcc, id) => {
          let thisUsersStuff = userIds.reduce((acc, stat) => {
            if (stat.userID === id) {
              acc.push(stat)
            }
            return acc
          }, [])
          let index = thisUsersStuff.findIndex(stat => stat.date === date);
          let justThisWeek = thisUsersStuff.slice(index - 6, index + 1);
          let fakeAcc = 0;
          let userId = 0;
          justThisWeek.forEach(stat => {
            fakeAcc += stat.sleepQuality / 7;
            userId = stat.userID
          })
          if (fakeAcc > 3) {
            finalAcc.push(userId)
          }
          return finalAcc
        }, [])
      }

    // findBestSleepQualityForWeek(date) {
    //     const weekOfUsersFn = this.findUserAverageQualityForWeek(date)
    //     const bestSlepers = [];
    //     for (let key in weekOfUsersFn) {
    //       if ((weekOfUsersFn[key].reduce((avgQuality, sleepQuality) => {
    //         avgQuality += sleepQuality;
    //         return avgQuality
    //       }, 0) / weekOfUsersFn[key].length) > 3) {
    //         bestSlepers.push(parseInt(key))
    //       }
    //     }
    //     return bestSlepers
    //   }

    findUsersWhoSleptMost() {

    }

    /// Make metric of our own that we want to display
} 

if (typeof module !== 'undefined') {
	module.exports = Sleep;
}