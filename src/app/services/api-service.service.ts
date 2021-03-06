import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { catchError, first, retry } from 'rxjs/operators';
import { of } from 'rxjs';
import { ISystem } from 'src/classes/interfaces/ISystem';
import { IComponent } from 'src/classes/interfaces/IComponent';
import { ITask } from 'src/classes/interfaces/ITask';
import { IArea } from 'src/classes/interfaces/IArea';
import { ISite } from 'src/classes/interfaces/ISite';
import { IClient } from 'src/classes/interfaces/IClient';
import { IMission } from 'src/classes/interfaces/IMission';
import { ISupplier } from 'src/classes/interfaces/ISupplier';

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
  editClient(client: IClient) : void
  {
    this.http.put<IClient>(this.baseurl+"/millenniumfalcon/clients/" + client.id + "/", client, {headers: this.httpHeaders})
    .subscribe();
  }
  addClient(client: IClient) : void
  {
    this.http.post<IClient>(this.baseurl+"/millenniumfalcon/clients/", client, {headers: this.httpHeaders})
    .subscribe();
  }
  deleteClient(client: IClient)
  {
    this.http.delete(this.baseurl+"/millenniumfalcon/clients/" + client.id,  {headers: this.httpHeaders})
    .subscribe();
  }


  getAllSites(): Observable<any>{
    const http$ = this.http.get(this.baseurl+"/millenniumfalcon/sites", {headers: this.httpHeaders});
    return http$;
  }
  getSitesByClient(clientId): Observable<ISite[]>{
    const http$ = this.http.get<ISite[]>(this.baseurl+"/millenniumfalcon/sites?client_id=" + clientId, {headers: this.httpHeaders});
    return http$;
  }
  editSite(site: ISite) : void
  {
    this.http.put<ISite>(this.baseurl+"/millenniumfalcon/sites/" + site.id + "/", site, {headers: this.httpHeaders})
    .subscribe();
  }
  addSite(site: ISite) : void
  {
    this.http.post<ISite>(this.baseurl+"/millenniumfalcon/sites/", site, {headers: this.httpHeaders})
    .subscribe();
  }
  deleteSite(site: ISite)
  {
    this.http.delete(this.baseurl+"/millenniumfalcon/sites/" + site.id,  {headers: this.httpHeaders})
    .subscribe();
  }




  getAllAreas(): Observable<IArea[]>{
    const http$ = this.http.get<IArea[]>(this.baseurl+"/millenniumfalcon/areas", {headers: this.httpHeaders});
    return http$;
  }

  getAreasBySite(siteId): Observable<IArea[]>{
    const http$ = this.http.get<IArea[]>(this.baseurl+"/millenniumfalcon/areas?site_id=" + siteId, {headers: this.httpHeaders});
    return http$;
  }
  editArea(area: IArea) : void
  {
    this.http.put<IArea>(this.baseurl+"/millenniumfalcon/areas/" + area.id + "/", area, {headers: this.httpHeaders})
      .subscribe();
  }
  addArea(area: IArea) : void
  {
    this.http.post<IArea>(this.baseurl+"/millenniumfalcon/areas/", area, {headers: this.httpHeaders})
      .subscribe();
  }
  deleteArea(area: IArea)
  {
    this.http.delete(this.baseurl+"/millenniumfalcon/areas/" + area.id,  {headers: this.httpHeaders})
      .subscribe();
  }

  getAllSystems(): Observable<ISystem[]>{
    const http$ = this.http.get<ISystem[]>(this.baseurl+"/millenniumfalcon/systems", {headers: this.httpHeaders});
    return http$;
  }

  editSystem(system: ISystem) : void
  {
    this.http.put<ISystem>(this.baseurl+"/millenniumfalcon/systems/" + system.id + "/", system, {headers: this.httpHeaders})
    .subscribe();
  }

  addSystem(system: ISystem) : void
  {
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

  getAllTasks(): Observable<ITask[]>{
    const http$ = this.http.get<ITask[]>(this.baseurl+"/millenniumfalcon/tasks", {headers: this.httpHeaders});
    return http$;
  }

  editTask(task: ITask) : void
  {
    this.http.put<ITask>(this.baseurl+"/millenniumfalcon/tasks/" + task.id + "/", task, {headers: this.httpHeaders})
    .subscribe();
  }

  addTask(task: ITask) : void
  {
    this.http.post<ITask>(this.baseurl+"/millenniumfalcon/tasks/", task, {headers: this.httpHeaders})
    .subscribe();
  }

  deleteTasks(tasks: ITask[])
  {
    tasks.forEach(task => {
      this.http.delete(this.baseurl+"/millenniumfalcon/tasks/" + task.id,
      {headers: this.httpHeaders}).subscribe();
    });
  }

  getTasksByMission(missionId): Observable<ITask[]>{
    const http$ = this.http.get<ITask[]>(this.baseurl+"/millenniumfalcon/tasks?mission_id=" + missionId, {headers: this.httpHeaders});
    return http$;
  }

  getAllComponents(): Observable<IComponent[]>{
    const http$ = this.http.get<IComponent[]>(this.baseurl+"/millenniumfalcon/components", {headers: this.httpHeaders});

    return http$;
  }

  getComponentsBySystems(systemsId): Observable<IComponent[]>{
    const http$ = this.http.get<IComponent[]>(this.baseurl+"/millenniumfalcon/components?system_id=" + systemsId, {headers: this.httpHeaders});

    return http$;
  }

  editComponent(component: IComponent) : void
  {
    this.http.put<IComponent >(this.baseurl+"/millenniumfalcon/components/" + component.id + "/", component, {headers: this.httpHeaders})
    .subscribe();
  }

  addComponent(component: IComponent) : void
  {
    this.http.post<IComponent>(this.baseurl+"/millenniumfalcon/components/", component, {headers: this.httpHeaders})
    .subscribe();
  }

  deleteComponents(components: IComponent[])
  {
    components.forEach(component => {
      this.http.delete(this.baseurl+"/millenniumfalcon/components/" + component.id,
      {headers: this.httpHeaders}).subscribe();
    });
  }

  getAllMissions(): Observable<IMission[]>{
    const http$ = this.http.get<IMission[]>(this.baseurl+"/millenniumfalcon/missions", {headers: this.httpHeaders});
    return http$;
  }

  getMissionsByComponents(component_id): Observable<IMission[]>{
    const http$ = this.http.get<IMission[]>(this.baseurl+"/millenniumfalcon/missions?component_id=" + component_id, {headers: this.httpHeaders});
    return http$;
  }

  editMission(mission: IMission) : void
  {
    this.http.put<IMission>(this.baseurl+"/millenniumfalcon/missions/" + mission.id + "/", mission, {headers: this.httpHeaders})
    .subscribe();
  }

  addMission(mission: IMission) : void
  {
    this.http.post<IMission>(this.baseurl+"/millenniumfalcon/missions/", mission, {headers: this.httpHeaders})
    .subscribe();
  }

  deleteMissions(missions: IMission[])
  {
    missions.forEach(mission => {
      this.http.delete(this.baseurl+"/millenniumfalcon/missions/" + mission.id,
        {headers: this.httpHeaders}).subscribe();
    });
  }
  
  getAllSuppliers(): Observable<any>{
    const http$ = this.http.get(this.baseurl+"/millenniumfalcon/suppliers", {headers: this.httpHeaders});
    return http$;
  }

  editSupplier(supplier: ISupplier) : void
  {
    this.http.put<ISupplier>(this.baseurl+"/millenniumfalcon/suppliers/" + supplier.id + "/", supplier, {headers: this.httpHeaders})
    .subscribe();
  }

  addSupplier(supplier: ISupplier) : void
  {
    this.http.post<ISupplier>(this.baseurl+"/millenniumfalcon/suppliers/", supplier, {headers: this.httpHeaders})
    .subscribe();
  }

  deleteSuppliers(suppliers: ISupplier[])
  {
    suppliers.forEach(supplier => {
      this.http.delete(this.baseurl+"/millenniumfalcon/suppliers/" + supplier.id,
        {headers: this.httpHeaders}).subscribe();
    });
  }






}
