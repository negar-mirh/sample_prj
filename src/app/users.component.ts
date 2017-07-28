import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'users',
    template: `<h1>Users</h1>
        <a routerLink="new" class="btn btn-primary">Add User</a><br>
        <i *ngIf="isLoading" class="fa fa-spinner fa-spin fa-3x"></i>
        <table class="table table-bordered table-hover table-striped">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
            <tr *ngFor="let user of users">
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td><a [routerLink]="['/users',user.id]"><i class="glyphicon glyphicon-edit"></i></a></td>
                <td><i (click)="delete(user)" class="glyphicon glyphicon-remove" role="button"></i></td>
            </tr>
        </table>
    `
})
export class UsersComponent implements OnInit {
    users;
    isLoading = true;
    constructor(private _usersService: UserService) {
    }

    ngOnInit() {
        this._usersService.getUsers()
            .subscribe(users => this.users = users,
            error => console.error(error),
            () => this.isLoading = false)
    }
    delete(user) {
        if (confirm("Are you sure for deleting " + user.name + "?")) {
            var index = this.users.indexOf(user);
            this.users.splice(index, 1);
            this._usersService.removeUser(user.id)
                .subscribe(null,
                error => {
                    alert("user can not be deleted!");
                    this.users.splice(index, 0, user);
                });
        }
        // bootbox.dialog({
        //     message: "Are you sure for deleting " + user.name + "?",
        //     title: "Delete",
        //     buttons: {
        //         no: {
        //             label: "No",
        //             className: "btn-default",
        //             callback: function () {
        //                 bootbox.hideAll();
        //             }
        //         },
        //         yes: {
        //             label: "Yes",
        //             className: "btn-danger",
        //             callback: function () {
        //                 var index = this.users.indexOf(user);
        //                 this.users.splice(index, 1);
        //                 this._usersService.removeUser(user.id)
        //                     .subscribe(null,
        //                     error => {
        //                         alert("user can not be deleted!");
        //                         this.users.splice(index, 0, user);
        //                    });
        //             }
        //         }
        //     }
        // });
    }
}