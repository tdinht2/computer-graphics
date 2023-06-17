// Project 3 CS 3451
// Tien Tran
// these are the routines that you should write for the project
var background = [];
var fovAngle = 0;
var lightList = [];
var eyepos = [0.0, 0.0, 0.0];
var eyedir = [new p5.Vector([1], [0], [0]), new p5.Vector([0], [1], [0]), new p5.Vector([0], [0], [1])];
var materials;
var cylinderList = [];

function reset_scene() {
  background = [];
  fovAngle = 0;
  lightList = [];
  eyepos = [0.0, 0.0, 0.0];
  eyedir = [new p5.Vector([1], [0], [0]), new p5.Vector([0], [1], [0]), new p5.Vector([0], [0], [1])];
  materials = [];
  cylinderList = [];
}

function set_background (r, g, b) {
  background = [r, g, b];
}

function set_fov (angle) {
  fovAngle = 1 / tan(radians(angle) / 2);
}

function new_light (r, g, b, x, y, z) {
  lightList.push(new light(r, g, b, x, y, z));
}

function new_material (dr, dg, db,  ar, ag, ab,  sr, sg, sb,  pow,  k_refl) {
  materials = [dr, dg, db];
}

function new_cylinder (x, y, z, radius, h) {
  cylinderList.push(new cylinder(x, y, z, radius, h));
}

function createEyeRay(i, j) {
  return new ray(i, j);
}

function draw_scene() {
  
  noStroke();

  // go through all the pixels in the image
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      
      // add your ray creation and scene intersection code here
      let rayFromEye = createEyeRay(x, y);
      
      var nearestCyl = null;
      var t = null;
      
      for (i = 0; i < cylinderList.length; i++) {
        let t2 = calculate(rayFromEye, cylinderList[i]);
        if (t2 >= 0 && t == null) {
          t = t2;
          nearestCyl = cylinderList[i];
        } else if (t != null && (t > t2 && 0 <= t2)) {
          nearestCyl = cylinderList[i];
          t = t2;
        }
      }

      // set the pixel color to the shaded color of the ray
      
      let r;
      let g;
      let b;
      
      if (nearestCyl == null) {
        r = background[0];
        g = background[1];
        b = background[2];
      } else {
        totalR = 0;
        totalG = 0;
        totalB = 0;
        
        for (i = 0; i < lightList.length; i++) {
          let currentX = (rayFromEye.direction.x * t) + rayFromEye.xPos;
          let currentY = (rayFromEye.direction.y * t) + rayFromEye.yPos;
          let currentZ = (rayFromEye.direction.z * t) + rayFromEye.zPos;
          
          if (currentY >= nearestCyl.y && currentY <= nearestCyl.y + nearestCyl.h) {
          let l = (new p5.Vector(lightList[i].x - currentX, 0, lightList[i].z - currentZ)).normalize();
          let n = (new p5.Vector(currentX - nearestCyl.x, 0, currentZ - nearestCyl.z)).normalize();
          
          totalR += nearestCyl.dr *  max(0, p5.Vector.dot(n, l)) * lightList[i].r;
          totalG += nearestCyl.dg *  max(0, p5.Vector.dot(n, l)) * lightList[i].g;
          totalB += nearestCyl.db *  max(0, p5.Vector.dot(n, l)) * lightList[i].b;
          } else {
            totalR = background[0];
            totalG = background[1];
            totalB = background[2];
          }
        }
        r = totalR;
        g = totalG;
        b = totalB;
      }
      fill (r * 255, g * 255, b * 255);

      // draw a little rectangle to fill the pixel
      rect (x, y, 1, 1);
    }
  }

}

function calculate(ray, cylinder) {
  let a = pow(ray.direction.x, 2) + pow(ray.direction.z, 2);
  let b = 2 * (ray.xPos - cylinder.x) * ray.direction.x + 2 * (ray.zPos - cylinder.z) * ray.direction.z;
  let c = pow(ray.xPos - cylinder.x, 2) + pow(ray.zPos - cylinder.z, 2) - pow(cylinder.rad, 2);
  let discr = pow(b, 2) - 4 * a * c;
  
  if(discr < 0) {
    return -1;
  } else {
    let t = ((-1 * b)+sqrt(discr))/(2*a);
    let t2 = ((-1 * b)-sqrt(discr))/(2*a);
    
    rt1 = ray.yPos + t * (ray.direction.y);
    rt2 = ray.yPos + t2 * (ray.direction.y);
    
    if (rt1 >= cylinder.y && rt1 <= (cylinder.y + cylinder.h)) {
      if (rt2 >= cylinder.y & rt2 <= (cylinder.y + cylinder.h)) {
        return Math.min(t,t2);
      }
      return t;
    } else {
      if (rt2 >= cylinder.y & rt2 <= (cylinder.y + cylinder.h)) {
        return t2;
      } else {
       return -1; 
      }
    }
    return t;
  }
}

class ray {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    
    this.xPos = eyepos[0];
    this.yPos = eyepos[1];
    this.zPos = eyepos[2];

    let k = -1 + (2 * i / width);
    let p = -1 + (2 * j / height);
    
    let k2 = eyedir[0].copy().mult(k);
    let p2 = eyedir[1].copy().mult(-p);
    let kp = eyedir[2].copy().mult(-fovAngle);

    let dir = new p5.Vector.add(k2.copy(), p2.copy());
    this.direction = p5.Vector.add(dir.copy(), kp.copy());   
  }
}

class cylinder {
  constructor(newX, newY, newZ, radius, h) {
    this.x = newX;
    this.y = newY;
    this.z = newZ;
    this.rad = radius;
    this.h = h;
    this.dr = materials[0];
    this.dg = materials[1];
    this.db = materials[2];
  }
}

class light {
  constructor(newR, newG, newB, newX, newY, newZ) {
    this.r = newR;
    this.g = newG;
    this.b = newB;
    this.x = newX;
    this.y = newY;
    this.z = newZ;
  }
}
