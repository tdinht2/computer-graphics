// Fragment shader
// The fragment shader is run once for every pixel
// It can change the color and transparency of the fragment.

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D my_texture;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 
  
  vec4 diffuse_color;

  vec4 topInt = vec4(0.0);
  vec2 topNeighbor = vec2(0 * 0.01, 1 * 0.01);
  topInt += (texture2D(my_texture, vertTexCoord.xy + topNeighbor).r + texture2D(my_texture, vertTexCoord.xy + topNeighbor).g + texture2D(my_texture, vertTexCoord.xy + topNeighbor).b) / 3;

  vec4 botInt = vec4(0.0);
  vec2 botNeighbor = vec2(0 * 0.01, -1 * 0.01);
  botInt += (texture2D(my_texture, vertTexCoord.xy + botNeighbor).r + texture2D(my_texture, vertTexCoord.xy + botNeighbor).g + texture2D(my_texture, vertTexCoord.xy + botNeighbor).b) / 3;

  vec4 rightInt = vec4(0.0);
  vec2 rightNeighbor = vec2(1 * 0.01, 0 * 0.01);
  rightInt += (texture2D(my_texture, vertTexCoord.xy + rightNeighbor).r + texture2D(my_texture, vertTexCoord.xy + rightNeighbor).g + texture2D(my_texture, vertTexCoord.xy + rightNeighbor).b) / 3;
  
  vec4 leftInt = vec4(0.0);
  vec2 leftNeighbor = vec2(-1 * 0.01, 0 * 0.01);
  leftInt += (texture2D(my_texture, vertTexCoord.xy + leftNeighbor).r + texture2D(my_texture, vertTexCoord.xy + leftNeighbor).g + texture2D(my_texture, vertTexCoord.xy + leftNeighbor).b) / 3;

  vec4 centInt = vec4(0.0);
  centInt += (texture2D(my_texture, vertTexCoord.xy).r + texture2D(my_texture, vertTexCoord.xy).g + texture2D(my_texture, vertTexCoord.xy).b) / 3;
  
  vec4 laplac = topInt + botInt + rightInt + leftInt - 4 * centInt;
  laplac = laplac + 0.5;

  laplac = laplac * 1.3;

  diffuse_color = laplac;

  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);
  
}
