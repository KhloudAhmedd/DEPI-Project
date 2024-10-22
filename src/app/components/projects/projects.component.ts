import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  items = [
    { image: '/images/projectImage1.png', description: 'This is A Portfolio Website for a Product Designer made using HTML, CSS, JS and Bootstrp' },
    { image: '/images/projectImage2.png', description: 'A Website for Optix Company using Angular' },
    { image: '/images/projectImage3.png', description: 'A Website for AKASHA Foundation' },
    { image: '/images/projectImage4.png', description: 'A Website for a Design Studio' },
    { image: '/images/projectImage5.png', description: 'A Portfolio for a Product Designer' }  
  ];
}
