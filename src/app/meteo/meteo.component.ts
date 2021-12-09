import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WeatherService} from "../service/weather.service";

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {

  contactForm = new FormGroup({
    nomville: new FormControl('',[ Validators.required]),
  });
  reponse!: string;

  constructor(private weatherService: WeatherService) {

  }

  ngOnInit(): void {

  }

  onFormSubmit() {

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }
    let reponse = this.weatherService.getCityWeather(this.contactForm.get('nomville')?.value)
    console.log(reponse)
    /*if (reponse){
      this.reponse= reponse
      console.log(this.reponse)
    }*/

  }

  ngOnchanges(){

  }

}
