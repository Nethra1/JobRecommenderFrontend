import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TextBoxModel } from './textbox.model';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css']
})
export class TextboxComponent implements OnInit {
  @Input() textBox: TextBoxModel;
  @Output() valueChange: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  textChange(textValue){
    this.valueChange.emit(textValue);
  }

}
