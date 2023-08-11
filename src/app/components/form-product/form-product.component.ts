import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  productFormData!: FormGroup;
  @ViewChild( 'fileInput' ) fileInput!: ElementRef;

  constructor(
    private productService: ProductsService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    
  }

  buildForm() {
    this.productFormData = new FormGroup({
      name:     new FormControl( '' ),
      price:    new FormControl( '' ),
      urlImage: new FormControl( null )
    });
  }

  onSubmit() {

    const formData = new FormData();

    formData.append( 'name', this.productFormData.get( 'name' )?.value );
    formData.append( 'price', this.productFormData.get( 'price' )?.value );

    const fileInput = this.fileInput.nativeElement;
 
    if (fileInput.files && fileInput.files.length > 0) {
      formData.append('urlImage', fileInput.files[0], fileInput.files[0].name);
    }

    // const images = this.productFormData.get( 'urlImage' )?.value;

    // for( let i = 0; i <= images.length; i++ ) {
    //   formData.append( 'images', images[ i ] );
    // }

    this.productService.create( formData )
      .subscribe( ( response ) => {
        console.log( response );
      });
  }

}
