import { Component, OnInit } from '@angular/core';
import { Reserve } from 'src/app/models/Reserve';
import { ReservationService } from 'src/app/GeneralServices/reservation.service';
import { DialogManager } from 'src/app/GeneralServices/dialog-manager.service';

@Component({
  selector: 'app-show-reservations',
  templateUrl: './show-reservations.component.html',
  styleUrls: ['./show-reservations.component.scss']
})
export class ShowReservationsComponent implements OnInit {
  constructor(
    public _reservation: ReservationService,
    public _dialog: DialogManager
  ) { }

  ngOnInit() {
    if(! this._reservation.reservations){
      this._reservation.getReservations();
      this._reservation.loading = true;
    }
  }

  deleteReservation(id: number) {
    this._reservation.deleteReservation(id);
  }

}
