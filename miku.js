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

35,

window.innerWidth /
window.innerHeight,

0.1,

1000

);

camera.position.set(
0,
1.4,
4
);

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

renderer.domElement.style.zIndex =
'10';

renderer.domElement.style.pointerEvents =
'none';

document.body.appendChild(
renderer.domElement
);

/* LIGHTS */

const ambientLight =
new THREE.AmbientLight(
0xffffff,
2
);

scene.add(ambientLight);

const directionalLight =
new THREE.DirectionalLight(
0xffffff,
2
);

directionalLight.position.set(
2,
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

(gltf)=>{

miku = gltf.scene;

/* SIZE */

miku.scale.set(
1.7,
1.7,
1.7
);

/* POSITION */

miku.position.set(
1.5,
-1.8,
0
);

/* ROTATION */

miku.rotation.y =
-0.5;

scene.add(miku);

},

undefined,

(error)=>{

console.error(error);

}

);

/* ANIMATE */

function animate(){

requestAnimationFrame(
animate
);

if(miku){

/* FLOAT */

miku.position.y =
-1.8 +
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

/* MOBILE */

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

/* BUTTON REACTION */

const packButtons =
document.querySelectorAll(
'.pack-btn'
);

packButtons.forEach(button=>{

button.addEventListener(
'click',
()=>{

if(miku){

miku.rotation.z =
0.12;

setTimeout(()=>{

miku.rotation.z =
0;

},300);

}

});

});
