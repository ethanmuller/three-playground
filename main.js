import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'

const mtlLoader = new MTLLoader();

const clock = new THREE.Clock()

let guy;

mtlLoader.load(
  'blue.mtl',
  function ( mtl ) {
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl)
    objLoader.load(
      'blue.obj',
      function ( object ) {
        guy = object;
        object.position.set(0, -4.5, 0)
        scene.add( object );
      },
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      function ( error ) {
        console.log( 'An error happened', error );
      }
    );
  },
  // called when loading is in progresses
  function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  // called when loading has errors
  function ( error ) {
    console.log( 'An error happened', error );
  }
);

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xeeaaFF );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const ambientLight = new THREE.AmbientLight( 0xffffff, 2.0 );
scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff, 3 );
pointLight.position.set(-10, 10, 0)
camera.add( pointLight );
scene.add( camera );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.querySelector('#app').appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

const controls = new OrbitControls( camera, renderer.domElement );

controls.maxDistance = 200.0;
controls.minDistance = 5.0;
//controls.maxZoom = 10.0;
controls.rotateSpeed = 2.5;
controls.zoomSpeed = 1.0;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5.0;
controls.enableDamping = true;
controls.dampingFactor = 0.01;
//controls.dynamicDampingFactor = 0.05;

camera.position.z = 18;

controls.update();


function animate() {
  requestAnimationFrame( animate );
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  if (guy) {
    const counter = Math.floor(clock.getElapsedTime()*3)

    const flip =  (counter % 2)*2-1;
    guy.scale.z = flip;
  }
  controls.update();
  renderer.render( scene, camera );
}
animate();
