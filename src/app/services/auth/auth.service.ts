import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDocente } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private httpClient: HttpClient) { }

  GetAllUsers():Observable<IDocente>{
    return this.httpClient.get<IDocente>(`${environment.apiURL}/usuarios`);
  }

  GetUserById(codigo:any): Observable<IDocente>{
    return this.httpClient.get<IDocente>(`${environment.apiURL}/usuarios/?username=${codigo}`);
  }

  IsLoggedIn() {
    return sessionStorage.getItem('username')!=null;
  }

  GetUserrole(){
    return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():'';
  }

  IsExiste(){
    if (this.IsLoggedIn()){
      return true
    }
    else{
      return false
    }
  }
  private apiUrldocentes = 'http://localhost:3300/docentes';
  private apiUrlalumnos = 'http://localhost:3300/alumnos';

  listausuarios(email: string, password: string): Observable<any> {
    const docentesRequest = this.httpClient.get(this.apiUrldocentes);
    const alumnosRequest = this.httpClient.get(this.apiUrlalumnos);
    return forkJoin([docentesRequest, alumnosRequest]);
  }}



 
