import { Component, OnInit } from '@angular/core';
import { Reserve } from 'src/app/Models/Reserve';
import { ReservationService } from 'src/app/GeneralServices/reservation.service';
import { DialogManager } from 'src/app/GeneralServices/dialog-manager.service';

@Component({
  selector: 'app-show-reservations',
  templateUrl: './show-reservations.component.html',
  styleUrls: ['./show-reservations.component.scss']
})
export class ShowReservationsComponent implements OnInit {
  reservations: Array<Reserve>;
  constructor(
    public _reservation: ReservationService,
    private _dialog: DialogManager
  ) { }

  ngOnInit() {
    if(!this.reservations){
      this._reservation.getReservations();
      this._reservation.loading = true;
    }
  }

  deleteReservation(id: number) {
    this._reservation.deleteReservation(id);
  }

}
