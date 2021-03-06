import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/employees/user';
import { Reservation } from 'src/app/models/reservations/reservation';
import { EquipmentType } from 'src/app/models/tools/equipment-type';
import { Hardware } from 'src/app/models/tools/hardware';
import { Software } from 'src/app/models/tools/software';
import { UserService } from 'src/app/services/employees/user.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
import { HardwareService } from 'src/app/services/tools/hardware.service';
import { SoftwareService } from 'src/app/services/tools/software.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {

  status :string[] = environment.RESERVATIONS_STATUS;
  types: EquipmentType[] = environment.EQUIPMENTS_TYPES;
  reservationUser: User = new User();
  reservation: Reservation = new Reservation();
  hardwares: Hardware[] = [];
  softwares: Software[] = [];
  messages = {
    error: "",
    message: ""
  };

  constructor(private activatedRoute: ActivatedRoute,
              private reservationService: ReservationService,
              private softwareService: SoftwareService,
              private hardwareService: HardwareService,
              private userService: UserService) { }

  async ngOnInit() {
    let reservationId = parseInt(this.activatedRoute.snapshot.params["id"]);
    await this.reservationService.getReservationById(reservationId).subscribe(
      async httpResponse => {
        this.reservation = httpResponse
        this.reservation.start_date = this.reservation.start_date.slice(0,16)
        this.reservation.end_date = this.reservation.end_date.slice(0,16);
        await this.userService.getUserById(this.reservation.user).subscribe(
          httpResponse => {
            this.reservationUser = httpResponse;
            console.log(this.reservationUser)
          }
        )
      },
      httpError => console.log(httpError)
    );
    console.log(this.reservation)
    await this.softwareService.getAllSoftwares().subscribe(
      data => this.softwares = data
    );
    await this.hardwareService.getAllHardwares().subscribe(
      data => this.hardwares = data
    );
    
  }

  saveChange() {
    this.reservationService.updateReservation(this.reservation).subscribe(
      response => this.messages = {error: "", message: "Reservation updated successfully"},
      error => {
        this.messages = {error: "Error while updating reservation", message: ""}
        console.log(error)
      }
    )
  }

}
