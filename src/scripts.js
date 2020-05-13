// const UserRepository = require('./UserRepository');
// const userData = require('../data/users');

let welcomeTitle = document.querySelector('.welcome');

let userArray = [];

userData.forEach(user => {
	let currentUser = new User(user.id, user.name, user.address, user.email, user.strideLength, user.dailyStepGoal, user.friends)
	userArray.push(user);
})

const currentUserData = new UserRepository(userArray);
let randomUser = {};


let chooseRandom = () => {
	let randomNum = (Math.floor(Math.random() * currentUserData.data.length));
	randomUser = currentUserData.data[randomNum];
}

let changeWelcome = () => {
	chooseRandom();
	welcomeTitle.innerText = `Welcome ${randomUser.name}!`;
}


window.addEventListener('load', changeWelcome);
//DOM -- info card displays all user's info

//step goal - display how current user's step goal
//compares to avg step goal for all users