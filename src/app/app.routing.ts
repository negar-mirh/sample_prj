import { RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { UsersComponent } from './users.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
import { UserFormComponent } from './user-form.component';

export const routing = RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'users/new', component: UserFormComponent },
    { path: 'users/:id', component: UserFormComponent },
    { path: 'users', component: UsersComponent },
    { path: 'posts', component: PostsComponent },
    { path: '**', component: NotFoundComponent }
])