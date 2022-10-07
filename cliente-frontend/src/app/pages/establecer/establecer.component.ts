import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Icliente } from 'src/app/interfaces/icliente';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-establecer',
  templateUrl: './establecer.component.html',
  styleUrls: ['./establecer.component.css']
})
export class EstablecerComponent implements OnInit {
  customerForm!: FormGroup;
  action = "Agregar";
  private id: string;
  private cliente!: Icliente;

  constructor(private fb: FormBuilder, private rutaActiva: ActivatedRoute, private router: Router, private customerService: CustomerService, private toast: ToastrService) {
    this.id = this.rutaActiva.snapshot.queryParamMap.get('id') || "";
    this.setForm();
   }

  ngOnInit(): void {
    if(this.id){
      this.action = "Editar";
      this.buscarCliente();
    }
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
        this.editForm();
      }
    })
  }

  setForm(){
    this.customerForm = this.fb.group({
      name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      addresses: this.fb.array([this.createAddress()]),
      birth_date: ["", [Validators.required]],
      telephone: ["", [Validators.required]],
      identity_document: ["", [Validators.required]]
    })
  }

  private editForm(){
    for(let i = 1; i < this.cliente.addresses.length; i++)
    {
      this.addAddress();
    }

    this.customerForm.patchValue({
      name: this.cliente.name,
      last_name: this.cliente.last_name,
      email: this.cliente.email,
      addresses: this.cliente.addresses,
      birth_date: this.cliente.birth_date.toString().split("T")[0],
      telephone: this.cliente.telephone,
      identity_document: this.cliente.identity_document
    })
  }

  sendFormData(){
    if(this.customerForm.invalid){
      this.toast.warning("Cliente", "Debe de colocar todos los campos");
      return;
    }

    if(this.id && this.cliente){
      this.customerService.updateCustomer(this.id, this.customerForm.value).pipe(
        catchError(error => {
          if(error) {
            if(error.status === 400){
              if(error.error.code === 11000){
                if(error.error.keyPattern['email']){
                  this.toast.error(`Este valor ${error.error.keyValue['email']} ya esta registrado`, "Error");
                }
                else{
                  this.toast.error(`Este valor ${error.error.keyValue['identity_document']} ya esta registrado`, "Error");
                }
              }
            }
            else{
              this.toast.error("Hubo un error en el servidor", "Error");
            }
          }
          return of(error != null);
        })
      ).subscribe((response: any) => {
        if(response.status === 200){
          this.toast.success("Cliente fue editado con exito", "Cliente");
          this.router.navigateByUrl('/clientes/listado');
        }
      })
    }
    else{
      this.customerService.addCustomer(this.customerForm.value).pipe(
        catchError(error => {
          if(error) {
            if(error.status === 400){
              this.toast.error(error.error.message, "Error");
            }
            else{
              this.toast.error("Ha ocurrido un error", "Error");
            }
          }
          return of(error != null);
        })
      ).subscribe((response: any) => {
        if(response.status === 201){
          this.toast.success("Cliente creado con exito", "Cliente");
          this.customerForm.reset();
        }
      })
    }
  }

  get addressFormGroups() {
    return this.customerForm.get("addresses") as FormArray
  }

  private createAddress(): FormGroup{
    return new FormGroup({
      street: new FormControl("", [Validators.required]),
      building: new FormControl("", [Validators.required]),
      sector: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      municipality: new FormControl("", [Validators.required]),
      postal_code: new FormControl("", [Validators.required])
    })
  }

  addAddress(){
    const address = this.customerForm.get("addresses") as FormArray;
    address.push(this.createAddress());
  }

  deleteAddress(i: number){
    const address = this.customerForm.get("addresses") as FormArray;
    if(address.length > 1){
      address.removeAt(i);
    }
    else{
      address.reset();
    }
  }

  estiloInput(inputName: string): string{
    let resp = "";

    if(this.customerForm.get(inputName)?.invalid && this.customerForm.get(inputName)?.touched)
      resp ="red";
    else if(this.customerForm.get(inputName)?.valid && this.customerForm.get(inputName)?.touched) 
      resp = "green";
    else
      resp = "black";
    
    return resp;
  }

}
