import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  //#region POST
  public MakePostRequest<TResponse>(
    path: string,
    body: any,
    params: HttpParams = new HttpParams()
  ): Observable<HttpResponse<TResponse>> {
    const res = this.http.post<TResponse>(environment.apiUrl + path, body, {
      observe: 'response',
      params,
      headers: new HttpHeaders(
        {
          Authorization: this.authService.token
        }
      )
    });
    return res;
  }

  public MakeSecurePostRequest<TResponse>(
    path: string,
    body: any
  ): Observable<HttpResponse<TResponse>> {
    return this.http.post<TResponse>(environment.apiUrl + path, body, {
      observe: 'response',
      headers: new HttpHeaders(
        {
          Authorization: this.authService.token
        }
      )
    });
  }
  //#endregion

  //#region PUT
  public MakePutRequest<TResponse>(
    path: string,
    body: any
  ): Observable<HttpResponse<TResponse>> {
    const res = this.http.put<TResponse>(environment.apiUrl + path, body, {
      observe: 'response',
      headers: new HttpHeaders(
        {
          Authorization: this.authService.token
        }
      )
    });
    return res;
  }

  public MakeSecurePutRequest<TResponse>(
    path: string,
    body: any
  ): Observable<HttpResponse<TResponse>> {

    return this.http.put<TResponse>(environment.apiUrl + path, body, {
      observe: 'response',
      headers: new HttpHeaders(
        {
          Authorization: this.authService.token
        }
      )
    });
  }
  //#endregion

  //#region GET
  public MakeGetRequest<TResponse>(
    path: string
  ): Observable<HttpResponse<TResponse>> {
    return this.http.get<TResponse>(environment.apiUrl + path, {
      observe: 'response',
      headers: new HttpHeaders(
        {
          Authorization: this.authService.token
        }
      )
    });
  }

  public MakeSecureGetRequest<TResponse>(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<HttpResponse<TResponse>> {
    return this.http.get<TResponse>(environment.apiUrl + path, {
      observe: 'response',
      params,
      headers: new HttpHeaders(
        {
          Authorization: this.authService.token
        }
      )
    });
  }
  //#endregion

  //#region DELETE
  public MakeDeleteRequest<TResponse>(
    path: string
  ): Observable<HttpResponse<TResponse>> {
    return this.http.delete<TResponse>(environment.apiUrl + path, {
      observe: 'response',
      headers: new HttpHeaders(
        {
          Authorization: this.authService.token
        }
      )
    });
  }

  public MakeSecureDeleteRequest<TResponse>(
    path: string
  ): Observable<HttpResponse<TResponse>> {
    return this.http.delete<TResponse>(environment.apiUrl + path, {
      observe: 'response',
      headers: new HttpHeaders(
        {
          Authorization: this.authService.token
        }
      )
    });
  }
  //#endregion
}
