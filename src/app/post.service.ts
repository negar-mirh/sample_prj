import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
    private _url = "http://jsonplaceholder.typicode.com/posts";

    constructor(private _http: Http) { }

    getPosts(filter?) {
        var url = this._url;

        if (filter && filter.userId)
            url += '?userId=' + filter.userId;
        return this._http.get(url)
            .map(posts => posts.json());
    }

    getComments(id) {
        return this._http.get(this._url + '/' + id + "/comments")
            .map(comments => comments.json());
    }

    getUserPosts(userId) {
        return this._http.get(this._url + "?userId=" + userId)
            .map(posts => posts.json());
    }
}