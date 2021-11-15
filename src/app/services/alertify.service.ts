import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

// tslint:disable-next-line:typedef
success(message: string) {
  alertify.success(message);
}

// tslint:disable-next-line:typedef
warning(message: string) {
  alertify.warning(message);
}

// tslint:disable-next-line:typedef
error(message: string) {
  alertify.error(message);
}

}
