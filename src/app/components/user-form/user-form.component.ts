import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() totalPrice = 0;
  form = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    creditCard: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.pattern('^[0-9]*$'),
    ]),
  });
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onSubmit(): void {
    if (this.form.valid && this.totalPrice > 0) {
      // send data to serve
      this.router.navigate(['/confiramtion']);
      this.form.reset();
    }
  }
}
