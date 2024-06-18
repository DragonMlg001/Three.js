import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';

import atmosVertexShader from '../shaders/atmosphereVertex.glsl';
import atmosFragmentShader from '../shaders/atmosphereFragment.glsl';

import earthTexture from '../img/earth.png';

// renderer
const renderer = new THREE.WebGLRenderer({
    antialias:true,
    canvas: document.querySelector('canvas')
});

// half of screen 
const canvasContainer = document.querySelector('#canvasContainer');

renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
// for better pixels
renderer.setPixelRatio(window.devicePixelRatio);

// scean and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    canvasContainer.offsetWidth / canvasContainer.offsetHeight,
    0.1,
    1000
);
camera.position.set(0,0,13);

const textureLoader = new THREE.TextureLoader();

// Earth
const earthGeo = new THREE.SphereGeometry(5, 50, 50);
const eartheMat = new THREE.ShaderMaterial({
   vertexShader,
   fragmentShader,
   // this is for texture
   uniforms:{
    globeTexture:{
        value: textureLoader.load(earthTexture)
    }
   }
});
const earth = new THREE.Mesh(earthGeo, eartheMat);
//scene.add(earth);

// after glow
const atmosphereGeo = new THREE.SphereGeometry(5, 50, 50);
const atmosphereMat = new THREE.ShaderMaterial({
   vertexShader: atmosVertexShader,
   fragmentShader: atmosFragmentShader,
   blending: THREE.AdditiveBlending,
   side: THREE.BackSide
});
const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
atmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(atmosphere);

// adding stars

const starGeo = new THREE.BufferGeometry();
const starMat = new THREE.PointsMaterial({
    color: 'white'
});
// for stars 
const starVertices = [];
for(let i = 0; i <10000; i++){
const x = (Math.random() - 0.5) * 2000;
const y = (Math.random() - 0.5) * 2000;
const z = -Math.random() * 2000;

starVertices.push(x, y, z);
};
const floatAttribute = new THREE.Float32BufferAttribute(starVertices, 3)
starGeo.setAttribute('position', floatAttribute);

const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

//Group organizes/transforms multiple objects together.
const group = new THREE.Group();
group.add(earth);
scene.add(group);

// animation
const mouse = {
    x: undefined,
    y: undefined
}
const animate = ()=>{
    //earth.rotateY(0.01);
    earth.rotation.y += 0.003;
    gsap.to(group.rotation,{
        x: -mouse.y * 0.2,
        y: mouse.x * 0.5,
        duration: 2
    });

    renderer.render(scene, camera);
    renderer.setAnimationLoop(animate);

   
};
window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();


addEventListener('mousemove', (e)=>{
    mouse.x = (e.clientX / innerWidth) * 2 - 1
    mouse.y = (e.clientY / innerHeight) * 2 + 1
    console.log(mouse);
});
