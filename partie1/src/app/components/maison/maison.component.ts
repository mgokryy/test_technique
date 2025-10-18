import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SolService } from '../../services/sol.service';
import { MurService } from '../../services/mur.service';
import { PorteService } from '../../services/porte.service';
import { FenetreService } from '../../services/fenetre.service';
import { ToitService } from '../../services/toit.service';

@Component({
  selector: 'app-maison',
  templateUrl: './maison.component.html',
  styleUrls: ['./maison.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MaisonComponent implements OnInit, AfterViewInit {

  @ViewChild('rendererContainer', { static: false }) rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private light: THREE.Light[] = [];
  private controls!: OrbitControls;

  constructor(
    private solService: SolService,
    private murService: MurService,
    private toitService: ToitService,
    private porteService: PorteService,
    private fenetreService: FenetreService
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initScene();
    this.afficherMaison(); 
    this.animate();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbfd1e5);

    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(15, 20, 15); 
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.autoRotate = false;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(15, 20, 15);
    this.scene.add(directionalLight);
    this.light.push(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);
    this.light.push(ambientLight);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private clearSceneExceptLights(): void {
    const lightCount = this.light.length;
    while (this.scene.children.length > lightCount) {
      this.scene.remove(this.scene.children[lightCount]);
    }
  }

  afficherSol(): void { 
    this.clearSceneExceptLights();
    const sol = this.solService.createSol();
    console.log('Sol ajouté :', sol);
    this.scene.add(sol); 
  }

  afficherMurs(): void {
    this.clearSceneExceptLights();
    const murs = this.murService.createMurs(); 
    murs.forEach(m => this.scene.add(m));
  }

  afficherFenetre(): void {
    this.clearSceneExceptLights();
    const fenetre = this.fenetreService.createFenetre();
    this.scene.add(fenetre);
  }

  afficherPortes(): void {
    this.clearSceneExceptLights();
    const porte = this.porteService.createPorte();
    this.scene.add(porte);
  }

  afficherToit(): void {
    this.clearSceneExceptLights();
    const toit = this.toitService.createToit();
    this.scene.add(toit);
  }

  afficherMaison(): void {
    this.clearSceneExceptLights();
    const sol = this.solService.createSol();
    this.scene.add(sol);
    
    const murs = this.murService.createMurs();
    murs.forEach(m => this.scene.add(m));
    
    const toit = this.toitService.createToit();
    this.scene.add(toit);
    
    const porte = this.porteService.createPorte();
    this.scene.add(porte);
    
    const fenetre = this.fenetreService.createFenetre();
    this.scene.add(fenetre);
  }
}