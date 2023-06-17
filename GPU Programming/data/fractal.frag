// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

uniform float cx;
uniform float cy;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 

  vec2 zBand = vec2((vertTexCoord.x * 3) - 1.5, (vertTexCoord.y * 3) - 1.5);
  for (int i = 0; i < 25; i++) {
  	zBand = vec2(pow(zBand.x , 3) + cx - (3 * zBand.x * pow(zBand.y, 2)), (3 * pow(zBand.x, 2) * zBand.y) + cy - pow(zBand.y, 3));
  }

  if (length(zBand) < 4) {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  } else {
    gl_FragColor = vec4(0.0, 0.6, 0.8, 1.0);
  }
}