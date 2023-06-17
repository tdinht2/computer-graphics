// Project 3b CS 3451
// Tien Tran
// Here are the two new routines that you should add to your ray tracer for Part B
var background = [];
var fovAngle = 0;
var lightList = [];
var eyepos = [0.0, 0.0, 0.0];
var eyedir = [new p5.Vector([1], [0], [0]).normalize(), new p5.Vector([0], [1], [0]).normalize(), new p5.Vector([0], [0], [1]).normalize()];
var materials;
var cylinderList = [];
//New Variables
var ambR = 0;
var ambG = 0;
var ambB = 0;
var sphereList = [];
var ambient = [];
var specular = [];
var specPow = 0;
var refl = 0;
var maxDepth = 3;

function new_sphere (x, y, z, radius) {
  sphereList.push(new sphere(x, y, z, radius));
}

function ambient_light (r, g, b) {
  ambR = r;
  ambG = g;
  ambB = b;
}

// You should swap in your routines from Part A for the placeholder routines below

function reset_scene() {
  background = [];
  fovAngle = 0;
  lightList = [];
  eyepos = [0.0, 0.0, 0.0];
  eyedir = [new p5.Vector([1], [0], [0]).normalize(), new p5.Vector([0], [1], [0]).normalize(), new p5.Vector([0], [0], [1]).normalize()];
  materials = [];
  cylinderList = [];
  ambR = 0;
  ambG = 0;
  ambB = 0;
  sphereList = [];
  ambient = [];
  specular = [];
  specPow = 0;
  refl = 0;
  spheres = [];
  maxDepth = 3;
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

function new_material (dr, dg, db, ar, ag, ab, sr, sg, sb, pow, k_refl) {
  materials = [dr, dg, db];
  ambient = [ar, ag, ab];
  specular = [sr, sg, sb];
  specPow = pow;
  refl = k_refl;
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
      var r = 0;
      var g = 0;
      var b = 0;


      // add your ray creation and scene intersection code here
      var rayFromEye = createEyeRay(x, y);
      var rayValues = rayTrace(rayFromEye);
      var rayColors = shade(rayFromEye, rayValues[0], rayValues[1], rayValues[2], 0);


      r += rayColors[0];
      g += rayColors[1];
      b += rayColors[2];


      // set the pixel color to the shaded color of the ray

      fill (r * 255, g * 255, b * 255);

      // draw a little rectangle to fill the pixel
      rect (x, y, 1, 1);
    }
  }
}

function rayTrace(rayT) {
  var nearestShape = null;
  var t = null;
  var shape = null;

  for (let i = 0; i < cylinderList.length; i++) {
    let t2 = calculate(rayT, cylinderList[i]);
    let t3 = cylinderCap(rayT, cylinderList[i], 0);
    let t4 = cylinderCap(rayT, cylinderList[i], 1);
    let topX = t3 * rayT.direction.x;
    let topZ = t3 * rayT.direction.z;
    var inRadius = pow((cylinderList[i].x - topX), 2) + pow((cylinderList[i].z - topZ), 2) <= pow(cylinderList[i].rad, 2)

    let botX = t4 * rayT.direction.x;
    let botZ = t4 * rayT.direction.z;
    var inRadius2 = pow((cylinderList[i].x - botX), 2) + pow((cylinderList[i].z - botZ), 2) <= pow(cylinderList[i].rad, 2)
    
    if (t2 >= 0 && t == null) {
      t = t2;
      nearestShape = cylinderList[i];
      shape = 0;
    } else if (t != null && (t > t2 && 0 < t2)) {
      nearestShape = cylinderList[i];
      t = t2;
      shape = 0;
    }

    if (inRadius) {
      if (inRadius2) {
        if (t3 >= 0 && (t == null || t3 < t)) {
          if (t4 >= 0) {
            if (t4 < t3) {
              t = t4;
              nearestShape = cylinderList[i];
              shape = 3;
            } else {
              t = t3;
              nearestShape = cylinderList[i];
              shape = 2;
            }
          } else {
            t = t3;
            nearestShape = cylinderList[i];
            shape = 2;
          }
        } else {
          if (t4 >= 0 && (t == null || t4 < t)) {
            t = t4;
            nearestShape = cylinderList[i];
            shape = 3;
          }
        }
      } else {
        if (t3 >= 0 && (t == null || t3 < t)) {
          t = t3;
          nearestShape = cylinderList[i];
          shape = 2;
        }
      }
    } else {
      if (inRadius2) {
        if (t4 >= 0 && (t == null || t4 < t)) {
          t = t4;
          nearestShape = cylinderList[i];
          shape = 3;
        }
      }
    }
  }

  for (let j = 0; j < sphereList.length; j++) {
    let tSphere = calculateSphere(rayT, sphereList[j]);
    if (tSphere > 0 && t == null) {
      t = tSphere;
      nearestShape = sphereList[j];
      shape = 1;
    } else if (t != null && (t > tSphere && 0 < tSphere)) {
      nearestShape = sphereList[j];
      t = tSphere;
      shape = 1
    }
  }
  return [nearestShape, t, shape];
  
}

