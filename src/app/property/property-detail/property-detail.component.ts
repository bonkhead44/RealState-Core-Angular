import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
})
export class PropertyDetailComponent implements OnInit {
  public properyId: number;
  property = new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // tslint:disable-next-line:no-string-literal
    this.properyId = this.route.snapshot.params['id'];
    this.route.data.subscribe((data: Property) => {
      // tslint:disable-next-line:no-string-literal
      this.property = data['propertyDetailResolver'];
    });

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true,
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/images/prop-1.png',
        medium: 'assets/images/prop-1.png',
        big: 'assets/images/prop-1.png',
      },
      {
        small: 'assets/images/prop-2.png',
        medium: 'assets/images/prop-2.png',
        big: 'assets/images/prop-2.png',
      },
      {
        small: 'assets/images/prop-3.png',
        medium: 'assets/images/prop-3.png',
        big: 'assets/images/prop-3.png',
      },
      {
        small: 'assets/images/prop-4.png',
        medium: 'assets/images/prop-4.png',
        big: 'assets/images/prop-4.png',
      },
      {
        small: 'assets/images/prop-5.png',
        medium: 'assets/images/prop-5.png',
        big: 'assets/images/prop-5.png',
      },
    ];
    // this.route.params.subscribe((params) => {
    //   this.properyId = +params.id;
    //   this.housingService
    //     .getProperty(this.properyId)
    //     .subscribe(
    //       (dataProperty: Property) => {
    //       this.property = dataProperty;
    //     });
    // });
  }
}
