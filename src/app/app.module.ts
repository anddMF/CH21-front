import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerHomeComponent } from './main/customer-home/customer-home.component';
import { SelectTagComponent } from './shared/select-tag/select-tag.component';
import { OptionButtonsComponent } from './main/customer-home/components/option-buttons/option-buttons.component';
import { ChoicesHubComponent } from './main/choices-hub/choices-hub.component';
import { ImageGalleryComponent } from './main/choices-hub/components/image-gallery/image-gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerHomeComponent,
    SelectTagComponent,
    OptionButtonsComponent,
    ChoicesHubComponent,
    ImageGalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
