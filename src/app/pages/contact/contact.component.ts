import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  public formGroup: FormGroup;
  public contactData$: Observable<any> = new Observable<any>();

  public sendComments() {
    const data = this.formGroup.value;
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {
    this.formGroup = formBuilder.group({});
    route.params.subscribe(() => {
      this.contactData$ = contactService.getContact();
    });
  }

  public createComment(data: any) {
    this.formGroup = this.formBuilder.group({
      name: [data.name, [Validators.required, Validators.maxLength(20)]],
      surname: [data.surname, [Validators.required, Validators.maxLength(10)]],
      email: [data.email, [Validators.email]],
      subject: [data.subject, [Validators.required]],
      comment: [data.comment, [Validators.maxLength(200)]],
    });
  }

  public getError(controlName: string) {
    let error = '';
    const control = this.formGroup.get(controlName);
    if (control?.errors != null) {
      error = 'Enter the required information to continue';
      console.log(error);
    }
  }

  public ngOnInit() {
    let data = {
      name: '',
      surnmae: '',
      subject: '',
      comment: '',
    };
    this.createComment(data);
  }
}
