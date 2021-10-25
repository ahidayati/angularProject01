import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  // example if we use a getter to repeat html
  // public get numSequence(): Array<string>{
  //     const arr: Array<string>= [];
  //     for(let i=0; i<10; i++) {
  //       arr.push('item'+i);
  //     }
  //     return arr;
  // }

}
