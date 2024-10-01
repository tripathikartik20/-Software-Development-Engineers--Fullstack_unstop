import { Component, OnInit } from '@angular/core';

interface Seat {
  id: number;
  status: 'available' | 'booked';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  seats: Seat[][] = [];
  bookingCount: number = 1;
  bookedSeats: number[] = [];
  
  totalRows: number = 12; // 11 rows + 1 last row
  seatsPerRow: number = 7; // 7 seats in the first 11 rows
  lastRowSeats: number = 3; // 3 seats in the last row

  ngOnInit() {
    this.initializeSeats();
  }

  // Initialize seat array for 80 seats in the specified layout
  initializeSeats() {
    let seatId = 1;
    for (let row = 1; row <= this.totalRows; row++) {
      let rowSeats: Seat[] = [];
      
      if (row === this.totalRows) {
        // Last row with only 3 seats
        for (let i = 0; i < this.lastRowSeats; i++) {
          rowSeats.push({ id: seatId++, status: 'available' });
        }
      } else {
        // Rows with 7 seats
        for (let i = 0; i < this.seatsPerRow; i++) {
          rowSeats.push({ id: seatId++, status: 'available' });
        }
      }
      this.seats.push(rowSeats);
    }
  }

  // Book seats based on user input
  bookSeats() {
    let numSeats = this.bookingCount;
    if (numSeats < 1 || numSeats > 7) {
      alert('You can book between 1 to 7 seats at a time.');
      return;
    }

    let allocatedSeats: Seat[] = [];

    // Try to book seats in the rows
    for (let row of this.seats) {
      let availableSeats = row.filter((seat) => seat.status === 'available');
      if (availableSeats.length >= numSeats) {
        allocatedSeats = availableSeats.slice(0, numSeats);
        break;
      }
    }

    // Confirm booking
    if (allocatedSeats.length === numSeats) {
      allocatedSeats.forEach((seat) => (seat.status = 'booked'));
      this.bookedSeats.push(...allocatedSeats.map((seat) => seat.id));
    } else {
      alert('Not enough available seats.');
    }
  }

  // Reset all bookings
  resetBookings() {
    this.seats.forEach(row => row.forEach((seat) => (seat.status = 'available')));
    this.bookedSeats = [];
  }
}
