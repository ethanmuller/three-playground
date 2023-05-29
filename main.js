import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';


import './style.css'

const gltfLoader = new GLTFLoader();

const clock = new THREE.Clock()

const baseYScale = 7.4;

const objLoader = new OBJLoader();

const mtlLoader = new MTLLoader();

mtlLoader.load('slime.mtl', (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
    objLoader.load('slime.obj', (root) => {
        root.position.y -= 0.2;
        scene.add(root);

        function dance() {
            const t = clock.getElapsedTime()*3;
            const x =  1 + 0.1 * Math.cos(t);
            const y =  1 + 0.1 * Math.sin(t);
            const z =  1 + 0.1 * Math.cos(t);
            root.scale.set(x, y, z)
        }

        function animate() {
            requestAnimationFrame( animate );
            dance();
            controls.update();
            renderer.render( scene, camera );
        }
        animate();

        renderer.setAnimationLoop( function () {
            dance();
            controls.update();
            renderer.render( scene, camera );
        } );
    });
});


const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x22aa00 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const ambientLight = new THREE.AmbientLight( 0xffffff, 3 );
scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff, 1.0 );
pointLight.position.set(-10, 10, -10)
camera.add( pointLight );

scene.add( camera );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.querySelector('#app').appendChild( renderer.domElement );

renderer.xr.enabled = true;
//document.body.appendChild( VRButton.createButton( renderer ) );

const controls = new OrbitControls( camera, renderer.domElement );

controls.maxDistance = 10.0;
controls.minDistance = 3.0;
//controls.maxZoom = 10.0;
controls.rotateSpeed = 2.5;
controls.zoomSpeed = 1.0;
controls.enablePan = false;
controls.autoRotate = false;
controls.autoRotateSpeed = 5.0;
controls.enableDamping = true;
controls.dampingFactor = 0.01;
//controls.dynamicDampingFactor = 0.05;

camera.position.z = 4;

controls.update();
