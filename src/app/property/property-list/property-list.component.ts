
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from 'src/app/model/iproperty';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  SellRent  = 1;
  properties: Array<IProperty>;
  City = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';

  constructor(private route: ActivatedRoute, private housingService: HousingService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    if (this.route.snapshot.url.toString()) {
      this.SellRent  = 2;
      // console.log(this.SellRent);
      // console.log(this.route.snapshot.url.toString());
    }
    this.housingService.GetAllProperties(this.SellRent).subscribe(
      (data) => {
        this.properties = data;
        // const newPropertFromStorage  = JSON.parse(localStorage.getItem('newProp'));
        // if (newPropertFromStorage.SellRent === this.SellRent) {
        //   this.properties = [newPropertFromStorage, ... this.properties];
        // }
        // console.log(this.route.snapshot.url.toString());
      }, (error) => {
        // console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  onCityFilter() {
    this.SearchCity = this.City;
  }

  // tslint:disable-next-line:typedef
  onCityFilterClear() {
    this.SearchCity = '';
    this.City = '';
  }

  // tslint:disable-next-line:typedef
  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }

}
