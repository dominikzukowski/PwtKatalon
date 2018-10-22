import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'users',  component: UsersListComponent},
      {path: 'users/:id', component: UserDetailsComponent}
    ])
  ],
  declarations: [UsersListComponent, UserDetailsComponent, CreateUserComponent]
})
export class UsersModule { }
