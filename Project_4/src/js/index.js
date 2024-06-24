import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';

import nebula from '../img/nebula.jpg';

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({
   canvas,
   antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
45,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const orbit = new OrbitControls(camera, canvas);
camera.position.set(0, 0, 15);
orbit.update();


const uniforms = {
    u_time: {type: 'f', value: 0.0 },
    u_resolution: {type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight).multiplyScalar(window.devicePixelRatio)},
    u_mouse: {type: 'v2', value: new THREE.Vector2(0.0, 0.0)},
    image: {type: 't', value: new THREE.TextureLoader().load(nebula)}
};

window.addEventListener('mousemove', (e)=>{
    uniforms.u_mouse.value.set(e.screenX / window.innerWidth, 1 - e.screenY / window.innerHeight);
});

const planeGeo = new THREE.PlaneGeometry(10, 10, 30, 30);
const planeMat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    wireframe: false,
    side: THREE.DoubleSide
});
const planeMesh = new THREE.Mesh(planeGeo, planeMat);
scene.add(planeMesh);

const clock = new THREE.Clock();

const animate=()=>{
    uniforms.u_time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
};
renderer.setAnimationLoop(animate);

window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

