import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  success(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      background: '#0F1414',
      color: '#efefef',
      confirmButtonColor: '#014F4F',
      text: message,

    });
  }

  error(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      background: '#0F1414',
      color: '#efefef',
      confirmButtonColor: '#014F4F',
      text: message,

    });
  }
}
