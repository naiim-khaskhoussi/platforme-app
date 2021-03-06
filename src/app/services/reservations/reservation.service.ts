import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from 'src/app/models/reservations/reservation';
import { EquipmentType } from 'src/app/models/tools/equipment-type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  addReservation(reservation: Reservation) {
    return this.http.post<Reservation>(`${this.API_URL}/reservations/`, reservation);
  }

  getReservationById(reservationId: number) {
    return this.http.get<Reservation>(`${this.API_URL}/reservations/${reservationId}`);
  }

  deleteReservationById(reservationId: number) {
    return this.http.delete(`${this.API_URL}/reservations/${reservationId}/`);
  }

  updateReservation(reservation: Reservation) {
    return this.http.put<Reservation>(`${this.API_URL}/reservations/${reservation.id}/`, reservation);
  }

  getAllReservations() {
    return this.http.get<Reservation[]>(`${this.API_URL}/reservations`);
  }

  getReservationsByAuthor(userId: any) {
    return this.http.get<Reservation[]>(`${this.API_URL}/reservations/?user=${userId}`);
  }

}
