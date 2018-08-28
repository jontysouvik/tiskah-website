import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../../../models/product';
import { Category } from '../../../../models/category';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { Subscription } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { environment } from '../../../../../environments/environment';

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
  slectedFiles: FileList;
  constructor(private router: Router, private categoriesSvc: CategoryService, private storage: AngularFireStorage) {
    this.product = new Product();
  }

  ngOnInit() {
    this.categoriesSubscription = this.categoriesSvc.categoriesObserable.subscribe((res) => {
      console.log(res, 'categoriesSubscription componet');
      this.categories = res;
    });
  }
  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }
  onSaveClick() {
    console.log(this.product);
    console.log(this.selectedCategory);
  }
  onCancelClick() {
    this.router.navigate(['/admin', 'products']);
  }
  onCategoryChange() {
    console.log(this.categories);
    for (let categoryIndex = 0; categoryIndex < this.categories.length; categoryIndex++) {
      if (this.categories[categoryIndex].id === this.selectedCategoryId) {
        this.selectedCategory = this.categories[categoryIndex];
        break;
      }
    }
    console.log(this.selectedCategory);
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

      console.log(this.slectedFiles.item(0));
    }
  }
  uploadPic() {
    const file = this.slectedFiles.item(0);
    const date = new Date();
    const time = date.getTime().toString();
    const fileName = 'IMG' + time + '.jpg';
    const filePath = environment.productImageUploadPath + '/' + fileName;
    const fileRef = this.storage.ref(fileName);
    this.storage.upload(fileName, file).then((data) => {
      fileRef.getDownloadURL().toPromise().then((url) => {
        this.product.imageName = fileName;
        this.product.imagePath = filePath;
        this.product.imageUrl = url;
      });
    });
  }
}
