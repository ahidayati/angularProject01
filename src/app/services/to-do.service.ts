import { Injectable } from '@angular/core';
import {ToDo} from "../../models/todo";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

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
  //
  // constructor() { }

  private static STORAGE_KEY = '__TODO_LIST__';

  private todoListInternal: Array<ToDo>|null = null;

  constructor(

  ) { }

  public get toDoList(): Array<ToDo> {
    if (this.todoListInternal === null) {
      const todoListString = localStorage.getItem(ToDoService.STORAGE_KEY);

      if (todoListString === null) {
        this.todoListInternal = [];
      } else {
        this.todoListInternal = JSON.parse(todoListString);
      }
    }

    // Load from localStorage on first call.
    return this.todoListInternal ?? [];
  }

  public set toDoList(val: Array<ToDo>) {
    this.todoListInternal = val;

    localStorage.setItem(ToDoService.STORAGE_KEY, JSON.stringify(this.todoListInternal));
  }

}
