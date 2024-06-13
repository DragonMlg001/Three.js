import * as THREE from 'three';
import * as dat from 'dat.gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import nebula from '../img/nebula.jpg';
import stars from '../img/stars.jpg';
import img2 from '../img/img2.png';


const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true ;
renderer.setSize(window.innerWidth, window.innerHeight);

// change backgroung color
//renderer.setClearColor('lightgreen'); 

document.body.appendChild(renderer.domElement);

// creates a scene i.e like blender
const scene =new THREE.Scene();



// creates a camera there are two types of cameras this is perspective
const camera = new THREE.PerspectiveCamera(
45, window.innerWidth / window.innerHeight, 0.1 ,1000
);

// for maving the camera by making an orbit 
const orbit = new OrbitControls(camera, renderer.domElement);




// this helps as a guid into guiding the x, y & z axes
const axesHelper = new THREE.AxesHelper(3);
// add it to scene with add methode
scene.add(axesHelper);

// this helps by inserting grids in the scene
const gridHelper = new THREE.GridHelper(30);
// add it to scene with add methode
scene.add(gridHelper);

// this moves the camera position 
// this is one way of doing it which is one by one
// camera.position.z = 5;
// camera.position.y = 2;
// or you can make it a single line 
// camera.position.set(x-axes , y-axes , z-axes );
camera.position.set(-10 , 30 , 30);
// orbit controls to update the camera
orbit.update();

// changing background and applying texture
const textureLoader = new THREE.TextureLoader();
//scene.background = textureLoader.load(img1); 
// changing background with texture with cube texture
const cubeTexLod = new THREE.CubeTextureLoader();
scene.background = cubeTexLod.load([
    nebula,
    nebula,
    stars,
    stars,
    stars,
    stars
]);

// this is used to create a box in the scence
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
// adds a box in the scene
scene.add(box);

// this is used to make a plane surface in the scene
const planeGeometry = new THREE.PlaneGeometry(30 , 30);
// const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// adds a plane surface on the scene
scene.add(plane);
plane.material.map = textureLoader.load(img2);

// this is for rotating the object 
plane.rotation.x = -0.5 * Math.PI;
// shadow effect
plane.receiveShadow = true;
// this is used to make a sphere
const sphereGeometry = new THREE.SphereGeometry(4 , 50 , 50);

// wireframe is used for showing wireframe 
// Basic Material doesn't need light 
// const sphereMaterial = new THREE.MeshBasicMaterial({color: '#00d73e', wireframe: false});
// MeshStandardMaterial and MeshLambertMaterial need light to be viewed
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff});
// const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// shadow effect
sphere.castShadow = true;
// adds a sphere surface on the scene
scene.add(sphere);
// you can also change positions just like the camera
sphere.position.set(-10, 10 , 0);



// the lights 

// Ambient Light
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// // Directional Light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// // directional Light Position
// directionalLight.position.set(-30, 50, 0);
// // cast shadow effect
// directionalLight.castShadow = true;
// scene.add(directionalLight);
// directionalLight.shadow.camera.bottom = -12;
// // directional Light helper
// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// // add light to scene
// scene.add(dLightHelper);
// // shadow helper
// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);


// Spot Light
const spotLight = new THREE.SpotLight(0xffffff, 5000);
// spoylight Position
spotLight.position.set(-100, 100, 0);
// spot light decay and shadow
spotLight.decay=0;
spotLight.castShadow=true;
// angle and adding spot light
spotLight.angle = 0.2;
scene.add(spotLight);
// spotlight helper
const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

// FOG effect

scene.fog = new THREE.Fog(0xffffff, 0 , 200);



// box 2 
const boxTwoGeo = new THREE.BoxGeometry(4,4,4);
// this is for loading a singlr image
//const boxTwoMaterial = new THREE.MeshBasicMaterial({
   // color: 'lightgreen'
    //you can apply it here
    //map: textureLoader.load(nebula)
//});
// this is for loading multiple images
const boxTwoMultiMaterial = [
    new THREE.MeshBasicMaterial({
        color: 'lightgreen',
        map: textureLoader.load(nebula)
 }),new THREE.MeshBasicMaterial({
        color: 'lightgreen',
        map: textureLoader.load(nebula)
 }),new THREE.MeshBasicMaterial({
        color: 'lightgreen',
        map: textureLoader.load(nebula)
 }),new THREE.MeshBasicMaterial({
        color: 'lightgreen',
        map: textureLoader.load(nebula)
 }),new THREE.MeshBasicMaterial({
        color: 'white',
        map: textureLoader.load(stars)
 }),new THREE.MeshBasicMaterial({
        color: 'white',
        map: textureLoader.load(stars)
    }),
];
const box2 = new THREE.Mesh(boxTwoGeo, boxTwoMultiMaterial);
scene.add(box2);
box2.position.set(0,15,10);
// and you can apply it here as well
box2.material.map = textureLoader.load(nebula);

