import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../../../models/product';
import { Category } from '../../../../models/category';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { Subscription } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { environment } from '../../../../../environments/environment';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: Product;
  categories: Category[];
  selectedCategoryId: string;
  selectedCategory: Category;
  categoriesSubscription: Subscription;
  productSubscription: Subscription;
  activeRouteSubscription: Subscription;
  slectedFiles: FileList;
  constructor(private router: Router, private categoriesSvc: CategoryService, private storage: AngularFireStorage,
    private productSvc: ProductService, private activeRoute: ActivatedRoute) {
      this.product = new  Product();
     }

  ngOnInit() {
    this.categoriesSubscription = this.categoriesSvc.categoriesObserable.subscribe((res) => {
      this.categories = res;
      this.activeRouteSubscription = this.activeRoute.params.subscribe(params => {
        if (params.id.toString() !== '0') {
          this.productSubscription = this.productSvc.getProduct(params.id).subscribe((productRes: Product) => {
            this.product = new Product();
            this.product = productRes;
            this.selectedCategoryId = this.product.categoryId;
            this.onCategoryChange();
            this.loadFilterValues();
          });
        } else {
          this.product = new Product();
        }
      });
    });
  }
  loadFilterValues() {
    const filters = JSON.parse(this.product.filters);
    for (let productFilterIndex = 0; productFilterIndex < filters.length; productFilterIndex++) {
      const productFilter = filters[productFilterIndex];
      for (let selectedCatFilterIndex = 0; selectedCatFilterIndex < this.selectedCategory.filters.length; selectedCatFilterIndex++) {
        const catFilter = this.selectedCategory.filters[selectedCatFilterIndex];
        if (catFilter.name === productFilter.name) {
            catFilter.value = productFilter.value;
        }

      }
    }
    this.onCategoryChange();
  }
  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
    if (this.activeRouteSubscription) {
      this.activeRouteSubscription.unsubscribe();
    }
  }
  onSaveClick() {
    this.product.categoryId = this.selectedCategory.id;
    this.product.categoryName = this.selectedCategory.name;
    this.product.filters = JSON.stringify(this.selectedCategory.filters);
    this.productSvc.saveProduct(this.product).then((res) => {
      this.router.navigate(['/admin', 'products']);
    });

  }
  onCancelClick() {
    this.router.navigate(['/admin', 'products']);
  }
  onCategoryChange() {
    for (let categoryIndex = 0; categoryIndex < this.categories.length; categoryIndex++) {
      if (this.categories[categoryIndex].id === this.selectedCategoryId) {
        this.selectedCategory = this.categories[categoryIndex];
        break;
      }
    }
  }
  chooseFiles(event) {
    this.slectedFiles = event.target.files;
    if (this.slectedFiles.item(0)) {
      if (this.slectedFiles.item(0).size > environment.imageSizeLimitInBytes) {
        alert('File size too big');
      } else {
        this.product.imageUrl = '../../../../assets/loading.gif';
        this.uploadPic();
      }
    }
  }
  uploadPic() {
    const file = this.slectedFiles.item(0);
    const date = new Date();
    const time = date.getTime().toString();
    const fileName = 'IMG' + time + '.jpg';
    const filePath = environment.productImageUploadPath + '/' + fileName;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file).then((data) => {
      fileRef.getDownloadURL().toPromise().then((url) => {
        this.product.imageName = fileName;
        this.product.imagePath = filePath;
        this.product.imageUrl = url;
      });
    });
  }
}