function shade(rayT, nearestShape, t, shape, depth) {
  var pixR;
  var pixG;
  var pixB;

  if (nearestShape == null) {
    pixR = background[0];
    pixG = background[1];
    pixB = background[2];
  } else {
    var totalR = 0;
    var totalG = 0;
    var totalB = 0;

    let refR = 0;
    let refG = 0;
    let refB = 0;
    for (let j = 0; j < lightList.length; j++) {

      let currentX = (rayT.direction.x * t) + rayT.xPos;
      let currentY = (rayT.direction.y * t) + rayT.yPos;
      let currentZ = (rayT.direction.z * t) + rayT.zPos;

      var lightVector = new p5.Vector(lightList[j].x - currentX, lightList[j].y - currentY, lightList[j].z - currentZ).normalize();
      let l = (lightVector).normalize();
      let n;
      if (shape == 0) {
        n = (new p5.Vector(currentX - nearestShape.x, 0, currentZ - nearestShape.z)).normalize();
      } else if (shape == 1) {
        //check
        n = (new p5.Vector(currentX - nearestShape.x, currentY - nearestShape.y, currentZ - nearestShape.z)).normalize();
      } else if (shape == 2) {
        n = (new p5.Vector([0], [1], [0])).normalize();
      } else if (shape == 3) {
        n = (new p5.Vector([0], [-1], [0])).normalize();
      }
      var offsetOrigin = n.copy().mult(0.0001);

      //shadow
      var newShadowRay = new shadowR(currentX + offsetOrigin.x, currentY + offsetOrigin.y, currentZ + offsetOrigin.z, lightVector);
      var shadowValues = rayTrace(newShadowRay);
      var shadowT = shadowValues[1];
      var shadowTerm = 1;

      if (shadowT > 0) {
        shadowTerm = 0;
      }

      //specular
      var E = rayT.direction.copy().mult(-1);
      let H = p5.Vector.add(l, E).normalize();
      let specCoefficient = pow(max(0, p5.Vector.dot(n, H)), nearestShape.specPower);
      let specColorR = lightList[j].r * nearestShape.sr * specCoefficient;
      let specColorG = lightList[j].g * nearestShape.sg * specCoefficient;
      let specColorB = lightList[j].b * nearestShape.sb * specCoefficient;

      totalR += ((nearestShape.dr *  max(0, p5.Vector.dot(n, l)) * lightList[j].r) + specColorR) * shadowTerm;
      totalG += ((nearestShape.dg *  max(0, p5.Vector.dot(n, l)) * lightList[j].g) + specColorG) * shadowTerm;
      totalB += ((nearestShape.db *  max(0, p5.Vector.dot(n, l)) * lightList[j].b) + specColorB) * shadowTerm;

      //reflect
      if (depth < maxDepth) {
        if (nearestShape.k_refl > 0) {
          var R = reflect(rayT.direction, n);
          var newReflectedRay = new reflectedR(currentX + offsetOrigin.x, currentY + offsetOrigin.y, currentZ + offsetOrigin.z, R);
          var reflectedValues = rayTrace(newReflectedRay);
          var colors = shade(newReflectedRay, reflectedValues[0], reflectedValues[1], reflectedValues[2], depth + 1);
          if (colors) {
          refR += colors[0] * nearestShape.k_refl;
          refG += colors[1] * nearestShape.k_refl;
          refB += colors[2] * nearestShape.k_refl;
          }
        }
      }
    }
    pixR = totalR + (nearestShape.dr * nearestShape.ar * ambR) + refR;
    pixG = totalG + (nearestShape.dg * nearestShape.ag * ambG) + refG;
    pixB = totalB + (nearestShape.db * nearestShape.ab * ambB) + refB;
  }

  return [pixR, pixG, pixB];
}

