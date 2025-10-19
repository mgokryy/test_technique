import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { HouseService } from '../../services/house.service';
import { LevelService, LevelParams } from '../../services/level.service';
import { MurService, MurParams } from '../../services/mur.service';
import { SolParams, SolService } from '../../services/sol.service';
import { ToitParams, ToitService } from '../../services/toit.service';

@Component({
  selector: 'app-maison',
  templateUrl: './maison.component.html',
  styleUrls: ['./maison.component.scss'],
  standalone: true
})
export class MaisonComponent implements OnInit, AfterViewInit {

  @ViewChild('rendererContainer', { static: false }) rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private light: THREE.Light[] = [];  

  private solParams: SolParams = { width: 10, depth: 8, thickness: 0.2, color: 0xdab89b, position: new THREE.Vector3(5, -0.1, 4)};
  private toitParams: ToitParams = { width: 11, depth: 9, thickness: 0.2, color: 0x3d4e5c,  position: new THREE.Vector3(5, 3.1, 4)};
  private mursParams: MurParams[] = [
    { width: 10,
      height: 3,
      depth: 0.2,
      color: 0xffffff,
      position: new THREE.Vector3(5, 1.5, 0.1), 
      rotationY: 0,
      doors: [{ width: 1, height: 2.1, depth: 0.05, color: 0xff7f50, position: new THREE.Vector3(-2.0, -0.43, -0.1)}],
      windows: [{ width: 1, height: 1.2, depth: 0.05, color: 0x1a1a1a, position: new THREE.Vector3(2.0, 0, -0.1)}]
    },
    { width: 8,
      height: 3,
      depth: 0.2,
      color: 0xffffff,
      position: new THREE.Vector3(10, 1.5, 4), 
      rotationY: THREE.MathUtils.degToRad(90)},
    { width: 10,
      height: 3,
      depth: 0.2,
      color: 0xffffff,
      position: new THREE.Vector3(5, 1.5, 7.9), 
      rotationY: THREE.MathUtils.degToRad(180)},
    {width: 8,
      height: 3,
      depth: 0.2,
      color: 0xffffff,
      position: new THREE.Vector3(0, 1.5, 4), 
      rotationY: THREE.MathUtils.degToRad(-90)}
  ];

  constructor(
    private solService: SolService,
    private murService: MurService,
    private levelService: LevelService,
    private houseService: HouseService,
    private toitService: ToitService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initScene();
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
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(width, height);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.castShadow = true;
    directionalLight.position.set(10, 20, 10);
    this.scene.add(directionalLight);
    this.light.push(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    this.light.push(ambientLight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
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
    const sol = this.solService.createSol(this.solParams);
    this.scene.add(sol);
  }

  afficherNiveau(): void {
    this.clearSceneExceptLights();
    const level = { sol: this.solParams, murs: this.mursParams };
    const group = this.levelService.createLevel(level);
    this.scene.add(group);
  }

  afficherMaison(): void {
    this.clearSceneExceptLights();
    const level: LevelParams = { sol: this.solParams, murs: this.mursParams };
    const house = this.houseService.createHouse({
      levels: [level],
      withRoof: true,
      roof: this.toitParams
    });
    this.scene.add(house);
  }
}
