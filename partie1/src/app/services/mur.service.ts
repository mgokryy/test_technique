import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { PorteService } from './porte.service';
import { FenetreService } from './fenetre.service';

@Injectable({ providedIn: 'root' })
export class MurService {
    constructor(private porteService: PorteService, private fenetreService: FenetreService) {}
    createMurs(): THREE.Object3D[] {
        const murs: THREE.Object3D[] = [];
        murs.push(this.createMurAvant());
        murs.push(this.createMurDroit());
        murs.push(this.createMurArriere());
        murs.push(this.createMurGauche());
        return murs;
    }

    createMurAvant(): THREE.Group {
        const geometry = new THREE.BoxGeometry(10, 3, 0.2);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const murAvant = new THREE.Mesh(geometry, material);
        murAvant.position.set(5, 1.5, 0.1); 
        const porte = this.porteService.createPorte();
        const fenetre = this.fenetreService.createFenetre();
        const murAvantGroup = new THREE.Group();
        murAvantGroup.add(murAvant, porte, fenetre);
        return murAvantGroup;
    }

    createMurDroit(): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(8, 3, 0.2);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const murDroit = new THREE.Mesh(geometry, material);
        murDroit.position.set(10, 1.5, 4); 
        murDroit.rotation.y = THREE.MathUtils.degToRad(90);
        return murDroit;
    }
    createMurArriere(): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(10, 3, 0.2);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const murArriere = new THREE.Mesh(geometry, material);
        murArriere.position.set(5, 1.5, 7.9); 
        murArriere.rotation.y = THREE.MathUtils.degToRad(180);
        return murArriere;
        
    }
    createMurGauche(): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(8, 3, 0.2);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const murGauche = new THREE.Mesh(geometry, material);
        murGauche.position.set(0, 1.5, 4); 
        murGauche.rotation.y = THREE.MathUtils.degToRad(-90);
        return murGauche;
    }
}
