import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IonCheckbox,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel, IonChip } from '@ionic/angular/standalone';

import { addIcons }                                                        from 'ionicons';
import { createOutline, trashOutline }                                     from 'ionicons/icons';
import { Task }                                                            from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  imports: [
    IonChip,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonItemSliding,
    IonItemOptions,
    IonItemOption
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Input() categoryName = 'Sin categoría';
  @Output() toggleCompleted = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor() {
    addIcons({
      createOutline,
      trashOutline,
    });
  }

}
