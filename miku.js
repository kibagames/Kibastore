import * as THREE from
'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

import { GLTFLoader } from
'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js';

/* SCENE */

const scene =
new THREE.Scene();

/* CAMERA */

const camera =
new THREE.PerspectiveCamera(

45,

window.innerWidth /
window.innerHeight,

0.1,

1000

);

camera.position.z = 5;

/* RENDERER */

const renderer =
new THREE.WebGLRenderer({

alpha:true,
antialias:true

});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
window.devicePixelRatio
);

renderer.domElement.style.position =
'fixed';

renderer.domElement.style.top =
'0';

renderer.domElement.style.left =
'0';

renderer.domElement.style.width =
'100%';

renderer.domElement.style.height =
'100%';

renderer.domElement.style.pointerEvents =
'none';

renderer.domElement.style.zIndex =
'5';

document.body.appendChild(
renderer.domElement
);

/* LIGHTS */

const ambientLight =
new THREE.AmbientLight(
0xffffff,
5
);

scene.add(ambientLight);

const directionalLight =
new THREE.DirectionalLight(
0xffffff,
4
);

directionalLight.position.set(
0,
3,
5
);

scene.add(directionalLight);

/* MODEL */

const loader =
new GLTFLoader();

let miku;

loader.load(

'assets/models/miku.glb',

function(gltf){

miku = gltf.scene;

/* SCALE */

miku.scale.set(
0.7,
0.7,
0.7
);

/* POSITION */

miku.position.set(
1.8,
-1.5,
0
);

/* ROTATION */

miku.rotation.y =
-0.5;

scene.add(miku);

console.log(
'Miku Loaded'
);

},

undefined,

function(error){

console.error(
'MODEL ERROR:',
error
);

}

);

/* ANIMATION */

function animate(){

requestAnimationFrame(
animate
);

if(miku){

/* FLOAT */

miku.position.y =
-1.5 +
Math.sin(
Date.now() * 0.0015
) * 0.08;

/* ROTATE */

miku.rotation.y =
-0.5 +
Math.sin(
Date.now() * 0.001
) * 0.05;

}

/* RENDER */

renderer.render(
scene,
camera
);

}

animate();

/* RESIZE */

window.addEventListener(
'resize',
()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);
