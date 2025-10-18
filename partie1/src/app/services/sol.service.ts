import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({ providedIn: 'root' })
export class SolService {
  createSol(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(10, 0.2, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0xdab89b });
    const sol = new THREE.Mesh(geometry, material);
    sol.position.set(5, -0.1, 4); 
    return sol;
  }
}   
