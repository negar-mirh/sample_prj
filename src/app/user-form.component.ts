import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidators } from './emailValidators';
import { CanDeactivate, Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user';

@Component({
    selector: 'newUser',
    templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
    isLoading = false;
    title: string;
    user = new User();
    form;

    constructor(
        fb: FormBuilder,
        private _router: Router,
        private _usersService: UserService,
        private _route: ActivatedRoute) {
        this.form = fb.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([
                Validators.required,
                EmailValidators.EmailFormatIsNotValid
            ])],
            phone: ['', Validators.required],
            address: fb.group({
                street: ['', Validators.required],
                suite: ['', Validators.required],
                city: ['', Validators.required],
                zipcode: ['', Validators.required]
            })
        })
    }

    onSubmit() {
        console.log(this.form.value);
        let id = this._route.snapshot.paramMap.get('id');
        let method;
        if (this.user.id)
            method = this._usersService.updateUser(<User>this.form.value);
        else
            method = this._usersService.createUser(<User>this.form.value);

        method.subscribe(result => {
            //console.log(result);
            //this.form.markAsPristine();
            this._router.navigate(['/users']);
        });

    }

    ngOnInit() {
        let id = this._route.snapshot.paramMap.get("id");
        this.title = id ? 'Edit User' : 'New User';
        if (!id)
            return;
        this.isLoading = true;
        this._usersService.getUser(id)
            .subscribe(user => {
                this.user = <User>user;
            },
            error => {
                if (error.status == 404) {
                    this._router.navigate(['NotFound']);
                }
            },
            () => this.isLoading = false);
    }

    get name() {
        return this.form.get('name');
    }
    get email() {
        return this.form.get('email');
    }
    get phone() {
        return this.form.get('phone');
    }
    get street() {
        return this.form.get('address.street');
    }
    get suite() {
        return this.form.get('address.suite');
    }
    get city() {
        return this.form.get('address.city');
    }
    get zipcode() {
        return this.form.get('address.zipcode');
    }
}