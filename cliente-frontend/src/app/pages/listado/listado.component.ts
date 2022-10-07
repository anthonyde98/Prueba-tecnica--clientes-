import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Icliente } from 'src/app/interfaces/icliente';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  selectedFilter: string = "";
  fields = [
    { value: "name", text: "Nombre" },
    { value: "last_name", text: "Apellido" },
    { value: "email", text: "Correo" },
    { value: "birth_date", text: "Fecha de nacimiento" },
    { value: "telephone", text: "Teléfono" },
    { value: "identity_document", text: "Documento de identidad" },
    { value: "addresses.street", text: "Calle" },
    { value: "addresses.building", text: "Edificio/Casa/Apartamento" },
    { value: "addresses.sector", text: "Sector" },
    { value: "addresses.city", text: "Ciudad" },
    { value: "addresses.municipality", text: "Municipio" },
    { value: "addresses.postal_code", text: "Código postal" },
  ];

  deleteId = "";

  selectedFilterBy: string = this.fields[0].value;
  selectedOrderBy: string = this.fields[0].value;
  selectedOrder: string = "asc";
  clientes: Icliente[] = [];

  constructor(private customerService: CustomerService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.busqueda();
  }

  busqueda(){
    const query = {
      filterBy: this.selectedFilterBy,
      filter: this.selectedFilter,
      orderBy: this.selectedOrderBy,
      order: this.selectedOrder
    }

    this.customerService.getCustomers(query).pipe(
      catchError(error => {
        if (error) {
          this.toast.error("Hubo un error al buscar los clientes en el servicor", "Error");
        }
        return of(error != null);
      })
    ).subscribe((response: any) => {
      if(response.status === 200){
        this.clientes = response.body;
      }
    })
  }

  closeAlert(event: any){
    this.deleteId = "";
    this.busqueda();
  }
}
