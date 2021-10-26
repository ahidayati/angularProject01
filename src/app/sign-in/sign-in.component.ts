import { Component, OnInit } from '@angular/core';
import {ToDo} from "../../models/todo";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {





  public toDoList: Array<ToDo> = [
    {
      label: 'a',
      at: new Date(),
      finished: true,
    }, {
      label: 'b',
      at: new Date(),
      finished: true,
    }, {
      label: 'c',
      at: new Date(),
      finished: true,
    }, {
      label: 'd',
      at: new Date(),
      finished: true,
    }, {
      label: 'e',
      at: new Date(),
      finished: true,
    }
  ]

  public form = this.fb.array([
    this.fb.group({
      label: [''],
      at: [new Date()],
      finished: [false],
      }),
  ]);

  public constructor(
    private fb: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.form.setValue(this.toDoList);
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
