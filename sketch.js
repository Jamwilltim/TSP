let towns = [];
let totalTowns = 8;
let bestTourDst;
let indices = [];
let bestIndices;
let running = false;
let ran = false;
let slider = document.getElementById("towns");

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	for (let i = 0; i < totalTowns; i++) {
		let pos = createVector(random(40, width - 40), random(40, height - 40));
		towns.push(pos);
		indices.push(i);
	}

	bestTourDst = pow(10, 25);
	slider = createSlider(4, 11, 8, 1);
	slider.position(8, 55);
	slider.class("slider");
}

function draw() {
	background(45);
	fill(255);
	noStroke();
	for (let i = 0; i < totalTowns; i++) {
		circle(towns[i].x, towns[i].y, 18);
	}
	if (running) {
		solve();
		running = false;
	}
	noFill();
	stroke(255);
	if (ran && !running) {
		beginShape();
		for (let i = 0; i < towns.length; i++) {
			let n = bestIndices[i];
			vertex(towns[n].x, towns[n].y);
		}
		vertex(towns[bestIndices[0]].x, towns[bestIndices[0]].y);
		endShape();
	}
	textAlign(CENTER, CENTER);
	text(slider.value(), 220, 63);
}

function solve() {
	// Generate with length - 1 to keep one element fixed in place
	// This avoids repetition of same path but starting at a different point
	GenerateSolutions(indices, indices.length - 1);
	running = false;
}

function GenerateSolutions(indices, n) {
	if (n == 1) {
		EvaluateSolution();
	} else {
		for (let i = 0; i < n; i++) {
			GenerateSolutions(indices, n - 1);
			// Ternary operator: var = (condition) ? "if true" : "if false"
			let swapIndex = n % 2 == 0 ? i : 0;
			let prev = indices[swapIndex];
			indices[swapIndex] = indices[n - 1];
			indices[n - 1] = prev;
		}
	}
}

function EvaluateSolution() {
	if (indices[0] < indices[indices.length - 2]) {
		let tourDst = 0;
		for (i = 0; i < indices.length; i++) {
			let nextIndex = (i + 1) % indices.length;
			let interval = dist(towns[indices[i]].x, towns[indices[i]].y, towns[indices[nextIndex]].x, towns[indices[nextIndex]].y);
			tourDst += interval;
		}
		if (tourDst < bestTourDst) {
			bestTourDst = tourDst;
			bestIndices = indices.slice();
		}
	}
}

function run() {
	running = true;
	ran = true;
}

function refreshing() {
	running = false;
	bestTourDst = pow(10, 25);
	totalTowns = slider.value();
	ran = false;
	towns = [];
	indices = [];
	for (let i = 0; i < totalTowns; i++) {
		let pos = createVector(random(40, width - 40), random(40, height - 40));
		towns.push(pos);
		indices.push(i);
	}
}
