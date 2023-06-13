import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactService } from './services/contact.service';
import {
  NotificationComponent,
  DataMessage,
} from '../notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  public formGroup: FormGroup;
  public contactData$: Observable<any> = new Observable<any>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private _snackBar: MatSnackBar
  ) {
    this.formGroup = formBuilder.group({});
    route.params.subscribe(() => {
      this.contactData$ = contactService.getContact();
    });
  }

  public createForm(data: any) {
    this.formGroup = this.formBuilder.group({
      name: [data.name, [Validators.required, Validators.maxLength(20)]],
      surname: [data.surname, [Validators.required, Validators.maxLength(10)]],
      email: [data.email],
      subject: [data.subject, [Validators.required]],
      comment: [data.comment, [Validators.maxLength(200)]],
    });
  }

  public getError(controlName: string) {
    let error = '';
    const control = this.formGroup.get(controlName);
    if (control?.valid != null) {
      error = 'Enter the required information to continue';
    }
  }

  public sendComment() {
    this.contactService.createComment(this.formGroup.value).subscribe({
      next: (response: any) =>
        this.showNotification({
          message: 'Message sent successfully!',
          type: 'success',
        }),
      error: (err: any) =>
        this.showNotification({ message: 'An errors ocurred', type: 'error' }),
    });
  }

  public showNotification(data: DataMessage) {
    this._snackBar.openFromComponent(NotificationComponent, {
      data,
      duration: 2000,
      panelClass: data.type,
    });
  }

  public ngOnInit() {
    let data = {
      name: '',
      surname: '',
      email: '',
      subject: '',
      comment: '',
    };
    this.createForm(data);
  }
}
