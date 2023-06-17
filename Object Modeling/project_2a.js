// Sample code for Project 2A
// Tien Tran
// Draws 3D Primitives (box, cylinder, sphere, cone, torus)


let time = 0;  // track the passage of time, used to move the objects

// called once at the start
function setup() {
  createCanvas(600, 600, WEBGL);
  
  let fov = 60.0;  // 60 degrees FOV
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
}

// this is called repeatedly to draw new per-frame images
function draw() {
  
  background(220, 220, 255);  // light blue background
  
  // set the virtual camera position
  camera(0, 0, 85, 0, 0, 0, 0, 1, 0);  // from, at, up
  
  // include some light even in shadows
  ambientLight(60, 60, 60);
  
  // set light position
  pointLight(255, 255, 255, 100, -100, 300);

  noStroke();  // do not draw polygon outlines
  
  let delta = 25;
  let axis = createVector(0.0, 1.0, 0.0);
  push();
  rotate(-time, axis);
  
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

  pop();
  
  time += 0.03;  // update the time
}
