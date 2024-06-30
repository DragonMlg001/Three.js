import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

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
camera.position.set(0, 20, -30);
orbit.update();

// Shapes

const boxGeo = new THREE.BoxGeometry(2, 2, 2);
const boxMat = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
});
const BoxMesh = new THREE.Mesh(boxGeo, boxMat);
scene.add(BoxMesh);

const sphereGeo = new THREE.SphereGeometry(2);
const sphereMat = new THREE.MeshBasicMaterial({
    color: 'green', wireframe: true
});
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphereMesh);

const groundGeo = new THREE.PlaneGeometry(30, 30);
const groundMat = new THREE.MeshBasicMaterial({
    color: 0xffffff, side: THREE.DoubleSide, wireframe: true
});
const groundMesh = new THREE.Mesh(groundGeo, groundMat);
scene.add(groundMesh);

// gravity
// creating world with gravity

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.81, 0),
});


// bodies for the shaper

//plane body
const groundPhyMat = new CANNON.Material();
const groundBody = new CANNON.Body({
    //shape: new CANNON.Plane(),
    shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
    type: CANNON.Body.STATIC,
    material: groundPhyMat
});
world.addBody(groundBody);
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);


// box body
const boxPhyMat = new CANNON.Material();
const boxBody = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
    position: new CANNON.Vec3(1, 20, 0),
    material: boxPhyMat,
    mass: 1
});
world.addBody(boxBody);

// rotation of body
boxBody.angularVelocity.set(0, 10, 0);
boxBody.angularDamping = 0.5;

// when two material body come in contact

const groundContactMat = new CANNON.ContactMaterial(
    groundPhyMat,
    boxPhyMat,
    {friction: 0.04}
);

world.addContactMaterial(groundContactMat);


// sphere body
const spherePhysMat = new CANNON.Material();
const sphereBody = new CANNON.Body({
    mass: 10,
    position: new CANNON.Vec3(0, 15, 0),
    shape: new CANNON.Sphere(2),
    material: spherePhysMat
});
world.addBody(sphereBody);
// air damping
sphereBody.linearDamping = 0.1;

// when two material body come in contact for a bounce
const groundsphereContactMat = new CANNON.ContactMaterial(
    groundPhyMat,
    spherePhysMat,
    {restitution: 0.9}
);
world.addContactMaterial(groundsphereContactMat);

// time in world
const timeStep = 1 / 60 ; 

const animate=()=>{
    world.step(timeStep);
// plane gravity
groundMesh.position.copy(groundBody.position);
groundMesh.quaternion.copy(groundBody.quaternion);
// box gravity
BoxMesh.position.copy(boxBody.position);
BoxMesh.quaternion.copy(boxBody.quaternion);
// sphere gravity
sphereMesh.position.copy(sphereBody.position);
sphereMesh.quaternion.copy(sphereBody.quaternion);

    renderer.render(scene, camera);
};
renderer.setAnimationLoop(animate);

window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});