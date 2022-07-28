import {Component, OnInit} from '@angular/core';
import {ServicesService} from "../services.service";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  token: any;
  searchValue = '';
  selectedProperty = '';
  selectedFeature = '';
  selectedState = '';
  selectedSpecification = '';
  propertyTypes: any = [];
  features: any = [];
  states: any = [];
  specifications: any = [];

  filteredList: any;

  list = [
    {
      img: 'https://i2.au.reastatic.net/360x270-format=avif,/b33bb4e47b9db0bcdac2a8e2eb469d51d09b08413f5d4024ca9b0b9cc0c921ea/image.jpg',
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

  listings: any = [];
  id_list: any = [];


  constructor(private service: ServicesService) {
  }

  ngOnInit(): void {
    this.service.getListing().subscribe(res1 => {
      let tempListing: any = res1;
      this.id_list = [];
      if (res1) {
        let result = tempListing['result']['rows'];
        for (const item of result) {
          let obj: any = {};

          obj['price'] = item.price_advertise_as;
          if (item.under_contract === true) {
            obj['price'] = 'Under Contract';
          }
          obj['latitude'] = item.property.adr_latitude;
          obj['longitude'] = item.property.adr_longitude;
          obj['address'] = item.property.system_search_key;
          obj['type'] = item.property.property_category.text;
          obj['state'] = item.system_listing_state
          if (!this.states.includes(item.system_listing_state)) {
            this.states.push(item.system_listing_state);
          }
          if (!this.propertyTypes.includes(item.property.property_category.text)) {
            this.propertyTypes.push(item.property.property_category.text);
          }
          if (item.listing_primary_image !== null) {
            obj['img'] = 'https:' + item.listing_primary_image.url;
          } else {
            obj['img'] = 'https://i2.au.reastatic.net/360x270-format=avif,/b33bb4e47b9db0bcdac2a8e2eb469d51d09b08413f5d4024ca9b0b9cc0c921ea/image.jpg';
          }
          obj['id'] = item.property.id;
          if (obj['price'] != null && obj['price'] != 'Call Agent') {
            this.listings.push(obj);
            this.id_list.push(item.property.id);
          }

          // this.service.getProperty(item.property.id).subscribe(res2 => {
          //   let tempProperty: any = res2;
          //   if(res2){
          //     obj['bedrooms'] = tempProperty['result']['attr_bedrooms'];
          //     obj['bathrooms'] = tempProperty['result']['attr_bathrooms'];
          //     obj['carports'] = tempProperty['result']['attr_total_car_accom'];
          //     let featuresList:any = tempProperty['result']['related']['property_features'];
          //     let featureList:any = [];
          //     for(const feature of featuresList){
          //       if (!this.features.includes(feature.feature_name)) {
          //         this.features.push(feature.feature_name);
          //       }
          //       featureList.push(feature.feature_name);
          //     }
          //     obj['features'] = featureList;
          //     if (obj['address'],obj['bedrooms'],obj['bathrooms'],obj['carports']) {
          //       let tempSpecification = [obj['bedrooms']+' Bedroom',obj['bathrooms']+' Bathroom',obj['carports']+' Car Space'];
          //       obj['specification'] = tempSpecification;
          //       for (let item of tempSpecification){
          //         if(!this.specifications.includes(item)){
          //           this.specifications.push(item)
          //         }
          //       }
          //       this.specifications = this.specifications.sort();
          //       this.listings.push(obj);
          //     }
          //     // console.log(this.listings)
          //
          //   }
          // });
        }
        // console.log(this.listings)
        this.service.getProperties(this.id_list).subscribe(res2 => {
          let temp: any = res2;
          if (res2) {
            for (let item of temp) {
              let result = item['result'];
              for (let obj of this.listings) {
                if (String(result['id']) === String(obj['id'])) {
                  obj['bedrooms'] = result['attr_bedrooms'];
                  obj['bathrooms'] = result['attr_bathrooms'];
                  obj['carports'] = result['attr_total_car_accom'];
                  let featuresList: any = result['related']['property_features'];
                  let featureList: any = [];
                  for (const feature of featuresList) {
                    if (!this.features.includes(feature.feature_name)) {
                      this.features.push(feature.feature_name);
                    }
                    featureList.push(feature.feature_name);
                  }
                  obj['features'] = featureList;
                  if (obj['address'] && obj['bedrooms']&& obj['bathrooms']&& obj['carports']) {
                    let tempSpecification = [obj['bedrooms'] + ' Bedroom', obj['bathrooms'] + ' Bathroom', obj['carports'] + ' Car Space'];
                    obj['specification'] = tempSpecification;

                    for (let item of tempSpecification) {
                      if (!this.specifications.includes(item)) {
                        this.specifications.push(item)
                      }
                    }
                    this.specifications = this.specifications.sort();
                  }
                }
              }
            }
            for(let i=0; i<this.listings.length;i++){
              if (!this.listings[i]['bedrooms']|| !this.listings[i]['bathrooms']||!this.listings[i]['carports']){
                this.listings.splice(i,1);
              }
            }
          }
        });

        this.filteredList = this.listings;
        // console.log(this.filteredList)
      }
    });
  }

  searchProperty(e: any) {
    this.selectedProperty = '';
    this.selectedState = '';
    this.selectedFeature = '';
    const filterValue = e.toLowerCase();
    let temp: any = this.listings;
    if (filterValue !== undefined && filterValue !== '') {
      temp = temp.filter((option: any) => option['address'].toLowerCase().includes(filterValue));
      this.filteredList = temp;
    } else {
      this.filteredList = this.listings;
    }

  }

  onChangeProperty(e: any) {
    this.selectedState = '';
    this.selectedFeature = '';
    this.searchValue = '';
    const filterValue = e.value;
    let temp = this.listings;
    if (filterValue !== undefined) {
      temp = temp.filter((option: any) => option['type'] === filterValue);
      this.filteredList = temp;
    } else {
      this.filteredList = this.listings;
    }
  }

  onChangePropertyState(e: any) {
    this.selectedProperty = '';
    this.selectedFeature = '';
    this.searchValue = '';
    const filterValue = e.value;
    let temp = this.listings;
    if (filterValue !== undefined) {
      temp = temp.filter((option: any) => option['specification'].includes(filterValue));
      this.filteredList = temp;
    } else {
      this.filteredList = this.listings;
    }
  }

  onChangeFeature(e: any) {
    this.selectedState = '';
    this.selectedProperty = '';
    this.searchValue = '';
    const filterValue = e.value;
    let temp = this.listings;
    if (filterValue !== undefined) {
      temp = temp.filter((option: any) => option['features'].includes(filterValue));
      this.filteredList = temp;
    } else {
      this.filteredList = this.listings;
    }

  }

  onClickType(type: any) {
    // console.log(type);
    this.selectedProperty = type;
    const filterValue = type;
    let temp = this.listings;
    if (filterValue !== undefined) {
      temp = temp.filter((option: any) => option['type'] === filterValue);
      this.filteredList = temp;
    } else {
      this.filteredList = this.listings;
    }
  }

}
