import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EmailValidators {
    static EmailFormatIsNotValid(control: AbstractControl):ValidationErrors|null {
        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEx.test(control.value)? null: { formatError: true };
    }
}