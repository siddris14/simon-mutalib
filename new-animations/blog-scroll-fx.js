////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pre Load Images
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const preloadImages = () => {
	return new Promise((resolve, reject) => {
		imagesLoaded(document.querySelectorAll("img"), resolve);
	});
};
// then
preloadImages().then(() => {
	// remove loader
	document.body.classList.remove("loading");

	// Run the Page Animation
	htmltoWebgl();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLSL Syntaxing & Selections
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const glsl = (x) => x[0];

const select = (e) => document.querySelector(e);
const selectID = (e) => document.getElementById(e);
const selectAll = (e) => document.querySelectorAll(e);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Scene, Camera, Renderer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let container = selectID("fx-container");
let renderer = new THREE.WebGLRenderer({});

renderer.setSize(container.offsetWidth, container.offsetHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

container.append(renderer.domElement);

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = 50;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fragment & Vertex Shaders
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const vertexShader = glsl`

    varying vec2 vUv;

    uniform vec2 uResolution;
    uniform float uActivation;

    void main() {

        vUv = uv;
        vec3 pos = position;

        vec4 newPosition = modelMatrix * vec4(pos, 1.);

        vec2 screenUV = newPosition.xy / uResolution;
        newPosition.z =+ cos(screenUV.y * 3.14) * 10. * uActivation;

        gl_Position = projectionMatrix * viewMatrix * newPosition;

    }

`;

const fragmentShader = glsl`

    varying vec2 vUv;
    uniform sampler2D uMap;

    void main() {

        vec4 color = texture2D(uMap, vUv);

        gl_FragColor = color;

    }

`;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Vital Configurations
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getFOV() {
	let height = container.offsetHeight;
	let fov = Math.atan(height / (2 * camera.position.z)) * 2;
	return (fov / Math.PI) * 180;
}

function setScale(mesh) {
	let image = mesh.userData.image;
	let rect = image.getBoundingClientRect();
	mesh.scale.set(rect.width, rect.height, 1);

	mesh.userData.rect = rect;
	mesh.userData.top = image.offsetTop;
	mesh.userData.left = image.offsetLeft;
}

function setPosition(mesh, y = window.scrollY) {
	let rect = mesh.userData.rect;
	mesh.position.set(
		mesh.userData.left - window.innerWidth / 2 + rect.width / 2,
		-mesh.userData.top + window.innerHeight / 2 - rect.height / 2 + y,
		0
	);
}

function setScalePosition(mesh) {
	setScale(mesh);
	setPosition(mesh);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Bring Images to WebGL and Create Plane
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let meshes = [];
let planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);

function htmltoWebgl() {
	let IMAGES = Array.from(document.getElementsByClassName("blog-image-webgl"));
	// let IMAGES = selectAll(".blog-image-webgl");
	IMAGES.forEach((image) => {
		let texture = new THREE.Texture(image);
		texture.needsUpdate = true;

		// Basic Materials
		let materialBasic = new THREE.MeshBasicMaterial({
			map: texture,
		});

		// Shader Materials
		let materialShader = new THREE.ShaderMaterial({
			fragmentShader,
			vertexShader,
			uniforms: {
				uMap: new THREE.Uniform(texture),
				uResolution: new THREE.Uniform(new THREE.Vector2(window.innerWidth, window.innerHeight)),
				uActivation: new THREE.Uniform(0),
			},
		});

		let mesh = new THREE.Mesh(planeGeometry, materialShader);
		mesh.userData.image = image;

		meshes.push(mesh);
		setScalePosition(mesh);

		scene.add(mesh);
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Resize
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function resize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.fov = getFOV();
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	meshes.forEach((mesh) => setScalePosition(mesh));
}

resize();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// onWindow Resize and Scroll
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("resize", resize);

// Keep track of last scroll
let lastScroll = window.scrollY;

window.addEventListener("scroll", (e) => {
	// Current scroll - previous scroll
	let scrollSpeed = window.scrollY - lastScroll;
	let maxSpeed = 5;

	// Scroll Velocity
	scrollSpeed = Math.max(-maxSpeed, Math.min(maxSpeed, scrollSpeed));

	// Activate Scroll
	meshes.forEach((mesh) => {
		setPosition(mesh, window.scrollY);

		let uActivation = mesh.material.uniforms.uActivation;
		uActivation.value += scrollSpeed * 0.01;
	});

	// Keep track of last scroll
	lastScroll = window.scrollY;
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Render and Call Animation Frame
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function render() {
	meshes.forEach((mesh) => {
		let uActivation = mesh.material.uniforms.uActivation;
		uActivation.value += (0 - uActivation.value) * 0.1;

		if (Math.abs(uActivation.value) < 0.00001) {
			uActivation.value = 0;
		}
	});

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

render();
