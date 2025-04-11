import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


export function createParticleSystem() {
    const canvas = document.querySelector('.webgl');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    // Configure renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particle geometry
    const geometry = new THREE.BufferGeometry();
    const count = 5000;
    const positions = new Float32Array(count * 3);
    
    for(let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Create particle material
    const material = new THREE.PointsMaterial({
        size: 0.01,
        color: 0x00ffff,
        transparent: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    // Create particle system
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    camera.position.z = 5;
    
    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0001;
        
        controls.update();
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
}