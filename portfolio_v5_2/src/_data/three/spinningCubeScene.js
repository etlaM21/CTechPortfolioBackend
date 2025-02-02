import * as THREE from 'three';

export default function init(canvas) {
    console.log("Canvas:", canvas);
    if (!canvas) {
        throw new Error("Canvas is not passed to the init function");
    }
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.width, canvas.height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    console.log("cube:", cube);
    console.log("Scene contents:", scene);
    const animate = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();

    return () => {
        renderer.dispose();
    };
}