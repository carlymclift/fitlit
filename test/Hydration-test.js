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

	it('should be a function', () => {
		expect(Hydration).to.be.a('function');
	})

	it('should be an instance of Hydration', () => {
		expect(userHydration).to.be.an.instanceof(Hydration);
	});

	it('should hold data from the user', () => {
		expect(userHydration).to.deep.equal(user1);
	})
	
	it('should throw an error if a new Hydration has no user argument', () => {
		expect(() => { new Hydration() }).to.throw(Error);
	})

	it('should be able to get the average daily hydration for each user for all time ', () => {
		let getAverage = userHydration.findHydrationAverage(1);

		expect(getAverage).to.equal(58);
  })

  it('findOuncesForDay method should return the ounces consumed for the given day', () => {

		let getData = userHydration.findOuncesForDay('2019/06/15');

		expect(getData).to.equal(37);
	})
	
	it('if no date is given when invoked, findOuncesForDay method should throw an error', () => {
		expect(() => { userHydration.findOuncesForDay() }).to.throw(Error);
  })

	it('findOuncesForWeek method should return the ounces consumed for the past 7 days, when given any date', () => {
		let getData = userHydration.findOuncesForWeek('2019/07/17');

		expect(getData).to.deep.equal([
			88, 88, 54, 27, 84, 21, 56
		]);
	})
	
	it('findOuncesForWeek method should return the ounces consumed for the past 7 days when given the most current date', () => {
		let getData = userHydration.findOuncesForWeek('2019/09/22');

		expect(getData).to.deep.equal([
			82, 72, 86, 53, 23, 48, 68
		]);
	})
	
	it('if no date is given when invoked, findOuncesForWeek method should throw an error', () => {
		expect(() => { userHydration.findOuncesForWeek() }).to.throw(Error);
  })
})