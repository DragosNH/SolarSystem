import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,30);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);


const sunLight = new THREE.PointLight( 0xffffff, 30, 1000);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;
scene.add( sunLight );

const ambient = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambient);

// ------ Sun ------
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const loader = new THREE.TextureLoader();
const sunMaterial = new THREE.MeshBasicMaterial({
    map: loader.load('textures/sun.jpg')
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
const sunRadius = 5;
const earthAU = 13.5;

// ------ Mercury ------
const mercuryGeo = new THREE.SphereGeometry(0.5, 32, 32);
const mercuryMat = new THREE.MeshLambertMaterial({
    map : loader.load('textures/mercury.jpg')
});
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
const mercuryPivot = new THREE.Object3D();
mercury.castShadow = true;
mercury.receiveShadow = true;
mercury.position.x = sunRadius + earthAU * 0.39;
mercuryPivot.add(mercury);
mercuryPivot.rotation.z = THREE.MathUtils.degToRad(7); 

// ------ Venus ------
const venusGeo = new THREE.SphereGeometry(0.8, 32, 32);
const venusMat = new THREE.MeshLambertMaterial({
    map : loader.load('textures/venus.jpg')
});
const venus = new THREE.Mesh( venusGeo, venusMat );
const venusPivot = new THREE.Object3D();
venus.position.x = sunRadius + earthAU * 0.72;
venusPivot.add(venus);
venusPivot.rotation.z = THREE.MathUtils.degToRad(3.4);

// ------ Earth ------
const earthGeo = new THREE.SphereGeometry(1, 32,32);
const earthMat = new THREE.MeshLambertMaterial({
    map : loader.load('textures/earth.jpg')
});
const earth = new THREE.Mesh(earthGeo, earthMat);
const earthPivot = new THREE.Object3D();
earth.position.x = sunRadius + earthAU * 1.0; 
earthPivot.add(earth);
earthPivot.rotation.z = THREE.MathUtils.degToRad(0); 

// --- Moon ---
const moonGeo = new THREE.SphereGeometry(0.25, 32,32);
const moonMat = new THREE.MeshLambertMaterial({
    map: loader.load('textures/moon.jpg')
});
const moon = new THREE.Mesh(moonGeo, moonMat);
moon.position.x = 2;
const moonPivot = new THREE.Object3D();
moonPivot.add(moon);


scene.add(sun);
scene.add(mercuryPivot);
scene.add(venusPivot);
scene.add(earthPivot);
earth.add(moonPivot);


window.addEventListener('resize', () => {
   const width = window.innerWidth;
   const height = window.innerHeight;

   camera.aspect = width / height;
   camera.updateProjectionMatrix();

   renderer.setSize(width, height);
});


function animate(){

    sun.rotation.y += 0.01; 

    mercury.rotation.y += 0.001;
    mercuryPivot.rotation.y += 0.02;

    venus.rotation.y -= 0.0004;
    venusPivot.rotation.y += 0.012;

    earth.rotation.y += 0.01;
    earthPivot.rotation.y += 0.01;

    moon.rotation.y += 0.01; 
    moonPivot.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();