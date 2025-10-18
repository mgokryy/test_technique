import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({ providedIn: 'root' })
export class PorteService {
  createPorte(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(1, 2.1, 0.4);
    const material = new THREE.MeshStandardMaterial({ color: 0xff7f50 });
    const porte = new THREE.Mesh(geometry, material);
    porte.position.set(3, 1.05, 0.1); 
    return porte;
  }
}
