const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User-class');
const userData = require('../data/users');
const UserRepository = require('../src/UserRepository');
const Hydration = require('../src/Hydration');

describe('Hydration', () => {

	let user1;
	let user2;
	let user3;
	let userRepo;
	let userHydration;

	beforeEach(() => {
		user1 = new User(userData[0]);
		user2 = new User(userData[1]);
		user3 = new User(userData[2]);

		userRepo = new UserRepository([user1, user2, user3]);

		userHydration = new Hydration(user1);
	})

	it('findOuncesForDay method should return the accurate ounce number', () => {
		let getData = userHydration.findOuncesForDay('2019/06/15');

		expect(getData).to.deep.equal(37);
  })

})