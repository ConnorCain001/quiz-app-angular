import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { PunctuatePipe } from '../../pipes/punctuate.pipe';

@Component({
  selector: 'app-form-error',
  standalone: true,
  templateUrl: './form-error.component.html',
  imports: [CommonModule, CapitalizePipe, PunctuatePipe],
})
export class FormErrorComponent {
  @Input() error: string | undefined;
}
