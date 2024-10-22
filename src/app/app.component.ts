import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SkillsComponent } from './components/skills/skills.component';
import { ResumeComponent } from './components/resume/resume.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component';
import Headroom from 'headroom.js';
import Swal from 'sweetalert2';
import "bootstrap";
import $ from 'jquery';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SkillsComponent, ProjectsComponent, ResumeComponent, ContactComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  private formValidator: FormValidator;

  constructor() {
    this.formValidator = new FormValidator();
  }

  ngOnInit(): void {
    this.applyJQueryScripts();
    this.formValidator.setupFormValidation();
  }

  // jQuery Dark Mode
  applyJQueryScripts(): void {
    // COLOR MODE Toggle
    $('.color-mode').on('click', () => {
      $('.color-mode-icon').toggleClass('active');
      $('body').toggleClass('dark-mode');
    });

    // HEADER with Headroom to pin the NavBar
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      const headroom = new Headroom(navbar);
      headroom.init();
    }

    // SMOOTH SCROLL jQuery
    $('.nav-link, .custom-btn-link').on('click', function (event) {
      event.preventDefault();
    
      // Get the target element from the 'href' attribute
      const targetElement = $(this).attr('href');
      if (targetElement) {
        // Ensure the offset value is not undefined
        const scrollTopValue = $(targetElement).offset()?.top ?? 0;
        
        // Smooth scroll to the target element, adjusting for the navbar offset
        $('html, body').animate({
          scrollTop: scrollTopValue - 49
        }, 0);
      }
    });
  }
}

 // Form Validation
class FormValidator {
  setupFormValidation(): void {
    const form = document.getElementById("contact-form") as HTMLFormElement | null;

    if (form) {
      const fullName = document.getElementById("your_name") as HTMLInputElement | null;
      const email = document.getElementById("email") as HTMLInputElement | null;
      const subject = document.getElementById("subject") as HTMLInputElement | null;
      const message = document.getElementById("message") as HTMLTextAreaElement | null;

      // Add event listeners for validation on input events
      if (fullName) {
        fullName.addEventListener('input', () => this.validateField(fullName, this.validateName));
      }
      if (email) {
        email.addEventListener('input', () => this.validateField(email, this.validateEmail));
      }
      if (subject) {
        subject.addEventListener('input', () => this.validateField(subject, this.validateSubject));
      }
      if (message) {
        message.addEventListener('input', () => this.validateField(message, this.validateMessage));
      }

      form.addEventListener("submit", (event: Event) => {
        event.preventDefault();

        // Validate all fields before submission
        const isNameValid = fullName ? this.validateField(fullName, this.validateName) : false;
        const isEmailValid = email ? this.validateField(email, this.validateEmail) : false;
        const isSubjectValid = subject ? this.validateField(subject, this.validateSubject) : true; // Optional
        const isMessageValid = message ? this.validateField(message, this.validateMessage) : false;

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
          Swal.fire({
            title: 'Message Submitted!',
            text: 'Thank you for getting in touch! I will get back to you soon.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          form.reset();
          this.clearErrors();
        }
      });
    }
  }

  validateField(field: HTMLInputElement | HTMLTextAreaElement, validationFn: (value: string) => string | null): boolean {
    const errorElement = document.getElementById(`${field.id}_error`) as HTMLElement | null;
    const errorMessage = validationFn(field.value);

    if (errorMessage) {
      field.classList.add("invalid");
      field.classList.remove("valid");
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = "block";
      }
      return false;
    } else {
      field.classList.remove("invalid");
      field.classList.add("valid");
      if (errorElement) {
        errorElement.textContent = "";
        errorElement.style.display = "none";
      }
      return true;
    }
  }

  validateName(value: string): string | null {
    const trimmedValue = value.trim();
    if (trimmedValue.length === 0) {
      return "Full Name is required.";
    }
    const words = trimmedValue.split(/\s+/).filter(word => word.length > 0);
    return (words.length < 2) ? "Full Name must contain at least two words." : null;
  }

  validateEmail(value: string): string | null {
    if (value.trim().length === 0) {
      return "Email is required.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailPattern.test(value) ? "Please enter a valid email address." : null;
  }

  validateSubject(value: string): string | null {
    return value.trim().length < 3 && value.trim().length > 0 ? "Subject must be at least 3 characters long." : null;
  }

  validateMessage(value: string): string | null {
    if (value.trim().length === 0) {
      return "Message is required.";
    }
    return (value.trim().length < 10) ? "Message must be at least 10 characters long." : null;
  }

  clearErrors(): void {
    const errorElements = document.querySelectorAll(".error");
    errorElements.forEach((small) => {
      small.textContent = "";
      (small as HTMLElement).style.display = "none";
    });

    const formInputs = document.querySelectorAll(".form-input");
    formInputs.forEach((input) => input.classList.remove("invalid", "valid"));
  }
}
