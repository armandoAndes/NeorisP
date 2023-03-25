import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './page/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpNeorisService } from './service/http-neoris.service';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { FilterListPipe } from './pipe/filter-list.pipe';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [HomeComponent, InputComponent, ButtonComponent, FilterListPipe, ModalComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [InputComponent, ButtonComponent],
  providers: [HttpNeorisService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class HomeModule {}
