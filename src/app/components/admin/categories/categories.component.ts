import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[];
  categoriesSubscription: Subscription;
  constructor(private router: Router, private categoriesSvc: CategoryService) { }

  ngOnInit() {
    this.categoriesSubscription = this.categoriesSvc.categoriesObserable.subscribe((res) => {
      this.categories = res;
    });
  }
  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }
  onAddClick() {
    this.router.navigate(['/admin', 'categories', '0']);
  }
  onEdit(category: Category) {
    this.router.navigate(['/admin', 'categories', category.id]);
  }
}
