const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User-class');
const userData = require('../data/users');
const sleepData = require('../data/sleep');
const UserRepository = require('../src/UserRepository');
const Sleep = require('../src/Sleep');

console.log(sleepData)
describe('Sleep', () => {

	let user1;
	let user2;
	let user3;
	let user4;
	let userRepo;
	let userSleep;

	beforeEach(() => {
		user1 = new User(userData[0]);
		user2 = new User(userData[1]);
		user3 = new User(userData[2]);
		user4 = new User(userData[23]);

		userRepo = new UserRepository([user1, user2, user3, user4]);

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
		let getSleepAv = userSleep.findUserAverageSleep(sleepData);

		expect(getSleepAv).to.equal(8);
	})
	
	it('if no user id is given, findUserAverageSleep method should throw an error', () => {
		expect(() => { userSleep.findUserAverageSleep() }).to.throw(Error);
	})
	
	it('should be able to get the average sleep quality for each user by id, for all time', () => {
		let getQualityAv = userSleep.findUserAverageQuality(sleepData);

		expect(getQualityAv).to.equal(3);
	})

	it('if no user id is given, findUserAverageQuality method should throw an error', () => {
		expect(() => { userSleep.findUserAverageQuality() }).to.throw(Error);
	})

	it('should be able to find the hours of sleep for each user by id, for a given day', () => {
		let getDaySleep = userSleep.findUserSleepForDay('2019/06/15');

		expect(getDaySleep).to.equal(6.1);
	})

	it('if no user date is given, findUserSleepForDay method should throw an error', () => {
		expect(() => { userSleep.findUserSleepForDay() }).to.throw(Error);
	})

	it('should be able to find the quality of sleep for each user by id, for a given day', () => {
		let getQualitySleep = userSleep.findUserSleepQualityForDay('2019/06/15');

		expect(getQualitySleep).to.equal(2.2);
	})

	it('if no user date is given, findUserSleepQualityForDay method should throw an error', () => {
		expect(() => { userSleep.findUserSleepQualityForDay() }).to.throw(Error);
	})

	it('should be able to find the average sleep for each user by id, for a given week', () => {
		let getSleep = userSleep.findUserSleepForWeek('2019/09/02');

		expect(getSleep).to.deep.equal([
			 5.4, 7.9, 9.9, 4.3, 7.1, 4.4, 7.7 
		]);
	})

	it('should be able to find the average sleep quality for each user by id, for a given week', () => {
		let getSleepQual = userSleep.findUserQualityForWeek('2019/09/02');

		expect(getSleepQual).to.deep.equal([
			 1.4, 1.6, 1.6, 1.6, 1.9, 2.7, 4.4 
		]);
	})

	it('should be able to find the average sleep for all users, all time', () => {
		let getSleepAv = userSleep.findAverageSleep();

		expect(getSleepAv).to.equal(8);
	})

	it('should be able to find the sleepiest user for a given date', () => {
		let findSleepy = userSleep.findSleepiest(sleepData, '2019/07/21', userRepo);

		expect(findSleepy).to.equal('User Kristin Cruickshank slept the most this day, they slept 10.6 hours -- WOW!');
	})

	// it('should return the users with the best sleep week, quality over 3', () => {
	// 	let findBest = userSleep.findBestSleepers(sleepData, '2019/07/21', userRepo);

	// 	expect(findBest).to.deep.equal([
	// 		1,  4,  6,  7,  8,  9, 10, 14,
	// 	 15, 17, 18, 20, 22, 23, 24, 28,
	// 	 29, 31, 33, 34, 35, 37, 38, 40,
	// 	 43, 44, 47
	//  ]);
	// })
})