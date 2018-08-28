import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/category';
import { DateTimeService } from '../../../../services/date-time.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { Filter } from '../../../../models/filter';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: Category;
  filter: string;
  constructor(private dateTimeSvc: DateTimeService, private router: Router, private activeRoute: ActivatedRoute,
    private categorySvc: CategoryService) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      console.log(params.id );
      if (params.id.toString() !== '0') {
        this.category = new Category();
        this.categorySvc.getCategory(params.id).subscribe((res: Category) => {
          this.category = res;
        });
      } else {
        this.category = new Category();
      }
    });
  }
  onSaveClick() {
    if (!this.category.id) {
      const timeStamp = this.dateTimeSvc.getTimeString();
      this.category.id = timeStamp;
      this.category.timeStamp = timeStamp;
    }
    this.categorySvc.saveCategory(this.category).then((res) => {
      this.router.navigate(['/admin', 'categories']);
    }).catch((reason) => {
      console.log(reason);
    });
  }
  addFilter() {
    const filter = new Filter;
    filter.name = this.filter;
    this.category.filters.push(filter);
    this.filter = '';
  }
  removeFilter(filter) {
    this.category.filters.splice(this.category.filters.indexOf(filter), 1);
  }
  onCancelClick() {
    this.router.navigate(['/admin', 'categories']);
  }
}
