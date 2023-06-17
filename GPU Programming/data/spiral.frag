// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 
  bool alpha = true;

  if (0.25 < pow(vertTexCoord.t - 0.5, 2) + pow(vertTexCoord.s - 0.5, 2)) {
  	alpha = false;
  }
  
  float dis = 0;
  float size = 0;

  for (float x = 0; x < 21; x++) {
    float powS = pow((vertTexCoord.s - 0.5) - (cos(radians(x * -40)) * 0.45 * size), 2);
    float powT = pow((vertTexCoord.t - 0.5) - (sin(radians(x * -40)) * 0.45 * size) , 2);
  	if (powT + powS + dis < 0.016 * size) {
  		alpha = false;
  	} 

    dis += 0.0006;
    size += 0.046;
  }

  if (alpha) {
  	gl_FragColor = vec4(0.2, 0.4, 1.0, 1.0);
  } else {
  	gl_FragColor = vec4(0.2, 0.4, 1.0, 0.0);
  }
}

