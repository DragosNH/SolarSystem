import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,20);

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

// ------ Mercury ------
const mercuryGeo = new THREE.SphereGeometry(0.5, 32, 32);
const mercuryMat = new THREE.MeshLambertMaterial({
    map : loader.load('textures/mercury.jpg')
});
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
mercury.castShadow = true;
mercury.receiveShadow = true;
mercury.position.x = 8

// ------ Venus ------
const venusGeo = new THREE.SphereGeometry(0.8, 32, 32);
const venusMat = new THREE.MeshLambertMaterial({
    map : loader.load('textures/venus.jpg')
});
const venus = new THREE.Mesh( venusGeo, venusMat );
venus.position.x = 10.5;

// ------ Earth ------


scene.add(sun);
scene.add(mercury);
scene.add(venus);


window.addEventListener('resize', () => {
   const width = window.innerWidth;
   const height = window.innerHeight;

   camera.aspect = width / height;
   camera.updateProjectionMatrix();

   renderer.setSize(width, height);
});

function animate(){

    sun.rotation.y += 0.01; 
    mercury.rotation.y = 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();