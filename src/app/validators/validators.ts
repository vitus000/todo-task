import {ValidatorFn, Validators} from "@angular/forms";

export function digitValidator(): ValidatorFn {
    return Validators.pattern('^[0-9]*$');
}

export function phoneNumberValidator(): ValidatorFn {
    return Validators.pattern('^\\+?[0-9]{9,12}$');
}
