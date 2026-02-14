// src/app/services/weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'cc32d6c0542f4ab2aa654956242006 '; // Reemplaza 'YOUR_API_KEY' con tu clave real
  private baseUrl = 'http://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {}

  getWeatherForecast(location: string, days: number): Observable<any> {
    const url = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${location}&days=${days}`;
    return this.http.get<any>(url);
  }

  // Método para obtener el clima actual
  getWeather(location: string): Observable<any> {
    const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${location}`;
    return this.http.get<any>(url);
  }
}
