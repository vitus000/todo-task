import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {digitValidator, phoneNumberValidator} from "../../validators/validators";
import {TodoService} from "../../services/todo.service";
import {ISignUpRequest} from "../../models/models";

@Component({
    selector: 'app-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {
    formGroup: FormGroup;

    constructor(private _todoService: TodoService,
                private _router: Router,
                private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.formGroup = this.getFormGroup();
    }

    getFormGroup() {
        return new FormGroup({
            name: new FormControl('', [Validators.required]),
            username: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            street: new FormControl('', [Validators.required]),
            suite: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.required, phoneNumberValidator()]),
            zipcode: new FormControl('', [Validators.required, digitValidator()]),
        });
    }

    signUp() {
        const controls = this.formGroup.controls;
        const model: ISignUpRequest = {
            name: controls['name'].value,
            username: controls['username'].value,
            email: controls['email'].value,
            phone: controls['phone'].value,
            address: {
                street: controls['street'].value,
                suite: controls['suite'].value,
                city: controls['city'].value,
                zipcode: controls['zipcode'].value,
            },
        };
        this._todoService.signUp(model)
            .subscribe(res => {
                if (res) {
                    this._router.navigate(['todo-list'], {
                        relativeTo: this._activatedRoute.root
                    });
                } else {
                    console.log('Authorization failed');
                }
            });
    }

}
