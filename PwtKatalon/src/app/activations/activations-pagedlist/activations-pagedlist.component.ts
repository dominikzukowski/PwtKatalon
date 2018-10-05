import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { debounceTime, merge, share, startWith, switchMap } from 'rxjs/operators';
import { Page } from '../../pagination';
import { IActivation } from '../activation';
import { ActivationService } from '../activation.service';

@Component({
  templateUrl: './activations-pagedlist.component.html',
  styleUrls: ['./activations-pagedlist.component.css']
})
export class ActivationsPagedlistComponent {
  filterForm: FormGroup;
  page: Observable<Page<IActivation>>
  pageUrl = new Subject<string>();

  constructor(
    private ponyService: ActivationService
  ) {
    this.filterForm = new FormGroup({
      is_available: new FormControl(),
      search: new FormControl()
    });
    this.page = this.filterForm.valueChanges.pipe(
      debounceTime(200),
      merge(this.pageUrl),
      switchMap(urlOrFilter => this.ponyService.list(urlOrFilter)),
      share()
    );
  }

  onPageChanged(url: string) {
    this.pageUrl.next(url);
  }
}