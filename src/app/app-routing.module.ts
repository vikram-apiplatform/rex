import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {ListingComponent} from "./listing/listing.component";
import {PropertyComponent} from "./property/property.component";

@NgModule({

  imports: [
    RouterModule.forRoot([
      { path: 'listing', component: ListingComponent },
      { path: 'property/:id', component: PropertyComponent},
      { path: 'property', component: PropertyComponent },
      { path: '**', redirectTo: 'listing' }
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [],

})
export class AppRoutingModule {}
