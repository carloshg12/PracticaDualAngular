import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaService } from './Services/tarea.service';
import { Tarea } from './Interfaces/tarea';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  listaTareas: Tarea[] = [];
  formularioTarea: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService
  ) {
    this.formularioTarea = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  obtenerTareas() {
    this.tareaService.getList().subscribe({
      next: (result) => {
        this.listaTareas = result;
      },
      error: (err) => {
        // Manejar el error
      }
    });
  }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  agregarTarea() {
    if (this.formularioTarea.invalid) {
      return; // Si el formulario es inválido, no se agrega la tarea
    }

    const request: Tarea = {
      idTarea: 0,
      nombreTarea: this.formularioTarea.value.nombre
    };

    this.tareaService.add(request).subscribe({
      next: (result) => {
        this.listaTareas.push(result);
        this.formularioTarea.patchValue({ nombre: '' });
      },
      error: (err) => {
        // Manejar el error
      }
    });
  }

  eliminarTarea(tarea: Tarea) {
    this.tareaService.delete(tarea.idTarea).subscribe({
      next: (result) => {
        this.listaTareas = this.listaTareas.filter(item => item.idTarea !== tarea.idTarea);
      },
      error: (err) => {
        // Manejar el error
      }
    });
  }
}
