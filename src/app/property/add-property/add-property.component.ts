import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  addPropertyForm: FormGroup;
  nextClicked: boolean;
  property = new Property();
  cityList: any[];

  propertyView: IPropertyBase = {
    Id: null,
    Name: '',
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: '',
    RTM: null,
  };
  constructor(private fb: FormBuilder, private alertify: AlertifyService, private housingService: HousingService, private router: Router) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.createAddPropertyForm();
    this.housingService.getAllCities().subscribe((cityData) => {
      this.cityList = cityData;
    });
  }

  // tslint:disable-next-line:typedef
  createAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1', Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],
      }),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),
      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),
      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null],
      }),
    });
  }

  //#region <Getter Methods>
  // #region <FormGroups>
  // tslint:disable-next-line:typedef
  get BasicInfo() {
    return this.addPropertyForm.controls.BasicInfo as FormGroup;
  }

  // tslint:disable-next-line:typedef
  get PriceInfo() {
    return this.addPropertyForm.controls.PriceInfo as FormGroup;
  }

  // tslint:disable-next-line:typedef
  get AddressInfo() {
    return this.addPropertyForm.controls.AddressInfo as FormGroup;
  }

  // tslint:disable-next-line:typedef
  get OtherInfo() {
    return this.addPropertyForm.controls.OtherInfo as FormGroup;
  }
  // #endregion

  //#region <Getter Methods>
  // #region <FormControl>

  // tslint:disable-next-line:typedef
  get SellRent() {
    return this.BasicInfo.controls.SellRent as FormControl;
  }

  // tslint:disable-next-line:typedef
  get BHK() {
    return this.BasicInfo.controls.BHK as FormControl;
  }
  // tslint:disable-next-line:typedef
  get PType() {
    return this.BasicInfo.controls.PType as FormControl;
  }
  // tslint:disable-next-line:typedef
  get FType() {
    return this.BasicInfo.controls.FType as FormControl;
  }
  // tslint:disable-next-line:typedef
  get Name() {
    return this.BasicInfo.controls.Name as FormControl;
  }
  // tslint:disable-next-line:typedef
  get City() {
    return this.BasicInfo.controls.City as FormControl;
  }
  // tslint:disable-next-line:typedef
  get Price() {
    return this.PriceInfo.controls.Price as FormControl;
  }
  // tslint:disable-next-line:typedef
  get BuiltArea() {
    return this.PriceInfo.controls.BuiltArea as FormControl;
  }
  // tslint:disable-next-line:typedef
  get CarpetArea() {
    return this.PriceInfo.controls.CarpetArea as FormControl;
  }
  // tslint:disable-next-line:typedef
  get Security() {
    return this.PriceInfo.controls.Security as FormControl;
  }
  // tslint:disable-next-line:typedef
  get Maintenance() {
    return this.PriceInfo.controls.Maintenance as FormControl;
  }
  // tslint:disable-next-line:typedef
  get FloorNo() {
    return this.AddressInfo.controls.FloorNo as FormControl;
  }
  // tslint:disable-next-line:typedef
  get TotalFloor() {
    return this.AddressInfo.controls.TotalFloor as FormControl;
  }
  // tslint:disable-next-line:typedef
  get Address() {
    return this.AddressInfo.controls.Address as FormControl;
  }
  // tslint:disable-next-line:typedef
  get LandMark() {
    return this.AddressInfo.controls.LandMark as FormControl;
  }
  // tslint:disable-next-line:typedef
  get RTM() {
    return this.OtherInfo.controls.RTM as FormControl;
  }
  // tslint:disable-next-line:typedef
  get PossessionOn() {
    return this.OtherInfo.controls.PossessionOn as FormControl;
  }
  // tslint:disable-next-line:typedef
  get AOP() {
    return this.OtherInfo.controls.AOP as FormControl;
  }
  // tslint:disable-next-line:typedef
  get Gated() {
    return this.OtherInfo.controls.Gated as FormControl;
  }
  // tslint:disable-next-line:typedef
  get MainEntrance() {
    return this.OtherInfo.controls.MainEntrance as FormControl;
  }
  // tslint:disable-next-line:typedef
  get Description() {
    return this.OtherInfo.controls.Description as FormControl;
  }

  // #endregion

  // tslint:disable-next-line:typedef
  selectTab(tabId: number, isCurrenttabValid: boolean) {
    this.nextClicked = true;
    if (isCurrenttabValid) {
      if (this.staticTabs?.tabs[tabId]) {
        this.staticTabs.tabs[tabId].active = true;
      }
    }
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success('Successfully saved data');
      if (this.SellRent.value === 2) {
        this.router.navigate(['/rent-property']);
      }
      else{
        this.router.navigate(['/']);
      }
    }
    else{
      this.alertify.error('Pleae review the form !!.');
    }
    // console.log(this.SellRent.value);
  }

  mapProperty(): void {
    this.property.Id = this.housingService.newPropID();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  allTabsValid(): boolean{
    if (this.BasicInfo.invalid) {
      this.staticTabs.tabs[0].active = true;
      return false;
    }
    if (this.PriceInfo.invalid) {
      this.staticTabs.tabs[1].active = true;
      return false;
    }
    if (this.AddressInfo.invalid) {
      this.staticTabs.tabs[2].active = true;
      return false;
    }
    if (this.OtherInfo.invalid) {
      this.staticTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }
}
