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
      const firstIndex = this.userSleepData.findIndex(x => x.date === date);
  
      const pastWeek = this.userSleepData.slice(firstIndex - 6, firstIndex + 1).map(x => x.hoursSlept);
  
      return pastWeek;
    }
  
    findUserQualityForWeek(date) {
      const firstIndex = this.userSleepData.findIndex(x => x.date === date);
  
      const pastWeek = this.userSleepData.slice(firstIndex - 6, firstIndex + 1).map(x => x.sleepQuality)

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
		
		findMostSleepUser(dataset, date, givenClass) {
			const filterDate = dataset.filter(dataPt => {
				return dataPt.date === date;
			})

			const sortedSleepies = filterDate.sort((a, b) => b.hoursSlept - a.hoursSlept);
			
			const userName = givenClass.data.find(user => {
				return user.id === sortedSleepies[0].userID;
			}).name;

			return `${userName} slept more than any other user last night, ${sortedSleepies[0].hoursSlept} hours -- WOW!`
		} //TODO: change return to an obj

		transformSleepData(dataset) {
			const allUsersSleepObj = dataset.reduce((accu, dataPt) => {
				if (!accu[dataPt.userID]) {
					accu[dataPt.userID] = [];
				}
				accu[dataPt.userID].push(dataPt);
				return accu;
			}, {})

			return { ids: Object.keys(allUsersSleepObj), users: allUsersSleepObj };
		}

		calculateUserAverageSleep(users, date, user) {
			const sleepDate = users[user].find(x => x.date === date);
			const firstIndex = users[user].indexOf(sleepDate);
			const weekSleepQuals = users[user].slice(firstIndex, firstIndex + 7).map(x => x.sleepQuality);	
			return weekSleepQuals.reduce((accu, num) => accu += num / weekSleepQuals.length, 0);
		}

		calculateUsersSleep(ids, users, givenClass, date) {
			const sleepUsers = ids.reduce((accu, user) => {
				const userSleepAverage = this.calculateUserAverageSleep(users, date, user);
				
				if (userSleepAverage > 3) {
					const userName = givenClass.data.find(currentUser => {
						return currentUser.id === Number(user);
					}).name;
	
					accu.push(userName);
				}
	
				return accu
			}, []);

			return sleepUsers;
		}
		
		findBestSleepers(dataset, date, givenClass) {
			const {ids, users} = this.transformSleepData(dataset);
			return this.calculateUsersSleep(ids, users, givenClass, date); 
		}
  }
  
  if (typeof module !== 'undefined') {
    module.exports = Sleep;
  }