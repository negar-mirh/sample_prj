import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { UserService } from './user.service';

@Component({
    selector: 'posts',
    templateUrl: './posts.component.html',
    styles: [` 
        .posts li { cursor: default; } 
        .posts li:hover { background: #ecf0f1; }  
        .list-group-item.active,  
        .list-group-item.active:hover,  
        .list-group-item.active:focus {  
            background-color: #ecf0f1; 
            border-color: #ecf0f1;  
            color: #2c3e50; 
        }
        .thumbnail{
            border-radius: 100%
        } 
    `]
})
export class PostsComponent implements OnInit {
    users=[];
    postLoading;
    commentsLoading;
    posts=[];
    currentPost;
    selectedPost=[];

    constructor(
        private _postService: PostService,
        private _userService: UserService) {
    }

    ngOnInit() {
        this.loadUsers();
        this.loadPosts();
    }

    private loadUsers() {
        this._userService.getUsers()
            .subscribe(users => this.users = users);
    }
    getDetails(post) {
        this.commentsLoading = true;
        this.currentPost = post;
        this._postService.getComments(post.id)
            .subscribe(comments => this.currentPost.comments = comments,
            null,
            () => this.commentsLoading = false);
    }

    private loadPosts(filter?) {
        this.postLoading = true;
        this._postService.getPosts(filter)
            .subscribe(posts => {
                this.posts = posts;
                this.selectedPost=this.posts.slice(0,10)
            },
            error => {
                if (error.status == 404)
                    alert("This user doesn't have any posts!");
            },
            () => this.postLoading = false)
    }

    reloadPosts(filter) {
        this.currentPost = null;
        this.loadPosts(filter);
    }

    onPageChanged($event) {
        this.selectedPost=$event.selectedPost;
    }
}
