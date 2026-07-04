import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  IonList,
} from '@ionic/angular/standalone';

import { TaskItemComponent }                      from '../task-item/task-item.component';

import { Task }                                   from '../../models/task.model';
import { Category }                               from '../../../categories/models/category.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [
    IonList,
    TaskItemComponent,
  ],
})
export class TaskListComponent {
  @Input({ required: true }) tasks!: Task[];
  @Input({ required: true }) categories!: Category[];
  @Output() toggleCompleted = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  getCategoryName(categoryId: string | null): string {
    if (!categoryId) {
      return 'Sin categoría';
    }
    return this.categories.find(
      category => category.id === categoryId
    )?.name ?? 'Sin categoría';
  }

}
