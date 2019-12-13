import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { catchError, first, retry } from 'rxjs/operators';
import { of } from 'rxjs';
import { ISystem } from 'src/classes/interfaces/ISystem';
import { IComponent } from 'src/classes/interfaces/IComponent';
import { IArea } from 'src/classes/interfaces/IArea';
import { ISite } from 'src/classes/interfaces/ISite';
import { IMission } from 'src/classes/interfaces/IMission';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});



  constructor(private http: HttpClient) { }  

  getConfig() {
    const http$ = this.http.get(this.baseurl+"/millenniumfalcon/sites", {headers: this.httpHeaders});
    
    return http$;
  }

   //------------------------- end connection ping ---------- 

  getAllClients(): Observable<any>{
    const http$ = this.http.get(this.baseurl+"/millenniumfalcon/clients", {headers: this.httpHeaders});
    
    return http$;
  }

  getAllSites(): Observable<any>{
    const http$ = this.http.get(this.baseurl+"/millenniumfalcon/sites", {headers: this.httpHeaders});
    
    return http$;
  }

  getAllAreas(): Observable<IArea[]>{
    const http$ = this.http.get<IArea[]>(this.baseurl+"/millenniumfalcon/areas", {headers: this.httpHeaders});
    return http$;
  }

  getAreasBySite(siteId): Observable<IArea[]>{
    const http$ = this.http.get<IArea[]>(this.baseurl+"/millenniumfalcon/areas?site_id=" + siteId, {headers: this.httpHeaders});
    
    return http$;
  }

  getAllSystems(): Observable<ISystem[]>{
    const http$ = this.http.get<ISystem[]>(this.baseurl+"/millenniumfalcon/systems", {headers: this.httpHeaders});
    
    return http$;
  }

  editSystem(system: ISystem) : void
  {
    var systemData = {name: system.name, priority: system.priority}; 
    //TODO: Only pass systemData but Django responses with BadRequest (400). 
    //Correction in Django needed @Florian

    this.http.put<ISystem>(this.baseurl+"/millenniumfalcon/systems/" + system.id + "/", system, {headers: this.httpHeaders})
    .subscribe();
  }

  addSystem(system: ISystem) : void
  {
    var systemData = {name: system.name, priority: system.priority}; 
    //TODO: Only pass systemData but Django responses with BadRequest (400). 
    //Correction in Django needed @Florian

    this.http.post<ISystem>(this.baseurl+"/millenniumfalcon/systems/", system, {headers: this.httpHeaders})
    .subscribe();
    
  }

  deleteSystems(systems: ISystem[])
  {
    systems.forEach(system => {
      this.http.delete(this.baseurl+"/millenniumfalcon/systems/" + system.id, 
      {headers: this.httpHeaders}).subscribe();
    });
  }

  getSystemsByArea(areaId): Observable<ISystem[]>{
    const http$ = this.http.get<ISystem[]>(this.baseurl+"/millenniumfalcon/systems?area_id=" + areaId, {headers: this.httpHeaders});
    
    
    return http$;
  }

  getAllComponents(): Observable<IComponent[]>{
    const http$ = this.http.get<IComponent[]>(this.baseurl+"/millenniumfalcon/components", {headers: this.httpHeaders});
    
    return http$;
  }

  deleteMissions(missions: IMission[])
  {
    missions.forEach(mission => {
      this.http.delete(this.baseurl+"/millenniumfalcon/missions/" + mission.id, 
      {headers: this.httpHeaders}).subscribe();
    });
  }

  getComponentsBySystems(systemsId): Observable<IComponent[]>{
    const http$ = this.http.get<IComponent[]>(this.baseurl+"/millenniumfalcon/components?system_id=" + systemsId, {headers: this.httpHeaders});
    
    return http$;
  }

  getAllMissions(): Observable<IMission[]>{
    const http$ = this.http.get<IMission[]>(this.baseurl+"/millenniumfalcon/missions", {headers: this.httpHeaders});
    
    return http$;
  }

  getMissionsByComponents(component_id): Observable<IMission[]>{
    const http$ = this.http.get<IMission[]>(this.baseurl+"/millenniumfalcon/missions?component_id=" + component_id, {headers: this.httpHeaders});
    
    return http$;
  }
}

