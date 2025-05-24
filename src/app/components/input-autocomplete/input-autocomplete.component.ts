import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  AfterViewInit
} from '@angular/core';
import { FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-autocomplete',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-autocomplete.component.html',
  styleUrl: './input-autocomplete.component.css'
})
export class InputAutocompleteComponent implements AfterViewInit {
  @Input() strings: { id: string; text: string }[] = [];
  @Output() validChange = new EventEmitter<boolean>();

  @ContentChild('autocompleteInput', { static: false }) inputRef!: ElementRef<HTMLInputElement>;

  stringControl = new FormControl('', {
    nonNullable: true,
    validators: [(control: AbstractControl) => this.validStringValidator(control)]
  });

  filteredStrings: { id: string; text: string }[] = [];
  showSuggestions = false;

  ngAfterViewInit() {
    const input = this.inputRef.nativeElement;

    // Set initial value
    input.value = this.stringControl.value;

    input.addEventListener('input', () => {
      this.stringControl.setValue(input.value);
      this.filterStrings();
    });

    input.addEventListener('focus', () => {
      this.showSuggestions = true;
    });

    input.addEventListener('blur', () => {
      setTimeout(() => {
        this.showSuggestions = false;
        this.stringControl.markAsTouched();

        const isValid = this.strings.some(item => item.text === this.stringControl.value);
        this.validChange.emit(isValid);
      }, 100);
    });
  }

  filterStrings() {
    const value = this.stringControl.value.toLowerCase();
    const normalize = (str: string) =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    this.filteredStrings = this.strings.filter(item =>
      normalize(item.text.toLowerCase()).includes(normalize(value))
    );

    const isValid = this.strings.some(item => item.text === this.stringControl.value);
    this.validChange.emit(isValid);
  }

  validStringValidator(control: AbstractControl) {
    return this.strings.some(item => item.text === control.value) ? null : { invalidString: true };
  }

  selectString(string: string) {
    this.stringControl.setValue(string);
    this.inputRef.nativeElement.value = string;
    this.showSuggestions = false;
    this.validChange.emit(true);
  }
}