function calculate(ray, cylinder) {
  let a = pow(ray.direction.x, 2) + pow(ray.direction.z, 2);
  let b = 2 * (ray.xPos - cylinder.x) * ray.direction.x + 2 * (ray.zPos - cylinder.z) * ray.direction.z;
  let c = pow(ray.xPos - cylinder.x, 2) + pow(ray.zPos - cylinder.z, 2) - pow(cylinder.rad, 2);
  let discr = pow(b, 2) - 4 * a * c;

  if (discr < 0) {
    return -1;
  } else {
    let t = ((-1 * b)+sqrt(discr))/(2*a);
    let t2 = ((-1 * b)-sqrt(discr))/(2*a);

    rt1 = ray.yPos + t * (ray.direction.y);
    rt2 = ray.yPos + t2 * (ray.direction.y);

    if (rt1 >= cylinder.y && rt1 <= (cylinder.y + cylinder.h)) {
      if (rt2 >= cylinder.y & rt2 <= (cylinder.y + cylinder.h)) {
        return Math.min(t, t2);
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

function cylinderCap(rayC, cylinderC, cap) {
  if (cap == 0) {
    let top = new p5.Vector([0], [1], [0]).normalize();
    let top1 = p5.Vector.dot(top, rayC.direction);
    if (top1 == 0) {
      return -1;
    } else {
      var d = -(top.y * (cylinderC.y + cylinderC.h));
      var t = (-d - rayC.yPos)/top1;
      return t;
    }
  } else {
    let bot = new p5.Vector([0], [-1], [0]).normalize();
    let bot1 = p5.Vector.dot(bot, rayC.direction);
    if (bot1 == 0) {
      return -1;
    } else {
      var d = -(bot.y * (cylinderC.y));
      var t = (d - rayC.yPos) / -bot1;
      return t;
    }
  }
}

function calculateSphere(ray, sphere) {
  let a = pow(ray.direction.x, 2) + pow(ray.direction.y, 2) + pow(ray.direction.z, 2);
  let b = 2*((ray.xPos - sphere.x) * ray.direction.x + (ray.yPos - sphere.y) * ray.direction.y + (ray.zPos - sphere.z) * ray.direction.z);
  let c = pow(ray.xPos - sphere.x, 2) + pow(ray.yPos - sphere.y, 2) + pow(ray.zPos - sphere.z, 2) - pow(sphere.rad, 2);
  let discr = pow(b, 2) - 4 * a * c;
  
  if (discr < 0) {
    return -1;
  } else {
    let t = ((-1 * b) + sqrt(discr)) / (2 * a);
    let t2 = ((-1 * b) - sqrt(discr)) / (2 * a);
    if (t2 >= 0 && t2 < t) {
      return t2;
    }
    return t;
  }
}

function reflect(dir, norm) {
  let ref = p5.Vector.dot(dir, norm);
  return new p5.Vector([-2 * ref * norm.x + dir.x], [-2 * ref * norm.y + dir.y], [-2 * ref * norm.z + dir.z]);
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
    this.ar = ambient[0];
    this.ag = ambient[1];
    this.ab = ambient[2];
    this.sr = specular[0];
    this.sg = specular[1];
    this.sb = specular[2];
    this.specPower = specPow;
    this.k_refl = refl;
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

class sphere {
  constructor(newX, newY, newZ, radius) {
    this.x = newX;
    this.y = newY;
    this.z = newZ;
    this.rad = radius;
    this.dr = materials[0];
    this.dg = materials[1];
    this.db = materials[2];
    this.ar = ambient[0];
    this.ag = ambient[1];
    this.ab = ambient[2];
    this.sr = specular[0];
    this.sg = specular[1];
    this.sb = specular[2];
    this.specPower = specPow;
    this.k_refl = refl;
  }
}

class shadowR {
  constructor(newX, newY, newZ, dir) {
    this.xPos = newX;
    this.yPos = newY;
    this.zPos = newZ;
    this.direction = dir;
  }
}

class reflectedR {
  constructor(newX, newY, newZ, dir) {
    this.xPos = newX;
    this.yPos = newY;
    this.zPos = newZ;
    this.direction = dir;
  }
}
