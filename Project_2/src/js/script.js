import * as THREE from 'three';
import {OrbitControl, OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from '../img/stars.png';
import sunTexture from '../img/sun.png';
import mercuryTexture from '../img/mercury.png';
import venusTexture from '../img/venus.png';
import earthTexture from '../img/earth.png';
import marsTexture from '../img/mars.png';
import jupitarTexture from '../img/jupitar.png';
import saturnTexture from '../img/saturn.png';
import saturnRingTexture from '../img/saturnR.png';
import uranusTexture from '../img/uranus.png';
import uranusRingTexture from '../img/uranusR.png';
import neptunTexture from '../img/neptun.png'
import plutoTexture from '../img/pluto.png';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture]);

const textureLoader = new THREE.TextureLoader();

// planets start here
const createPlanet=(size, texture, position, ring)=>{
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D;
    obj.add(mesh);
    if(ring){
        const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI ;
    }
    scene.add(obj);
    mesh.position.x = position;

    return{ mesh, obj };
};
//sun
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

//Mercury
const mercury = createPlanet(3.2, mercuryTexture, 28);
//Venus
const venus = createPlanet(5.8, venusTexture, 44);
//Earth
const earth = createPlanet(6, earthTexture, 62);
//Mars
const mars = createPlanet(4, marsTexture, 78);
//Jupitar
const jupitar = createPlanet(12, jupitarTexture, 100);
// saturn
const saturn = createPlanet(10, saturnTexture, 138,{
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
}); 
//Uranus
const uranus = createPlanet(7, uranusTexture, 176, {
    innerRadius:7,
    outerRadius:12,
    texture: uranusRingTexture
    
});
//Neptun
const neptun = createPlanet(7, neptunTexture, 200);
//Pluto
const pluto = createPlanet(2.8, plutoTexture, 216) ;




//light
const pointLight = new THREE.PointLight(0xFFFFFF, 30000, 300);
scene.add(pointLight);

const animate=()=>{
//Sun
    sun.rotateY(0.004);
//Mercury
    mercury.mesh.rotateY(0.004);
    mercury.obj.rotateY(0.04);
//Venus
    venus.mesh.rotateY(0.002);
    venus.obj.rotateY(0.015);
//Earth
    earth.mesh.rotateY(0.02);
    earth.obj.rotateY(0.01);
//Mars
    mars.mesh.rotateY(0.018);
    mars.obj.rotateY(0.008);
//Jupitar
    jupitar.mesh.rotateY(0.04);
    jupitar.obj.rotateY(0.002);
// saturn
    saturn.mesh.rotateY(0.038);
    saturn.obj.rotateY(0.0009);
//Uranus
    uranus.mesh.rotateY(0.03);
    uranus.obj.rotateY(0.0004);
//Neptun
    neptun.mesh.rotateY(0.032);
    neptun.obj.rotateY(0.0001);
//Pluto
    pluto.mesh.rotateY(0.008);
    pluto.obj.rotateY(0.00007);


renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});