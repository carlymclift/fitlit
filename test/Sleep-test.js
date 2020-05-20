const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User-class');
const userData = require('../data/users');
const sleepData = require('../data/sleep');
const UserRepository = require('../src/UserRepository');
const Sleep = require('../src/Sleep');

describe('Sleep', () => {

	let user1;
	const userArray = userData.map((user) => new User(user));
	const userRepo = new UserRepository(userArray);
	let userSleep;

	beforeEach(() => {
		user1 = new User(userRepo.data[0]);

		userSleep = new Sleep(user1, sleepData);
		userSleep.correctSleepData();
	})

	it('should be a function', () => {
		expect(Sleep).to.be.a('function');
	})

	it('should be an instance of Sleep', () => {
		expect(userSleep).to.be.an.instanceof(Sleep);
	});

	it('should hold data from the user', () => {
		expect(userSleep.id).to.equal(user1.id);
  })
    
	it('should throw an error if instance of Sleep has no user arguments', () => {
		expect(() => { new Sleep() }).to.throw(Error);
	})
	
	it('should be able to get the average sleep for each user by id, for all time', () => {
		const getSleepAv = userSleep.findAllUserAverageSleep(sleepData);

		expect(getSleepAv).to.equal(8);
	})
	
	it('if no user id is given, findUserAverageSleep method should throw an error', () => {
		expect(() => { userSleep.findAllUserAverageSleep() }).to.throw(Error);
	})
	
	it('should be able to get the average sleep quality for each user by id, for all time', () => {
		const getQualityAv = userSleep.findUserAverageQuality(sleepData);

		expect(getQualityAv).to.equal(3);
	})

	it('if no user id is given, findUserAverageQuality method should throw an error', () => {
		expect(() => { userSleep.findUserAverageQuality() }).to.throw(Error);
	})

	it('should be able to find the hours of sleep for each user by id, for a given day', () => {
		const getDaySleep = userSleep.findUserSleepForDay('2019/06/15');

		expect(getDaySleep).to.equal(6.1);
	})

	it('if no user date is given, findUserSleepForDay method should throw an error', () => {
		expect(() => { userSleep.findUserSleepForDay() }).to.throw(Error);
	})

	it('should be able to find the quality of sleep for each user by id, for a given day', () => {
		const getQualitySleep = userSleep.findUserSleepQualityForDay('2019/06/15');

		expect(getQualitySleep).to.equal(2.2);
	})

	it('if no user date is given, findUserSleepQualityForDay method should throw an error', () => {
		expect(() => { userSleep.findUserSleepQualityForDay() }).to.throw(Error);
	})

	it('should be able to find the average sleep for each user by id, for a given week', () => {
		const getSleep = userSleep.findUserSleepForWeek('2019/09/02');

		expect(getSleep).to.deep.equal([
			 5.4, 7.9, 9.9, 4.3, 7.1, 4.4, 7.7 
		]);
	})

	it('if no user date is given, findUserSleepForWeek should return an empty array', () => {
		const getSleep = userSleep.findUserSleepForWeek();

		expect(getSleep).to.deep.equal([]);
	})

	it('should be able to find the average sleep quality for each user by id, for a given week', () => {
		const getSleepQual = userSleep.findUserQualityForWeek('2019/09/02');

		expect(getSleepQual).to.deep.equal([
			 1.4, 1.6, 1.6, 1.6, 1.9, 2.7, 4.4 
		]);
	})

	it('if no user date is given, findUserQualityForWeek should return an empty array', () => {
		const getSleepQual = userSleep.findUserQualityForWeek();

		expect(getSleepQual).to.deep.equal([]);
	})

	it('should be able to find current users\'s average sleep for all time', () => {
		const getSleepAv = userSleep.findAverageSleep();

		expect(getSleepAv).to.equal(8);
	})

	it('if findAverageSleep method is invoked on an undefined sleep instance, NaN should return', () => {
		const badUser = new User();
		const badSleepObj = new Sleep(badUser, sleepData);
		badSleepObj.correctSleepData();
		const getSleepAv = badSleepObj.findAverageSleep();

		expect(getSleepAv).to.deep.equal(NaN);
	})

	it('should be able to find current users\'s average sleep quality for all time', () => {
		const getQualAvg = userSleep.findAverageQuality();

		expect(getQualAvg).to.equal(3);
	})

	it('if findAverageQuality method is invoked on an undefined sleep instance, NaN should return', () => {
		const badUser = new User();
		const badSleepObj = new Sleep(badUser, sleepData);
		badSleepObj.correctSleepData();
		const getQualAvg = badSleepObj.findAverageQuality();

		expect(getQualAvg).to.deep.equal(NaN);
	})

	it('should be able to find the user who slept the most for a given date', () => {
		const findMostSleepUser = userSleep.findMostSleepUser(sleepData, '2019/07/21', userRepo);

		expect(findMostSleepUser.user).to.equal('Kristin Cruickshank');
		expect(findMostSleepUser.hoursSlept).to.equal(10.6);
	})

	it('if findMostSleepUser method is invoked while missing an argument, an error should throw', () => {
		expect(() => { userSleep.findMostSleepUser(sleepData, '2019/07/21') }).to.throw(Error);
	})

	it('should return the users with the best sleep week, quality over 3', () => {
		const findBest = userSleep.findBestSleepers(sleepData, '2019/07/21', userRepo);

		expect(findBest).to.deep.equal([
			"Luisa Hane", "Mae Connelly", "Jerrold Bogisich", 
			"Breanne Fay", "Laney Abshire", "Myron Schmitt", 
			"Roslyn Bernhard", "Gloria Frami", "Ezequiel Feest", 
			"Jade Walter", "Dan Hodkiewicz", "Ora O'Connell", 
			"Maria Kemmer", "Karli Rodriguez", "Kristin Cruickshank", 
			"Noemi Huels", "Colten Trantow", "Bertrand Yundt", 
			"Leilani Quitzon", "Lindsay Ruecker", "Nico Bechtelar", 
			"Erling Anderson", "Kaitlyn Weber", "Esperanza Schumm", 
			"Alfonso Sporer", "Cora Rice", "Jevon Koss"
	 ]);
	})

	it('if findBestSleepers method is invoked missing an argument, an error will throw', () => {
		expect(() => { userSleep.findBestSleepers(sleepData, '2019/07/21') }).to.throw(Error);
	})
})