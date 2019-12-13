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
    http$
    .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => console.log('api-service [success]: getConnection HTTP response', res),
        err => console.log('api-service [error]: getConnection HTTP Error', err),
        () => console.log('api-service [completed]: getConnection HTTP request completed.')
    );
    return http$;
  }

   //------------------------- end connection ping ---------- 

  getAllClients(): Observable<any>{
    const http$ = this.http.get(this.baseurl+"/millenniumfalcon/clients", {headers: this.httpHeaders});
    http$
    .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => console.log('api-service [success]: getAllClients HTTP response', res),
        err => console.log('api-service [error]: getAllClients HTTP Error', err),
        () => console.log('api-service [completed]: getAllClients HTTP request completed.')
    );
    return http$;
  }

  getAllSites(): Observable<any>{
    const http$ = this.http.get(this.baseurl+"/millenniumfalcon/sites", {headers: this.httpHeaders});
    http$
    .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => console.log('api-service [success]: getAllSites HTTP response', res),
        err => console.log('api-service [error]: getAllSites HTTP Error', err),
        () => console.log('api-service [completed]: getAllSites HTTP request completed.')
    );
    return http$;
  }

  getAllAreas(): Observable<IArea[]>{
    const http$ = this.http.get<IArea[]>(this.baseurl+"/millenniumfalcon/areas", {headers: this.httpHeaders});
    http$
    .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => console.log('api-service [success]: getAllAreas HTTP response', res),
        err => console.log('api-service [error]: getAllAreas HTTP Error', err),
        () => console.log('api-service [completed]: getAllAreas HTTP request completed.')
    );
    return http$;
  }

  getAreasBySite(siteId): Observable<IArea[]>{
    const http$ = this.http.get<IArea[]>(this.baseurl+"/millenniumfalcon/areas?site_id=" + siteId, {headers: this.httpHeaders});
    http$
    .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => console.log('api-service [success]: getAreasBySite HTTP response', res),
        err => console.log('api-service [error]: getAreasBySite HTTP Error', err),
        () => console.log('api-service [completed]: getAreasBySite HTTP request completed.')
    );
    return http$;
  }

  getAllSystems(): Observable<ISystem[]>{
    const http$ = this.http.get<ISystem[]>(this.baseurl+"/millenniumfalcon/systems", {headers: this.httpHeaders});
    
    http$
    .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => console.log('api-service [success]: getAllSystems HTTP response', res),
        err => console.log('api-service [error]: getAllSystems HTTP Error', err),
        () => console.log('api-service [completed]: getAllSystems HTTP request completed.')
    );

    return http$;
  }

  editSystem(system: ISystem) : void
  {
    var systemData = {name: system.name, priority: system.priority}; 
    //TODO: Only pass systemData but Django responses with BadRequest (400). 
    //Correction in Django needed @Florian

    this.http.put<ISystem>(this.baseurl+"/millenniumfalcon/systems/" + system.id + "/", system, {headers: this.httpHeaders})
    .subscribe(
      res => console.log('api-service [success]: editSystem HTTP response', res),
      err => console.log('api-service [error]: editSystem HTTP Error', err),
      () => console.log('api-service [completed]: editSystem HTTP request completed.'));
    
  }

  addSystem(system: ISystem) : void
  {
    var systemData = {name: system.name, priority: system.priority}; 
    //TODO: Only pass systemData but Django responses with BadRequest (400). 
    //Correction in Django needed @Florian

    this.http.post<ISystem>(this.baseurl+"/millenniumfalcon/systems/", system, {headers: this.httpHeaders})
    .subscribe(
      res => console.log('api-service [success]: editSystem HTTP response', res),
      err => console.log('api-service [error]: editSystem HTTP Error', err),
      () => console.log('api-service [completed]: editSystem HTTP request completed.'));
    
  }

  deleteSystems(systems: ISystem[])
  {
    systems.forEach(system => {
      this.http.delete(this.baseurl+"/millenniumfalcon/systems/" + system.id, 
      {headers: this.httpHeaders}).subscribe((data) => console.log(data));
    });
  }

  getSystemsByArea(areaId): Observable<ISystem[]>{
    const http$ = this.http.get<ISystem[]>(this.baseurl+"/millenniumfalcon/systems?area_id=" + areaId, {headers: this.httpHeaders});
    
    http$
    .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => console.log('api-service [success]: getSystemsByArea HTTP response', res),
        err => console.log('api-service [error]: getSystemsByArea HTTP Error', err),
        () => console.log('api-service [completed]: getSystemsByArea HTTP request completed.')
    );
    return http$;
  }

  getAllComponents(): Observable<IComponent[]>{
    const http$ = this.http.get<IComponent[]>(this.baseurl+"/millenniumfalcon/components", {headers: this.httpHeaders});
    http$
    .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => console.log('api-service [success]: getAllComponents HTTP response', res),
        err => console.log('api-service [error]: getAllComponents HTTP Error', err),
        () => console.log('api-service [completed]: getAllComponents HTTP request completed.')
    );
    return http$;
  }

  deleteMissions(missions: IMission[])
  {
    missions.forEach(mission => {
      this.http.delete(this.baseurl+"/millenniumfalcon/missions/" + mission.id, 
      {headers: this.httpHeaders}).subscribe((data) => console.log(data));
    });
  }

  getComponentsBySystems(systemsId): Observable<IComponent[]>{
    const http$ = this.http.get<IComponent[]>(this.baseurl+"/millenniumfalcon/components?system_id=" + systemsId, {headers: this.httpHeaders});
    http$
    .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => console.log('api-service [success]: getComponentsBySystems HTTP response', res),
        err => console.log('api-service [error]: getComponentsBySystems HTTP Error', err),
        () => console.log('api-service [completed]: getComponentsBySystems HTTP request completed.')
    );
    return http$;
  }

  getAllMissions(): Observable<IMission[]>{
    const http$ = this.http.get<IMission[]>(this.baseurl+"/millenniumfalcon/missions", {headers: this.httpHeaders});
    http$
    .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => console.log('api-service [success]: getComponentsBySystems HTTP response', res),
        err => console.log('api-service [error]: getComponentsBySystems HTTP Error', err),
        () => console.log('api-service [completed]: getComponentsBySystems HTTP request completed.')
    );
    return http$;
  }

  getMissionsByComponents(component_id): Observable<IMission[]>{
    const http$ = this.http.get<IMission[]>(this.baseurl+"/millenniumfalcon/missions?component_id=" + component_id, {headers: this.httpHeaders});
    http$
    .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => console.log('api-service [success]: getComponentsBySystems HTTP response', res),
        err => console.log('api-service [error]: getComponentsBySystems HTTP Error', err),
        () => console.log('api-service [completed]: getComponentsBySystems HTTP request completed.')
    );
    return http$;
  }
}

