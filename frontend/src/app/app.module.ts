import {NgModule} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
    declarations: [

      ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        HttpClientModule
    ],
    exports: [],
    providers: [],
    bootstrap: []
})
export class AppModule {
}
