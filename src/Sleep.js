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
  
    findUserAverageSleep(dataset) {
      const avSleep = dataset.reduce((acc, user) => {
        acc += user.hoursSlept;
        return acc;
      }, 0)
      return Math.round(avSleep / dataset.length);
    }
  
    findUserAverageQuality(dataset) {
      const avSleepQuality = dataset.reduce((acc, user) => {
        acc += user.sleepQuality;
        return acc;
      }, 0)
      return Math.round(avSleepQuality / dataset.length);
    }
  
    findUserSleepForDay(date) {
      const sleepData = this.userSleepData.find(user => {
        return user.date === date;
      })
      return sleepData.hoursSlept;
    }
  
    findUserSleepQualityForDay(date) {
      const sleepData = this.userSleepData.find(user => {
        return user.date === date;
      })
      return sleepData.sleepQuality;
    }
  
    findUserSleepForWeek(date) {
      let currentIndex = this.userSleepData.findIndex(x => x.date === date);
  
      const pastWeek = [];
      for (let i = currentIndex - 6; i <= currentIndex; i++) {
        pastWeek.push(this.userSleepData[i].hoursSlept);
      } //TODO: replace w/ .slice & .map
				//similar to: allUsersSleepObj[user].slice(firstIndex, firstIndex + 7).map(x => x.sleepQuality)
  
      return pastWeek;
    }
  
    findUserQualityForWeek(date) {
      const currentIndex = this.userSleepData.findIndex(x => x.date === date);
  
      const pastWeek = [];
      for (let i = currentIndex - 6; i <= currentIndex; i++) {
        pastWeek.push(this.userSleepData[i].sleepQuality);
      } //TODO: replace w/ .slice & .map
				//similar to: allUsersSleepObj[user].slice(firstIndex, firstIndex + 7).map(x => x.sleepQuality)
  
      return pastWeek;
    }
  
    findAverageSleep() {
      const average = this.userSleepData.reduce((acc, user) => {
        acc += user.hoursSlept
        return acc;
      }, 0)
      return Math.round(average / this.userSleepData.length)
    }
    
    findAverageQuality() {
      const average = this.userSleepData.reduce((acc, user) => {
        acc += user.sleepQuality
        return acc;
      }, 0)
      return Math.round(average / this.userSleepData.length)
		}
		
		findSleepiest(dataset, date, givenClass) {
			const filterDate = dataset.filter(dataPt => {
				return dataPt.date === date;
			})

			const sortedSleepies = filterDate.sort((a, b) => b.hoursSlept - a.hoursSlept);
			
			const userName = givenClass.data.find(user => {
				return user.id === sortedSleepies[0].userID;
			}).name;

			return `User ${userName} slept the most this day, they slept ${sortedSleepies[0].hoursSlept} hours -- WOW!`
		}
		
		findBestSleepers(dataset, date, givenClass) {
			const allUsersSleepObj = dataset.reduce((accu, dataPt) => {
				if (!accu[dataPt.userID]) {
					accu[dataPt.userID] = [];
				}
				accu[dataPt.userID].push(dataPt);
				return accu;
			}, {})

			const userIDs = Object.keys(allUsersSleepObj);

			const sleepUsers = userIDs.reduce((accu, user) => {
				const sleepDate = allUsersSleepObj[user].find(x => x.date === date);
				const firstIndex = allUsersSleepObj[user].indexOf(sleepDate);
				const weekSleepQual = 
					allUsersSleepObj[user].slice(firstIndex, firstIndex + 7).map(x => x.sleepQuality);

				const avg = weekSleepQual.reduce((accu, num) => {
					return accu += num / weekSleepQual.length;
				}, 0);
				
				if (avg > 3) {
					let userName;
					userName = givenClass.data.find(currentUser => {
						return currentUser.id === Number(user);
					}).name;

					accu.push(userName);
				}

				return accu
			}, []);

			return sleepUsers;						
		}
  }
  
  if (typeof module !== 'undefined') {
    module.exports = Sleep;
  }