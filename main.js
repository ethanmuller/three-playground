import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';


import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'

const gltfLoader = new GLTFLoader();
let s = 1;

const clock = new THREE.Clock()

const baseYScale = 7.4;

gltfLoader.load(
  'noel.glb',
  function ( gltf ) {
    gltf.scene.position.set(0, 0, 1)
    gltf.scene.scale.set(10, baseYScale, 10)
    scene.add( gltf.scene );

    function dance() {
      gltf.scene.scale.set( Math.cos(clock.getElapsedTime()*5/5) + 10, baseYScale + Math.sin(clock.getElapsedTime()*3/5), Math.cos(clock.getElapsedTime()*7/5)*1+10)
    }

    function animate() {
      requestAnimationFrame( animate );
      dance();
      controls.update();
      renderer.render( scene, camera );
    }
    animate();
  },
  function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  function ( error ) {
    console.log( 'An error happened', error );
  }
);

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const ambientLight = new THREE.AmbientLight( 0xffffff, 1.5 );
scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff, 1.0 );
pointLight.position.set(-10, 10, 0)
//camera.add( pointLight );

scene.add( camera );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.querySelector('#app').appendChild( renderer.domElement );

renderer.xr.enabled = true;
document.body.appendChild( VRButton.createButton( renderer ) );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const controls = new TrackballControls( camera, renderer.domElement );

controls.maxDistance = 200.0;
controls.minDistance = 10.0;
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
