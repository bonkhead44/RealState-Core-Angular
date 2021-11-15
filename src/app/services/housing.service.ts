import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProperty } from 'src/app/model/iproperty';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HousingService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllCities(): Observable<string[]>{
    return this.http.get<string[]>(this.baseUrl + '/city/cities');
  }

  // tslint:disable-next-line:typedef
  GetAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Array<Property> = [];
        const listStorageProperty = JSON.parse(localStorage.getItem('newProp'));
        for (const id in listStorageProperty) {
          if (SellRent) {
            if (
              listStorageProperty.hasOwnProperty(id) &&
              listStorageProperty[id].SellRent === SellRent
            ) {
              propertiesArray.push(listStorageProperty[id]);
            }
          } else {
            propertiesArray.push(listStorageProperty[id]);
          }
        }

        for (const id in data) {
          if (SellRent) {
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
              propertiesArray.push(data[id]);
            }
          } else {
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
    );
  }

  // tslint:disable-next-line:typedef
  getProperty(id: number){
    return this.GetAllProperties().pipe(
      map(propertArray => {
        return propertArray.find(p => p.Id === id);
      })
    );
  }

  // tslint:disable-next-line:typedef
  addProperty(property: Property) {
    let listStorageProperty = [property];
    if (localStorage.getItem('newProp')) {
      listStorageProperty = [
        property,
        ...JSON.parse(localStorage.getItem('newProp')),
      ];
    }
    localStorage.setItem('newProp', JSON.stringify(listStorageProperty));
  }

  // tslint:disable-next-line:typedef
  newPropID() {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID');
    } else {
      localStorage.setItem('PID', '7');
      return 7;
    }
  }
}
