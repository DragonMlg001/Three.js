uniform float u_time;
varying vec2 vUv;
void main(){
    vUv = uv;
    float newX = sin(position.x * u_time) * sin(position.y * u_time);
    vec3 newPosition = vec3(newX, position.y, position.z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}