//Plane dos
const planeTwoGeo = new THREE.PlaneGeometry(10, 10, 10, 10);
const planeTwoMat = new THREE.MeshBasicMaterial({
    color: '#57725e',
    wireframe: true
});
const planeTwo = new THREE.Mesh(planeTwoGeo, planeTwoMat);
scene.add(planeTwo);
planeTwo.position.set(10, 10, 15);

planeTwo.geometry.attributes.position.array[0] -= 10 * Math.random();
planeTwo.geometry.attributes.position.array[1] -= 10 * Math.random();
planeTwo.geometry.attributes.position.array[2] -= 10 * Math.random();
const lastPointZ = planeTwo.geometry.attributes.position.array.length - 1;
planeTwo.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random();

// sphere two
// // shader material 
// const vShader = `
// void main(){
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }`;
// const fShader =`
// void main(){
//     gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);
// }`;

const sphereTwoGeo = new THREE.SphereGeometry(4);
const shpereTwoMat = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
});
const sphereTwo = new THREE.Mesh(sphereTwoGeo,shpereTwoMat);
scene.add(sphereTwo);
sphereTwo.position.set(-5, 10, 10);


// inserts an console on the upper right
const gui = new dat.GUI();

// options menu on the console
const options = {
    boxColor: '#8dff2f',
    planeColor: '#6c92e1',
    sphereColor: '#00d73e',
    wireframe: false,
    // for  the bounce effect speed 
    speed: 0.01,
    angle: 0.02,
    penumbra: 0,
    intensity: 1

};
// adding color palet/options
gui.addColor(options, 'boxColor').onChange((e)=>{
    box.material.color.set(e);
});
gui.addColor(options, 'planeColor').onChange((e)=>{
    plane.material.color.set(e);
});
gui.addColor(options, 'sphereColor').onChange((e)=>{
    sphere.material.color.set(e);
});
// adding a true / false as a check box 
gui.add(options, 'wireframe').onChange((e)=>{
    sphere.material.wireframe= e ;
});
// bounce speed
gui.add(options, 'speed', 0 , 0.1);

//light options
gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 1);


let step = 0;

// this is for getting getting the position of the cursor pointer
const mousePosition = new THREE.Vector2();
window.addEventListener('mousemove',(e)=>{
    mousePosition.x = (e.clientX / window.innerWidth)* 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight)*2 + 1;
});
const rayCaster = new THREE.Raycaster();
//this is to get the id of the object on the scean for interaction
const sphereId = sphere.id;
//this is to give a nameot the object on the scean for interaction
box2.name = 'box2';

// function to animate using geometric transformation
animate=(time)=>{
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

//for giving the bounce effect
    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

// Light options
spotLight.angle = options.angle;
spotLight.penumbra = options.penumbra;
spotLight.intensity = options.intensity;
sLightHelper.update();

// this takes the position of the mouse and casts a ray on the object
rayCaster.setFromCamera(mousePosition, camera);
const intersects = rayCaster.intersectObjects(scene.children);
console.log(intersects);
// interaction with the object using id
for(let i = 0; i < intersects.length; i++){
    // for changing colot using id
    if(intersects[i].object.id === sphereId){
        intersects[i].object.material.color.set('yellow');
    };
    // for rotation using name
    if(intersects[i].object.name === 'box2'){
        intersects[i].object.rotation.x = time / 1000;
        intersects[i].object.rotation.y = time / 1000;
    };

// this is for animating waves/ vertesies
planeTwo.geometry.attributes.position.array[0] = 10 * Math.random();
planeTwo.geometry.attributes.position.array[1] = 10 * Math.random();
planeTwo.geometry.attributes.position.array[2] = 10 * Math.random();
planeTwo.geometry.attributes.position.array[lastPointZ] = 10 * Math.random();
planeTwo.geometry.attributes.position.needsUpdate = true;

};

// this renders the scene 
    renderer.render(scene, camera);
};




// this makes an animation loop to make an effect of animation
renderer.setAnimationLoop(animate);

// resizing window making is responsive
window.addEventListener('resize', ()=>{
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});
