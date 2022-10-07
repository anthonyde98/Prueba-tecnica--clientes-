import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.css']
})
export class DeleteAlertComponent implements OnInit {
  @Input() id = "";
  @Output() close = new EventEmitter<boolean>();
  constructor(private customerService: CustomerService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  eliminar(){
    this.customerService.deleteCustomer(this.id).pipe(
      catchError(error => {
        if (error) {
          if(error.status === 404){
            this.toast.error("Cliente no encontrado", "Error");
          }
          else if(error.status === 400){
            this.toast.error("Se necesita un id valido", "Error");
          }
          else{
            this.toast.error("Hubo un error al buscar el cliente en el servidor", "Error");
          }
        }
        return of(error != null);
      })
    ).subscribe((response: any) => {
      if(response.status === 200){
        this.toast.success("Cliente eliminado", "Cliente");
          
        this.close.emit(false);
      }
    })
  }

  cancelar(){
    this.close.emit(false);
  }
}
