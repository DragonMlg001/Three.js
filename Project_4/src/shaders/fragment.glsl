uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D image;
varying vec2 vUv;
void main(){
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec4 texture = texture2D(image, vUv);
    float effect = abs(sin(texture.x + u_time));
   // gl_FragColor = vec4(texture.r, texture.g, texture.b, 1.0);
    gl_FragColor = vec4(vec3(effect), 1.0);

}