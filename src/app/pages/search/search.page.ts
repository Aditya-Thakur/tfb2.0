import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, AfterViewInit {

  @ViewChild('searchMe', { read: ElementRef, static: false }) elementRef: ElementRef;
  searchForm: FormGroup;
  constructor(
    // private searchService: SearchService,
    private router: Router
  ) { }

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

  ngOnInit() {
    // this.searchForm = new FormGroup({
    //   product: new FormControl('', [
    //     Validators.required
    //   ])
    // });

    this.searchForm = new FormGroup({
      keyword: new FormControl('', [
        Validators.required
      ])
    });
    this.searchForm.reset();
  }

  async search(): Promise<void> {
    this.router.navigate(['tabs/products'], { queryParams: { pSearch: this.searchForm.value.keyword } });
  }

}
