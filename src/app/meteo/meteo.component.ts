import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WeatherService} from "../service/weather.service";
import {Weather} from "./weather";

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {

  contactForm = new FormGroup({
    nomville: new FormControl('',[ Validators.required]),
  });
  reponse!: Weather;
  responseBody="";
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
    reponse.subscribe(data=>{
      this.responseBody= JSON.stringify(data)
      this.setupWeather();
      //console.log(this.responseBody)
    })


    //console.log(reponse)
    /*if (reponse !== undefined){
      let jreponse = JSON.parse(reponse)
      console.log(jreponse)
      if (this.reponse == undefined){
        this.reponse = new Weather();
      }

      this.reponse.name = jreponse.name
      this.reponse.feels_like = jreponse.main.feels_like
      this.reponse.temp = jreponse.main.temp
      this.reponse.wdescription = jreponse.weather[0].description
      this.reponse.windspeed = jreponse.wind.speed
      this.reponse.pressure = jreponse.main.pressure
      this.reponse.humidity = jreponse.main.humidity

    }*/

  }

  ngOnchanges(){

  }

  private setupWeather() {
    console.log(this.responseBody)
    let jreponse = JSON.parse(this.responseBody)
    console.log(jreponse)
    if (this.reponse == undefined){
      this.reponse = new Weather();
    }

    this.reponse.name = jreponse.name
    this.reponse.feels_like = jreponse.main.feels_like
    this.reponse.temp = jreponse.main.temp
    this.reponse.wdescription = jreponse.weather[0].description
    this.reponse.windspeed = jreponse.wind.speed
    this.reponse.pressure = jreponse.main.pressure
    this.reponse.humidity = jreponse.main.humidity
  }
}
