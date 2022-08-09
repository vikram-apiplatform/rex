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

  list = [
    {
      img: 'https://i2.au.reastatic.net/800x600-format=webp/385b5d85557528ac8163abb974384f6a14e70b61c28eedb2d6963884772ebd25/image.jpg',
      address: '4/15 Huth Street, Labrador, Qld 4215',
      type: 'Unit',
      price: '$449,999',
      features: ['2 Bedroom', '1 Bathroom', '1 Car Space']
    },
    {
      img: 'https://images.squarespace-cdn.com/content/v1/62818b2033250a12dc7edff5/1656478836051-86F303YI0DZZN0YI6BVD/2-117+Eugaree+Street.png?format=750w',
      address: '2/117 Eugaree Street, Southport, Qld 4215',
      type: 'Townhouse',
      price: 'Under Contract',
      features: ['3 Bedroom', '2 Bathroom', '2 Car Space']
    },
    {
      img: 'https://images.squarespace-cdn.com/content/v1/62818b2033250a12dc7edff5/1656478783260-S9RPS3A0WXNVF56GR34N/26+Dandar+Drive.png?format=750w',
      address: '26 Dandar Drive, Southport, Qld 4215',
      type: 'House',
      price: '$820,000',
      features: ['3 Bedroom', '1 Bathroom', '1 Car Space']
    },
    {
      img: 'https://images.squarespace-cdn.com/content/v1/62818b2033250a12dc7edff5/1656478713653-GL3APPSOIQT45QW7ZZI7/2-20+Botanical+Drive.png?format=750w',
      address: '2/20 Botanical Drive, Labrador, Qld 4215',
      type: 'Duplex/Semi-detached',
      price: '$565,000',
      features: ['2 Bedroom', '1 Bathroom', '2 Car Space']
    },
    {
      img: 'https://images.squarespace-cdn.com/content/v1/62818b2033250a12dc7edff5/1656478655102-J6N95EAFB1J8IVP8N3EF/9+Banks+Drive.png?format=750w',
      address: '9 Banks Drive, Ormeau, Qld 4208',
      type: 'House',
      price: '$649,000',
      features: ['4 Bedroom', '2 Bathroom', '2 Car Space']
    },
    {
      img: 'https://images.squarespace-cdn.com/content/v1/62818b2033250a12dc7edff5/1656478596853-GV2LOIYEVZP21XYPL2N8/240+Nerang+Road.png?format=750w',
      address: '240 Nerang Road, Southport, Qld 4215',
      type: 'House',
      price: '$780,000',
      features: ['3 Bedroom', '1 Bathroom', '1 Car Space']
    },
    {
      img: 'https://images.squarespace-cdn.com/content/v1/62818b2033250a12dc7edff5/1656478536657-R6W41FQUJCGENPVK1CH5/2313-397+Christine+Avenue.png?format=750w',
      address: '2313/397 Christine Avenue, Varsity Lakes, Qld 4227',
      type: 'Unit',
      price: '$550,000',
      features: ['2 Bedroom', '1 Bathroom', '1 Car Space']
    },
    {
      img: 'https://images.squarespace-cdn.com/content/v1/62818b2033250a12dc7edff5/1656478460062-V3UI8XIWEX4K90DJ9POT/6-63+Cavill+Avenue.png?format=750w',
      address: '6/63 Cavill Avenue, Surfers Paradise, Qld 4217',
      type: 'House',
      price: '$499,000',
      features: ['2 Bedroom', '1 Bathroom', '1 Car Space']
    }
  ];

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
    window.location.href = "mailto:" + this.agent_email + "?subject=" + this.address;
  }

  makePhone() {
    window.location.href = "tel:"+this.agent_phone;
  }

}
