import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sunLight = new THREE.AmbientLight( 0xffffff, 2, 0);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;
scene.add( sunLight );

const sunGeometry = new THREE.SphereGeometry();
const loader = new THREE.TextureLoader();
const sunMaterial = new THREE.MeshLambertMaterial({
    map: loader.load('textures/sun.jpg')
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

scene.add(sun);


window.addEventListener('resize', () => {
   const width = window.innerWidth;
   const height = window.innerHeight;

   camera.aspect = width / height;
   camera.updateProjectionMatrix();

   renderer.setSize(width, height);
});

function animate(){

    sun.rotation.y += 0.01; 

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();