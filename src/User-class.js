class User {
	constructor(userData) {
		if (userData) {
			this.id = userData.id;
			this.name = userData.name;
			this.address = userData.address;
			this.email = userData.email;
			this.strideLength = userData.strideLength;
			this.dailyStepGoal = userData.dailyStepGoal;
			this.friends = userData.friends;
}}

	findName() {
		const splitName = this.name.split(' ');

		return splitName[0];
	}

	updateFriendName(givenClass) {
		this.friends = this.friends.map(friend => {
			const foundName = givenClass.data.find(dataPt => {
				return dataPt.id === friend;
			}).name;
			return foundName;
		})
	}
}


if (typeof module !== 'undefined') {
  module.exports = User;
}