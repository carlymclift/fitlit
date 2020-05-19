const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User-class');
const userData = require('../data/users');
const activityData = require('../data/activity');
const UserRepository = require('../src/UserRepository');
const Activity = require('../src/Activity');


describe('Activity', () => {

	let user1;
	let user2;
	let user3;
	let userRepo;
	let userAct;

	beforeEach(() => {
		user1 = new User(userData[0]);
		user2 = new User(userData[1]);
		user3 = new User(userData[2]);

		userRepo = new UserRepository([user1, user2, user3]);

		userAct = new Activity(user1, activityData);
		userAct.correctActData();
	})

	it('should be a function', () => {
		expect(Activity).to.be.a('function');
	})

	it('should be an instance of Hydration', () => {
		expect(userAct).to.be.an.instanceof(Activity);
	});

	it('should hold data from the user', () => {
		expect(userAct.id).to.equal(user1.id);
	})

	it('should hold data from the user', () => {
		expect(userAct.strideLength).to.equal(user1.strideLength);
	})

	it('should hold data from the user', () => {
		expect(userAct.dailyStepGoal).to.equal(user1.dailyStepGoal);
	})

	it('should throw an error if a new Activity has no user arguments', () => {
		expect(() => { new Activity() }).to.throw(Error);
	})
	
	it('milesWalk method should return the miles walked for a given date', () => {
		let getMiles = userAct.milesWalk('2019/09/22');

		expect(getMiles).to.equal(6.57);
	})

	it('if no date is given when invoked, milesWalk method should throw an error', () => {
		expect(() => { userAct.milesWalk() }).to.throw(Error);
	})

	it('method should return a list of the steps taken daily for the past week', () => {
		let getSteps = userAct.weekMilesWalked('2019/09/22');
		
		expect(getSteps).to.deep.equal([
			9.01, 3.99, 8.12, 9.84, 11.4, 4.65, 6.57
		]);
	})
	
	//TODO: add sad test for .weekMilesWalked method ^^

	it('minActive method should return the minutes active for a given date', () => {
		let getMiles = userAct.minActive('2019/09/22');

		expect(getMiles).to.equal(239);
	})

	it('if no date is given when invoked, minActive method should throw an error', () => {
		expect(() => { userAct.minActive() }).to.throw(Error);
	})

	it('weekMinActive method should return a list of the minutes active for the past week', () => {
		let getMiles = userAct.weekMinActive('2019/09/22');

		expect(getMiles).to.deep.equal([
			300, 288, 80, 218, 262, 137, 239
		]);
	})

	//TODO: add sad test for .weekMinActive method ^^
			
	it('allUserMinActive method should return 163', () => {
		let getAvMin = userAct.allUserMinActive(activityData, "2019/07/11");
		
		expect(getAvMin).to.equal(163);
	})

	it('if no date is given when invoked, allUserMinActive method should throw an error', () => {
		expect(() => { userAct.allUserMinActive() }).to.throw(Error);
	})

	it('stepGoalResult method should tell the user they didn\'t meet their goals for this date', () => {
		let getStepGoalRes = userAct.stepGoalResult('2019/09/22');

		expect(getStepGoalRes).to.equal('You did not meet your step goal today, with 8072 steps.');
	})

	it('if no date is given when invoked, stepGoalResult method should throw an error', () => {
		expect(() => { userAct.stepGoalResult() }).to.throw(Error);
	})

	it('daysGoalAchieved method should list out the dates the stepGoal was reached', () => {
		let goalDays = userAct.daysGoalAchieved();

		expect(goalDays).to.deep.equal([
			"2019/06/17", "2019/06/20", "2019/06/22", "2019/06/23", 
			"2019/06/28", "2019/06/30", "2019/07/05", "2019/07/07", 
			"2019/07/08", "2019/07/09", "2019/07/14", "2019/07/20", 
			"2019/07/21", "2019/07/22", "2019/07/26", "2019/07/31", 
			"2019/08/01", "2019/08/08", "2019/08/10", "2019/08/15", 
			"2019/08/17", "2019/08/24", "2019/08/25", "2019/08/29", 
			"2019/09/05", "2019/09/07", "2019/09/09", "2019/09/11", 
			"2019/09/12", "2019/09/15", "2019/09/16", "2019/09/19", 
			"2019/09/20"]);
	})

	//TODO: Make sad test for .daysGoalAchieved method ^^
	
	it('allUserSteps method should return 8074', () => {
		let getAvSteps = userAct.allUserSteps(activityData, "2019/07/11");
		
		expect(getAvSteps).to.equal(8074);
	})
	
	it('if no date is given when invoked, allUserSteps method should throw an error', () => {
		expect(() => { userAct.allUserSteps() }).to.throw(Error);
	})
	
	//TODO: add happy + sad tests for .stairRecord method
	
	it('stairRecord should return user\'s record stair climb day', () => {
		let getStairRecord = userAct.stairRecord();
		
		expect(getStairRecord).to.equal(
			'Your stair climb record was 49 flights on 2019/07/11!');
		})
		
	//TODO: Make sad test or ^^

	it('allUserStairsClimbed method should return the stairs climbed average for a given date', () => {
		let getAvStairs = userAct.allUserStairsClimbed(activityData, "2019/07/11");

		expect(getAvStairs).to.equal(27);
	})

	it('if no date is given when invoked, allUserStairsClimbed method should throw an error', () => {
		expect(() => { userAct.allUserStairsClimbed() }).to.throw(Error);
	})

	it('friendsSteps', () => {
		let userWk = userAct.avSteps("2019/09/22");
		let getFrSteps = userAct.friendsSteps("2019/09/22", activityData, userRepo);
		let winner = userAct.challengeWinner();
		expect(getFrSteps).to.equal(27);
	})

	//IT5 tests
})