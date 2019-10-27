import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISystem } from 'src/classes/interfaces/ISystem';
import { IComponent } from 'src/classes/interfaces/IComponent';
import { IArea } from 'src/classes/interfaces/IArea';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<any>{
    return this.http.get(this.baseurl+"/millenniumfalcon/clients", {headers: this.httpHeaders});
  }

  getAllSites(): Observable<any>{
    return this.http.get(this.baseurl+"/millenniumfalcon/sites", {headers: this.httpHeaders});
  }

  getAllAreas(): Observable<IArea[]>{
    return this.http.get<IArea[]>(this.baseurl+"/millenniumfalcon/areas", {headers: this.httpHeaders});
  }

  getAllSystems(): Observable<ISystem[]>{
    return this.http.get<ISystem[]>(this.baseurl+"/millenniumfalcon/systems", {headers: this.httpHeaders});
  }

  getSystemsByArea(areaId): Observable<ISystem[]>{
    return this.http.get<ISystem[]>(this.baseurl+"/millenniumfalcon/systems?area_id=" + areaId, {headers: this.httpHeaders});
  }

  getAllComponents(): Observable<IComponent[]>{
    return this.http.get<IComponent[]>(this.baseurl+"/millenniumfalcon/components", {headers: this.httpHeaders});
  }
  getComponentBySystem(systemsId): Observable<IComponent[]>{
    return this.http.get<IComponent[]>(this.baseurl+"/millenniumfalcon/components?system_id=" + systemsId, {headers: this.httpHeaders});
  }
}

