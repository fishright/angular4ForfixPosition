//  Created by xyx on 2018/6/16.
//  Copyright © 2018年 谢鑫. All rights reserved.
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss']
})
export class ModalComponentComponent implements OnInit {

  @Input()
  modal_info;
  // 发射隐藏modal的事件
  @Output()
  hide_emitter = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  // 关闭modal框的事件
  hideModal() {
    //将关闭modal的需求发射至父组件
    this.hide_emitter.emit(0);
  }
}
