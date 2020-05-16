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
	let userRepo;
	let userSleep;

	beforeEach(() => {
		user1 = new User(userData[0]);
		user2 = new User(userData[1]);
		user3 = new User(userData[2]);

		userRepo = new UserRepository([user1, user2, user3]);

		userSleep = new Sleep(user1, sleepData);
		userSleep.getUserSleepData();
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
		let getSleep = userSleep.findUserAverageSleepForWeek('2019/09/02');

		expect(getSleep).to.equal(7);
    })

    it('if no user date is given, findUserSleepForWeek method should throw an error', () => {
		expect(() => { userSleep.findUserAverageSleepForWeek() }).to.throw(Error);
    })

    it('should be able to find the average sleep quality for each user by id, for a given week', () => {
		let getSleepQual = userSleep.findUserAverageQualityForWeek('2019/09/02');

		expect(getSleepQual).to.equal(2);
    })

    it('should be able to find the average sleep for all users, all time', () => {
		let getSleepAv = userSleep.findAverageSleep();

		expect(getSleepAv).to.equal(8);
    })

    it('should be able to find all users with sleep quality better than 3 for a given week', () => {
		let getUsers = userSleep.findBestSleepQualityForWeek('2019/07/21');

		expect(getUsers).to.equal([]);
    })
})