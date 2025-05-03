import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



window.addEventListener('resize', () => {
   const width = window.innerWidth;
   const height = window.innerHeight;

   camera.aspect = width / height;
   camera.updateProjectionMatrix();

   renderer.setSize(width, height);
});

function animate(){



    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();