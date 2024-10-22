import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

export const routes: Routes = [
    { path: 'header', component: HeaderComponent },
    { path: 'skills', component: SkillsComponent },
    { path: 'projects', component: ProjectsComponent }, 
    { path: 'resume', component: ResumeComponent },
    { path: 'contact', component: ContactComponent }, 
    { path: 'footer', component: FooterComponent },
    { path: '**', redirectTo: 'header' } // Wildcard route (**): If no other paths match, redirect to /header.
];

