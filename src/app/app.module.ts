import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobDetailsService } from './services/job-details.service';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './common/loader/loader.component';
import { TextboxComponent } from './common/textbox/textbox.component';

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    JobDetailsComponent,
    LoaderComponent,
    TextboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [JobDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
