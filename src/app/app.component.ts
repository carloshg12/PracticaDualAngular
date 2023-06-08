import { Component,OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators} from '@angular/forms';
import{TareaService} from './Services/tarea.service';
import { Tarea } from './Interfaces/tarea';
import { error } from 'console';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  listaTareas:Tarea[]=[];
  formularioTarea:FormGroup;

  constructor(
    private fb:FormBuilder,
    private tareaService:TareaService
    ){

      this.formularioTarea=this.fb.group({
        nombre:['',Validators.required]
    });
  }

  obtenerTareas(){
    this.tareaService.getList().subscribe({
      next:(result)=>{
        this.listaTareas=result;
      }
    });
  }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  agregarTarea(){
    const request:Tarea={
      idTarea:0,
      nombreTarea: this.formularioTarea.value.nombre
    }

    this.tareaService.add(request).subscribe({
      next:(result)=>{
        this.listaTareas.push(result);
        this.formularioTarea.patchValue({nombre:''});
      },error:(err)=>{}});
  }

  eliminarTarea(Tarea:Tarea){
    this.tareaService.delete(Tarea.idTarea).subscribe({
      next:(result)=>{
        const nuevaLista = this.listaTareas.filter( item => item.idTarea !== Tarea.idTarea);
        this.listaTareas = nuevaLista;
      },error:(err)=>{}});
  }
}
