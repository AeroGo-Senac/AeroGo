import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { User } from '../../../types';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getUserByEmailAndPassword(email: string, password: string): Observable<User[]> {
    return this.http.get<any>(`${this.apiUrl}?email=${email}&password_hash=${password}`);
  }


}