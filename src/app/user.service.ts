import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './user';

@Injectable()
export class UserService {
    private _url = "http://jsonplaceholder.typicode.com/users";

    constructor(private _http: Http) {
    }

    getUsers() {
        return this._http.get(this._url)
            .map(users => users.json());
    }

    createUser(user: User) {
        return this._http.post(this._url, JSON.stringify(user))
            .map(result => result.json());
    }

    getUser(id) {
        return this._http.get(this._url + "/" + id)
            .map(user => user.json());
    }

    updateUser(user: User) {
        console.log(user);
        return this._http.put(this._url, JSON.stringify(user))
            .map(user => user.json());
    }

    removeUser(id) {
        return this._http.delete(this._url + "/" + id)
            .map(result => result.json());
    }
}