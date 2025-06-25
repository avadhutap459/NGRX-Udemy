import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../../types/backendErrors.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-backend-error-messages',
  standalone: true,
  templateUrl: './backend-error-messages.html',
  styleUrl: './backend-error-messages.css',
  imports : [CommonModule]
})
export class BackendErrorMessages implements OnInit {

  @Input() backendErrors : BackendErrorsInterface = {}

  errorMessages : string[] = []

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name : string) => {
      const message = this.backendErrors[name].join(' ')
      return `${name} ${message}`
    })
  }
}
