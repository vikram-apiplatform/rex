import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ServicesService} from "../services.service";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {


  id: any;
  token: any;
  address: any;
  img: any;
  type: any;
  price: any;
  features: any;
  note: any;
  agent_name: any = '';
  agent_phone: any = '';
  agent_email: any = '';
  agent_img: any = '';
  bedroom = 0;
  bathroom = 0;
  carspace = 0;


  constructor(private route: ActivatedRoute, private service: ServicesService) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.service.getProperty(this.id).subscribe(res => {
      let tempProperty: any = res;
      if (res) {
        this.address = tempProperty['result']['system_search_key'];
        this.type = tempProperty['result']['property_category']['text'];
        this.note = tempProperty['result']['note'];
        this.bedroom = tempProperty['result']['attr_bedrooms'];
        this.bathroom = tempProperty['result']['attr_bathrooms'];
        this.carspace = tempProperty['result']['attr_total_car_accom'];
        let featuresList: any = tempProperty['result']['related']['property_features'];
        let featureList: any = [];
        for (const feature of featuresList) {
          featureList.push(feature.feature_name);
        }
        this.features = featureList;
        this.img = 'https:' + tempProperty['result']['default_property_image']['url'];
      }
      this.service.getListing().subscribe(res1 => {
        let temp: any = res1;
        if (res1) {
          for (let item of temp['result']['rows']) {
            if (item.property.id === this.id) {
              this.agent_name = item.listing_agent_1.name;
              this.agent_phone = item.listing_agent_1.phone_mobile;
              this.agent_email = item.listing_agent_1.email_address;
              this.agent_img = 'https:' + item.listing_agent_1.profile_image.url;

            }
          }
        }
      });
    })
    // for(const item of this.list) {
    //   if(item['address'].includes(this.address)){
    //     this.img = item['img'];
    //     this.type = item['type'];
    //     this.price = item['price'];
    //     this.features = item['features'];
    //   }
    // }
  }

  ngOnInit(): void {
  }

  openEmail() {
    if (this.agent_email == '' || this.agent_email == undefined || this.agent_email == null) {
      this.agent_email = 'sales@foxs.com.au';
    }
    window.location.href = "mailto:" + this.agent_email + "?subject=" + this.address;
  }

  makePhone() {
    if (this.agent_phone == '' || this.agent_phone == undefined || this.agent_phone == null) {
      this.agent_phone = '5532 3333';
    }
    window.location.href = "tel:"+this.agent_phone;
  }

}
