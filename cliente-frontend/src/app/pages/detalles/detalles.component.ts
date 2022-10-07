import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Icliente } from 'src/app/interfaces/icliente';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  private id: string;
  cliente!: Icliente;

  constructor(private rutaActiva: ActivatedRoute, private router: Router, private customerService: CustomerService, private toast: ToastrService) {
    this.id = this.rutaActiva.snapshot.paramMap.get('id') || "";

    if(this.id === ""){
      this.toast.error("Se necesita un id valido", "Error");
      this.router.navigateByUrl("/clientes/listado");
    }
  }

  ngOnInit(): void {
    this.buscarCliente();
  }

  private buscarCliente(){
    this.customerService.getCustomer(this.id).pipe(
      catchError(error => {
        if (error) {
          if(error.status === 404){
            this.toast.error("Cliente no encontrado", "Error");
            this.router.navigateByUrl("/clientes/listado");
          }
          else if(error.status === 400){
            this.toast.error("Se necesita un id valido", "Error");
            this.router.navigateByUrl("/clientes/listado");
          }
          else{
            this.toast.error("Hubo un error al buscar el cliente en el servidor", "Error");
            this.router.navigateByUrl("/clientes/listado");
          }
        }
        return of(error != null);
      })
    ).subscribe((response: any) => {
      if(response.status === 200){
        this.cliente = response.body;
      }
    })
  }
}
