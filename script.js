import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';


const loader = new THREE.TextureLoader();

// ****** Scene ******
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(110, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 40);
scene.background = loader.load('textures/stars.jpg');

// ****** Renderer ******
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// *** Sun light ***
const sunLight = new THREE.PointLight(0xffffff, 30, 1000);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;
scene.add(sunLight);

const ambient = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambient);

// ------------------------------------- Solar system objects -------------------------------------

// ------ Sun ------
const sunGeometry = new THREE.SphereGeometry(8, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: loader.load('textures/sun.jpg')
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
const sunRadius = 8;
const earthAU = 13.5;

// ------ Mercury ------
const mercuryGeo = new THREE.SphereGeometry(0.5, 32, 32);
const mercuryMat = new THREE.MeshLambertMaterial({
    map: loader.load('textures/mercury.jpg')
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
    map: loader.load('textures/venus.jpg')
});
const venus = new THREE.Mesh(venusGeo, venusMat);
const venusPivot = new THREE.Object3D();
venus.position.x = sunRadius + earthAU * 0.72;
venusPivot.add(venus);
venusPivot.rotation.z = THREE.MathUtils.degToRad(3.4);

// ------ Earth ------
const earthGeo = new THREE.SphereGeometry(1, 32, 32);
const earthMat = new THREE.MeshLambertMaterial({
    map: loader.load('textures/earth.jpg')
});
const earth = new THREE.Mesh(earthGeo, earthMat);
const earthPivot = new THREE.Object3D();
earth.position.x = sunRadius + earthAU * 1.0;
earthPivot.add(earth);
earthPivot.rotation.z = THREE.MathUtils.degToRad(0);

// --- Moon ---
const moonGeo = new THREE.SphereGeometry(0.25, 32, 32);
const moonMat = new THREE.MeshLambertMaterial({
    map: loader.load('textures/moon.jpg')
});
const moon = new THREE.Mesh(moonGeo, moonMat);
moon.position.x = 2;
const moonPivot = new THREE.Object3D();
moonPivot.add(moon);

// ------ Mars ------
const marsGeo = new THREE.SphereGeometry(0.53, 32, 32);
const marsMat = new THREE.MeshLambertMaterial({
    map: loader.load('textures/mars.jpg')
});
const mars = new THREE.Mesh(marsGeo, marsMat);
mars.position.x = sunRadius + 13.5 * 1.52;
const marsPivot = new THREE.Object3D();
marsPivot.add(mars);
marsPivot.rotation.z = THREE.MathUtils.degToRad(1.85);

// ------ Jupiter ------
const jupiterGeo = new THREE.SphereGeometry(3, 32, 32);
const jupiterMat = new THREE.MeshLambertMaterial({
    map: loader.load('textures/jupiter.jpg')
});
const jupiter = new THREE.Mesh(jupiterGeo, jupiterMat);
jupiter.position.x = sunRadius + earthAU * 5.2;
const jupiterPivot = new THREE.Object3D();
jupiterPivot.add(jupiter);
jupiterPivot.rotation.z = THREE.MathUtils.degToRad(1.3);

// ------ Saturn ------
const saturnGeo = new THREE.SphereGeometry(2, 32, 32);
const saturnMat = new THREE.MeshLambertMaterial({
    map: loader.load('textures/saturn.jpg')
});
const saturn = new THREE.Mesh(saturnGeo, saturnMat);
const saturnPivot = new THREE.Object3D();
saturnPivot.add(saturn);
// --- Saturn ring ---
const saturnRingGeo = new THREE.RingGeometry(3.5, 6, 64);
const saturnRingMat = new THREE.MeshBasicMaterial({
    map: loader.load('textures/saturn_ring.png'),
    side: THREE.DoubleSide,
    transparent: true
});
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
const saturnRingPivot = new THREE.Object3D();
saturnPivot.rotation.z = THREE.MathUtils.degToRad(2.48);
saturnRingPivot.add(saturnRing);
saturn.add(saturnRing);
saturnRing.rotation.x = Math.PI / 2;

saturn.position.x = sunRadius + earthAU * 9.58;
saturn.rotation.z = THREE.MathUtils.degToRad(26.7);

// ------------------------------------- End of solar system objects -------------------------------------

// ------ Objects added to the scene ------
scene.add(sun);
scene.add(mercuryPivot);
scene.add(venusPivot);
scene.add(earthPivot);
earth.add(moonPivot);
scene.add(marsPivot);
scene.add(jupiterPivot);
scene.add(saturnPivot);
saturn.add(saturnRingPivot);

// Made the scene responsive 
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});


// ------ Aniomations ------
function animate() {

    sun.rotation.y += 0.01;

    mercury.rotation.y += 0.001;
    mercuryPivot.rotation.y += 0.02;

    venus.rotation.y -= 0.0004;
    venusPivot.rotation.y += 0.012;

    earth.rotation.y += 0.01;
    earthPivot.rotation.y += 0.01;

    moon.rotation.y += 0.01;
    moonPivot.rotation.y += 0.01;

    mars.rotation.y += 0.008;
    marsPivot.rotation.y += 0.007;

    jupiter.rotation.y += 0.02;
    jupiterPivot.rotation.y += 0.002;

    saturn.rotation.y += 0.015;
    saturnPivot.rotation.y += 0.001;


    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();