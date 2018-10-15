import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'users',  component: UsersListComponent}
    ])
  ],
  declarations: [UsersListComponent]
})
export class UsersModule { }
