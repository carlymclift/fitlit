const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User-class');
const userData = require('../data/users');
const sleepData = require('../data/sleep');
const UserRepository = require('../src/UserRepository');
const Sleep = require('../src/Sleep');


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

	it('should be an instance of Hydration', () => {
		expect(userAct).to.be.an.instanceof(Sleep);
	});

	it('should hold data from the user', () => {
		expect(userSleep.id).to.equal(user1.id);
	})
})