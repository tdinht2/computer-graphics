// Project 2B code
// Tien Tran
// I am replicating 2 Mudkip objects using instancing


let time = 0;  // track the passage of time, used to move the objects

// called once at the start
function setup() {
  createCanvas(600, 600, WEBGL);
  
  let fov = 60.0;  // 60 degrees FOV
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
}

// this is called repeatedly to draw new per-frame images
function draw() {
  
  background(86, 99, 166);  // night-sky background
  
  // set the virtual camera position
  if (time < 5) {
    camera(-170, -60, 0, 0, 0, 0, 0, 1, 0);  // from, at, up
  } else if (time >= 5 && time < 8) {
    camera((21.25 * time) + -170, -60, 25 * time, 0, 0, 0, 0, 1, 0);
  }
  // include some light even in shadows
  ambientLight(60, 60, 60);
  
  // set light position, represents the light from the moon
  pointLight(255, 255, 255, 0, -100, 0);

  noStroke();  // do not draw polygon outlines
  
  push();
  fill(224, 213, 146);
  sphere(60);
  pop();
  
  push();
  fill(15, 150, 255);
  translate(0, 20, 0);
  box(1000, 100, 1000);
  pop();
  
  if (time < 5) {
  let axis = createVector(0.0, 0.0, time);
  push();
  //rotate(-time, axis);
  translate(-170, -30, 0);
  translate(time * 22, 0, 0);
  scale(0.5);
  createMudkip();
  pop();
  
  push();
  translate(30, -60, 0);
  rotate(Math.PI / 6);
  scale(0.5);
  createMudkip();
  pop();
  } else if (time >= 5 && time < 8) {
    push();
    translate(30, -60, 0);
    rotate(Math.PI / 6);
    scale(0.5);
    createMudkip();
    pop();
    
    push();
    translate(-63, 10, 0);
    translate(-40 + (time * 10), ( - (time * 9)), 0);
    rotate(Math.PI / -6);
    scale(0.5);
    createMudkip();
    pop();
    
  } else if (time >= 8 && time < 9) {
    push();
    translate(30, -60, 0);
    rotate(Math.PI / 6);
    scale(0.5);
    createMudkip();
    pop();
    
    push();
    translate(-15, -65, 0);
    scale(0.5);
    createMudkip();
    pop();
  } else if (time >= 9 && time < 11) {
    push();
    translate(-15, -65, 0);
    scale(0.5);
    createMudkip();
    pop();
    
    push();
    fill(15, 150, 255);
    translate(10, -68, 0);
    rotate(Math.PI / 2);
    cone(10, 40);
    pop();
    
    push();
    translate(-690 + (time * 80), -105 + (time * 5), 0); 
    rotate(time * 20);
    scale(0.5);
    createMudkip();
    pop();
  } else if (time >= 11 && time < 11.5) {
    push();
    translate(-15, 485 - (time * 50), 0);
    rotate(time * 7.5);
    scale(0.5);
    createMudkip();
    pop();
  } else if (time >= 11.5 && time < 12) {
    push();
    translate(-15, -665 + (time * 50), 0);
    rotate(time * 7.5);
    scale(0.5);
    createMudkip();
    pop();
  } else if (time >= 12 && time < 13) {
    push();
    translate(-15, -65, 0);
    scale(0.5);
    createMudkip();
    pop();
  }
    else {
    time = 0;
  }
  
  time += 0.03;  // update the time
}

function createMudkip() {
  //Mudkip Body
  fill(50, 170, 240);
  push();
  translate(0, 0);
  let cyl_axis = createVector (0.0, 0.0, 1.0);
  rotate (Math.PI / 2, cyl_axis);
  cylinder(10, 25);
  pop();
  
  //Mudkip Legs
  fill(50, 170, 240);
  push();
  translate(8, 10, 5);
 let leg1 = createVector (0.0, 0.0, 1.0);
  rotate (0, cyl_axis);
  cylinder(3, 8);
  pop();
  
  fill(50, 170, 240);
  push();
  translate(-8, 10, 5);
 let leg3 = createVector (0.0, 0.0, 1.0);
  rotate (0, cyl_axis);
  cylinder(3, 8);
  pop();
  
  fill(50, 170, 240);
  push();
  translate(8, 10, -5);
  let leg2 = createVector (0.0, 0.0, 1.0);
  rotate (0, cyl_axis);
  cylinder(3, 8);
  pop();
  
  fill(50, 170, 240);
  push();
  translate(-8, 10, -5);
  let leg4 = createVector (0.0, 0.0, 1.0);
  rotate (0, cyl_axis);
  cylinder(3, 8);
  pop();
  
  //Mudkip Head
  fill(50, 170, 240);
  push();
  translate(10, -8);
  scale(2)
  sphere(6.5);
  pop();
  
  //Mudkip Cheeks
  fill(240, 155, 43);
  push();
  translate(14, -8, 10);
  sphere(6);
  pop();
  
  fill(240, 155, 43);
  push();
  translate(14, -8, -10);
  sphere(6);
  pop();
  
  //Mudkip Eyes
  fill(0, 0, 0);
  push();
  translate(18, -12, -5);
  sphere(4);
  pop();
  
  fill(0, 0, 0);
  push();
  translate(18, -12, 5);
  sphere(4);
  pop();
  
  //Mudkip Mouth
  fill(242, 126, 171);
  push();
  translate(19, -4, 0);
  sphere(4);
  pop();
  
  //Mudkip headfin
  fill(50, 170, 240);
  push();
  translate(15, -20, 0);
  cylinder(6, 20);
  pop();
  
  //Mudkip Tail
  fill(165, 213, 242);
  push();
  translate(-14, -4, 0);
  let cone_axis = createVector (0.0, 0.0, 1.0);
  rotate (55, cone_axis);
  cone(10, 25);
  pop();
  
  //Mudkip Cheekfins
  fill(240, 126, 19);
  push();
  translate(20, -4, 12);
  let cheek1 = createVector (0.0, 0.0, 1.0);
  rotate (40, cone_axis);
  cone(1, 10);
  pop();
  
  fill(240, 126, 19);
  push();
  translate(20, -10, 12);
  let cheek2 = createVector (0.0, 0.0, 1.0);
  rotate (45, cone_axis);
  cone(1, 10);
  pop();
  
  fill(240, 126, 19);
  push();
  translate(20, -7, 12);
  rotate (Math.PI / 2);
  cone(1, 10);
  pop();
  
  fill(240, 126, 19);
  push();
  translate(20, -4, -12);
  let cheek3 = createVector (0.0, 0.0, 1.0);
  rotate (40, cone_axis);
  cone(1, 10);
  pop();
  
  fill(240, 126, 19);
  push();
  translate(20, -10, -12);
  let cheek4 = createVector (0.0, 0.0, 1.0);
  rotate (45, cone_axis);
  cone(1, 10);
  pop();
  
  fill(240, 126, 19);
  push();
  translate(20, -7, -12);
  rotate (Math.PI / 2);
  cone(1, 10);
  pop();
  
  //Mudkip Underbelly
  fill(165, 213, 242);
  push();
  translate(8.5, 7.5, 0);
  rotate (Math.PI / 2);
  cone(3, 10);
  pop();
}
