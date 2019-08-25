import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSubmitted = false;
  contactForm: FormGroup;
  errors = {};
  success = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      date_of_birth: new FormControl('', Validators.required),
      residence: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required),
      marital_status: new FormControl('', Validators.required),
      major: new FormControl('', Validators.required),
      degree: new FormControl('', Validators.required),
      university: new FormControl('', Validators.required),
      years_of_experience: new FormControl('', Validators.required),
      employment_status: new FormControl('', Validators.required),
      expected_salary: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      visa_status: new FormControl('', Validators.required),
      bio: new FormControl('')
    });
  }

  get f() { return this.contactForm.controls; }

  submit() {
    this.isSubmitted = true;

    if (this.contactForm.valid) {
      this.http.post(environment.api_url + '' + '/submissions', this.contactForm.value).subscribe(
        (response: any) => {
          this.success = true;
        },
        (e: any) => {
          this.errors = e.error.errors;
        });
    }
  }
}
