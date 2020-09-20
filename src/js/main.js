import p5 from 'p5/lib/p5.min.js';

let s = (sk) => {
	let flower;
	let snowflakes = []; // array to hold snowflake objects

	let width = window.innerWidth;
	let height = window.innerHeight;

	sk.preload = () => {
		flower = sk.loadImage('../assets/bunga.png');
	};

	sk.setup = () => {
		addAnimateCss();
		sk.createCanvas(width, height);
		sk.background(66);

		// create a random number of snowflakes each frame
		for (let i = 0; i < 10; i++) {
			snowflakes.push(new snowflake()); // append snowflake object
		}
	};

	sk.draw = () => {
		sk.background(66);
		// sk.image(flower, sk.mouseX - 25, sk.mouseY - 25, 50, 50);

		let t = sk.frameCount / 60; // update time

		// loop through snowflakes with a for..of loop
		for (let flake of snowflakes) {
			flake.update(t); // update snowflake position
			flake.display(); // draw snowflake
		}
	};

	// snowflake class
	function snowflake() {
		// initialize coordinates
		this.posX = 0;
		this.posY = sk.random(-50, 0);
		this.initialangle = sk.random(0, 2 * sk.PI);
		this.size = sk.random(2, 5);

		// radius of snowflake spiral
		// chosen so the snowflakes are uniformly spread out in area
		this.radius = sk.sqrt(sk.random(sk.pow(width / 2, 2)));

		this.update = function(time) {
			// x position follows a circle
			let w = 0.6; // angular speed
			let angle = w * time + this.initialangle;
			this.posX = width / 2 + this.radius * sk.sin(angle);

			// different size snowflakes fall at slightly different y speeds
			this.posY += sk.pow(this.size, 0.5);

			// delete snowflake if past end of screen
			if (this.posY > height + 50) {
				let index = snowflakes.indexOf(this);
				// snowflakes.splice(index, 1);
				this.posY = -50;
			}
		};

		this.display = function() {
			// sk.ellipse(this.posX, this.posY, this.size);
			sk.image(flower, this.posX - 25, this.posY - 25, 25, 25);
		};
	}
};

const P5 = new p5(s, 'draw');

const addAnimateCss = () => {
	const border = document.querySelector('.border');
	const omar = document.querySelector('#Omar');
	const and = document.querySelector('#and');
	const amirah = document.querySelector('#Amirah');
	const welcomeNote = document.querySelector('#hajat-title');
	const hajat = document.querySelector('#hajat');

	document.querySelector('#kad').classList.remove('cover');

	border.classList.add('animate__animated', 'animate__fadeIn', 'animate__delay-2s');
	omar.classList.add('animate__animated', 'animate__fadeInRight', 'animate__delay-2s');
	and.classList.add('animate__animated', 'animate__fadeIn', 'animate__delay-2s');
	amirah.classList.add('animate__animated', 'animate__fadeInLeft', 'animate__delay-2s');
	welcomeNote.classList.add('animate__animated', 'animate__fadeIn', 'animate__delay-4s');
	hajat.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-4s');
};

import '../scss/main.scss';
