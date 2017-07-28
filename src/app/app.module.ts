import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { SpinnerComponent } from './spinner.component';
import { PaginationComponent } from './pagination.component';
import { PostsComponent } from './posts.component';
import { NavbarComponent } from './navbar.component';
import { UsersComponent } from './users.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
import { UserFormComponent } from './user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    SpinnerComponent,
    PaginationComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    UsersComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    JsonpModule,
    CommonModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [
    PostService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
