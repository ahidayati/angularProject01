import { Component, OnInit } from '@angular/core';
import {ToDo} from "../../models/todo";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {formatDate} from "@angular/common";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {ToDoService} from "../services/to-do.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  // moved to service
  // public toDoList: Array<ToDo> = [
  //   {
  //     label: 'vvv',
  //     at: new Date(),
  //     finished: true,
  //   }, {
  //     label: 'www',
  //     at: new Date(),
  //     finished: false,
  //   }, {
  //     label: 'xxx',
  //     at: new Date(),
  //     finished: false,
  //   }, {
  //     label: 'yyy',
  //     at: new Date(),
  //     finished: true,
  //   }, {
  //     label: 'zzz',
  //     at: new Date(),
  //     finished: true,
  //   }
  // ]

  public form = this.fb.array([]);

  public constructor(
    private fb: FormBuilder,
    private toDoService: ToDoService,
  ) {
  }

  public get toDoList(): Array<ToDo> {
    return this.toDoService.toDoList;
  }

  public set toDoList(todoList: Array<ToDo>) {
    this.toDoService.toDoList = todoList;
  }

  public ngOnInit(): void {
    for (let i=0; i<this.toDoList.length; i++){
     this.addToDo()
    }
    const arrTemp = [];
    for(const todo of this.toDoList) {
      const formToDo = {
        label: todo.label,
        at: formatDate(todo.at, 'YYYY-MM-dd', 'en'),
        finished: todo.finished,
      };
      arrTemp.push(formToDo);
    }

    this.form.setValue(arrTemp);
    this.OnChanges();
  }

  OnChanges(): void{
    this.form.valueChanges.pipe(debounceTime(3000), distinctUntilChanged()).subscribe(value => {
      this.toDoList = this.form.value;
      // console.log(this.toDoList);
    })
  }

  public addToDo(): void{
    const d = new Date;
    d.setDate(d.getDate()+7);

    this.form.push(
      this.fb.group({
      label: [''],
      at: [formatDate(d, 'YYYY-MM-dd', 'en')],
      finished: [false],
    }))
  }

  public deleteToDo(num: number): void{
    this.form.removeAt(num);
  }

  public saveToDo(): void {
    this.toDoList = this.form.value;
    console.log(this.toDoList);
  }

  public getControl(formGroup: AbstractControl, key: string): FormControl
  {
    if (!(formGroup instanceof FormGroup)) {
      throw new Error('Form given as first argument is not an instance of FormGroup');
    }
    const fc = formGroup.get(key);
    if (!(fc instanceof FormControl)) {
      throw new Error('Form retrieve is not an instance of FormControl');
    }
    return fc;
  }


  // with a method that call a number as a parameter
  // numSequence(n: number): Array<number> {
  //   return Array(n);
  // }

  // example if we use a getter to repeat html
  // public get numSequence(): Array<string>{
  //     const arr: Array<string>= [];
  //     for(let i=0; i<10; i++) {
  //       arr.push('item'+i);
  //     }
  //     return arr;
  // }


}
