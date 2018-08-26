import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  layoutObserable: AngularFirestoreDocument<any>;
  layoutCollection: AngularFirestoreCollection<any>;
  layout: any;
  layouts: Observable<any>;
  images: any;
  demo = 'Stop';

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.layoutObserable = this.afs.collection('layout').doc('home');

    // this.layout = this.layoutObserable.snapshotChanges();
    // console.log(this.layout);
    this.layoutObserable.ref.get().then((doc) => {
      console.log(doc.data());
      this.images = doc.data().images;
      // const images = this.layout.images;
      // let count = 0;
      // let group = {}
      // for (let index = 0; index < this.layout.images.length; index++) {
      //   const element: any = {};
      //   if (count === 0) {
      //       element.class = 2;
      //   }
      //   if (count === 1) {
      //       element.size = 2;
      //   }
      //   if (count === 2) {
      //       element.size = 2;
      //   }
      //   if (count === 3) {
      //       element.size = 2;
      //   }
      //   if (count === 4) {
      //       element.size = 2;
      //   }
      //   if (count === 5) {
      //       element.size = 2;
      //   }
      // }
    });
    // this.layoutCollection = this.afs.collection('layout');
    // this.layouts = this.layoutCollection.valueChanges();
    // console.log(this.layouts, 'lay');
    // this.layout =
    // this.layoutObserable.valueChanges().toPromise().then((res) => {
    //   console.log(res);
    // });
    // this.layoutObserable.ref.get().then((doc) => {
    //   if (doc.exists) {
    //     console.log('Doc Data: ' + doc.data());
    //   } else {
    //     console.log('Doc Not Found');
    //   }
    // });

  }
  // getClass(image: any) {
  //   if (image.size === 2) {
  //     return 'col-md-8';
  //   } else {
  //     return 'col-md-4';
  //   }
  // }
}
