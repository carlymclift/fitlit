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
	const userArray = userData.map((user) => new User(user));
	const userRepo = new UserRepository(userArray);
	let userAct;

	beforeEach(() => {
		user1 = new User(userRepo.data[0]);
		user2 = new User(userRepo.data[1]);

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
		const getMiles = userAct.milesWalk('2019/09/22');

		expect(getMiles).to.equal(6.57);
	})

	it('if no date is given when invoked, milesWalk method should throw an error', () => {
		expect(() => { userAct.milesWalk() }).to.throw(Error);
	})

	it('method should return a list of the steps taken daily for the past week', () => {
		const getSteps = userAct.weekMilesWalked('2019/09/22');
		
		expect(getSteps).to.deep.equal([
			9.01, 3.99, 8.12, 9.84, 11.4, 4.65, 6.57
		]);
	})
	
	it('if no date is given when invoked, weekMilesWalked method should return an empty array', () => {
		const getSteps = userAct.weekMilesWalked();
		
		expect(getSteps).to.deep.equal([]);
	})

	it('minActive method should return the minutes active for a given date', () => {
		const getMiles = userAct.minActive('2019/09/22');

		expect(getMiles).to.equal(239);
	})

	it('if no date is given when invoked, minActive method should throw an error', () => {
		expect(() => { userAct.minActive() }).to.throw(Error);
	})

	it('weekMinActive method should return a list of the minutes active for the past week', () => {
		const getMin = userAct.weekMinActive('2019/09/22');

		expect(getMin).to.deep.equal([
			300, 288, 80, 218, 262, 137, 239
		]);
	})

	it('if no date is given when invoked, weekMinActive method should return an empty array', () => {
		const getMin = userAct.weekMinActive();
		
		expect(getMin).to.deep.equal([]);
	})
			
	it('allUserMinActive method should return 163', () => {
		const getAvMin = userAct.allUserMinActive(activityData, "2019/07/11");
		
		expect(getAvMin).to.equal(163);
	})

	it('if no date is given when invoked, allUserMinActive method should throw an error', () => {
		expect(() => { userAct.allUserMinActive() }).to.throw(Error);
	})

	it('stepGoalResult method should tell the user they didn\'t meet their goals for this date', () => {
		const getStepGoalRes = userAct.stepGoalResult('2019/09/22');

		expect(getStepGoalRes).to.equal('You did not meet your step goal today, with 8072 steps.');
	})

	it('if no date is given when invoked, stepGoalResult method should throw an error', () => {
		expect(() => { userAct.stepGoalResult() }).to.throw(Error);
	})

	it('daysGoalAchieved method should list out the dates the stepGoal was reached', () => {
		const goalDays = userAct.daysGoalAchieved();

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

	it('if daysGoalAchieved is invoked on a separate user, the main user\'s data won\'t show', () => {
		const userAct2 = new Activity(user2, activityData);
		const goalDays = userAct2.daysGoalAchieved();

		expect(goalDays).to.not.equal([
			"2019/06/17", "2019/06/20", "2019/06/22", "2019/06/23", 
			"2019/06/28", "2019/06/30", "2019/07/05", "2019/07/07", 
			"2019/07/08", "2019/07/09", "2019/07/14", "2019/07/20", 
			"2019/07/21", "2019/07/22", "2019/07/26", "2019/07/31", 
			"2019/08/01", "2019/08/08", "2019/08/10", "2019/08/15", 
			"2019/08/17", "2019/08/24", "2019/08/25", "2019/08/29", 
			"2019/09/05", "2019/09/07", "2019/09/09", "2019/09/11", 
			"2019/09/12", "2019/09/15", "2019/09/16", "2019/09/19", 
			"2019/09/20"
		]);
	})
	
	it('allUserSteps method should return 8074', () => {
		const getAvSteps = userAct.allUserSteps(activityData, "2019/07/11");
		
		expect(getAvSteps).to.equal(8074);
	})
	
	it('if no date is given when invoked, allUserSteps method should throw an error', () => {
		expect(() => { userAct.allUserSteps() }).to.throw(Error);
	})
		
	it('stairRecord should return user\'s record stair climb day', () => {
		const getStairRecord = userAct.stairRecord();
		
		expect(getStairRecord.stairFlights).to.equal(49);
		expect(getStairRecord.date).to.equal('2019/07/11');
	})

	it('if stairRecord is invoked on a separate user, the main user\'s data won\'t show', () => {
		const userAct2 = new Activity(user2, activityData);
		const goalDays = userAct2.stairRecord();

		expect(goalDays).to.not.equal('Your stair climb record was 49 flights on 2019/07/11!');
	})
		
	it('allUserStairsClimbed method should return the stairs climbed average for a given date', () => {
		const getAvStairs = userAct.allUserStairsClimbed(activityData, "2019/07/11");

		expect(getAvStairs).to.equal(27);
	})

	it('if no date is given when invoked, allUserStairsClimbed method should throw an error', () => {
		expect(() => { userAct.allUserStairsClimbed() }).to.throw(Error);
	})

	it('userStairsWeek method should update the stairs property to equal the stairs climbed for the past week of a given date', () => {
		userAct.userStairsWeek("2019/09/22");

		expect(userAct.stairs).to.equal(176);
	})

	it('if no date is given when userStairsToday method is invoked, the Activity\'s stairs property stays at 0', () => {
		userAct.userStairsWeek();
		
		expect(userAct.stairs).to.equal(0);
	})
	
	it('userStairsToday method should return the stairs climbed for a given date', () => {
		const todayStairs = userAct.userStairsToday("2019/09/22");

		expect(todayStairs).to.equal(23);
	})

	it('if no date is given when userStairsToday method is invoked, an error should throw', () => {		
		expect(() => { userAct.userStairsToday() }).to.throw(Error);
	})

	it('weekSteps method should return the total steps taken for a given week', () => {
		userAct.weekSteps('2019/09/22');

		expect(userAct.wkSteps).to.equal(53954);
	})

	it('if no date is given when invoked, the weekSteps property will remain at 0', () => {
		userAct.weekSteps();

		expect(userAct.wkSteps).to.equal(0);
	})

	it('friendsSteps method should return the names and total steps for the user\'s friends for the week', () => {
		userAct.friendsSteps('2019/09/22', activityData, userRepo);

		expect(userAct.friendsWkSteps).to.deep.equal([
			{ "user": "Garnett Cruickshank", "weekTotal": 60326 }, 
			{ "user": "Mae Connelly", "weekTotal": 53911 }, 
			{ "user": "Laney Abshire", "weekTotal": 44988 }
		]);
	})

	it('if friendsSteps method is missing an argument, an error should stop the function', () => {
		expect( () => { userAct.friendsSteps('2019/09/22', userRepo) } ).to.throw(Error);
	})

	it('challengeWinner method should declare ____ as the winner this week', () => {
		userAct.weekSteps('2019/09/22');
		userAct.friendsSteps('2019/09/22', activityData, userRepo);

		expect(userAct.challengeWinner()).to.deep.equal({ user: 'Garnett Cruickshank', weekTotal: 60326 });
	})

	it('if challengeWinner is invoked before any friend week data is logged, the returned object won\'t be the real winner and have empty data', () => {
		const findWinner = userAct.challengeWinner();

		expect(findWinner).to.deep.equal({ user: 1, weekTotal: 0 });
	})
})