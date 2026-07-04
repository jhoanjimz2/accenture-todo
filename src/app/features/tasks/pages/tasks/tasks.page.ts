import { Component, OnInit, signal, computed, ChangeDetectionStrategy }                from '@angular/core';
import { CommonModule }                                                                from '@angular/common';
import { FormsModule }                                                                 from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ModalController, IonButtons, IonIcon, IonFabButton, IonFab,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonItem} from '@ionic/angular/standalone';
import { CategoryManagerModalComponent }                                               from 'src/app/features/categories/components/category-manager-modal/category-manager-modal.component';
import { CategoryService }                                                             from '../../../categories/services/category.service';
import { TaskService }                                                                 from '../../services/task.service';
import { TaskFormModalComponent }                                                      from '../../components/task-form-modal/task-form-modal.component';
import { Task }                                                                        from '../../models/task.model';
import { TaskListComponent }                                                           from '../../components/task-list/task-list.component';
import { addIcons }                                                                    from 'ionicons';
import { addOutline, albumsOutline }                                                   from 'ionicons/icons';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [
    IonFab,
    IonFabButton,
    IonIcon,
    IonButtons,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    TaskListComponent,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    IonItem
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPage implements OnInit {
  readonly selectedCategoryId = signal<string | null>(null);
  readonly selectedStatus = signal<'ALL' | 'PENDING' | 'COMPLETED'>('ALL');

  constructor(
    private readonly modalController: ModalController,
    public readonly categoryService: CategoryService,
    public readonly taskService: TaskService
  ) {
    addIcons({
      addOutline,
      albumsOutline
    });
  }

  async ngOnInit(): Promise<void> {
    await this.categoryService.load();
    await this.taskService.load();
  }

  readonly filteredTasks = computed(() => {
    let tasks = [...this.taskService.tasks()];
    if (this.selectedCategoryId()) {
      tasks = tasks.filter(
        task => task.categoryId === this.selectedCategoryId()
      );
    }
    switch (this.selectedStatus()) {
      case 'PENDING':
        tasks = tasks.filter(task => !task.completed);
        break;
      case 'COMPLETED':
        tasks = tasks.filter(task => task.completed);
        break;
    }
    return tasks.sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    );
  });

  async openCategoryManager(): Promise<void> {
    const modal = await this.modalController.create({
      component: CategoryManagerModalComponent,
    });

    await modal.present();
  }

  async openTaskForm(): Promise<void> {
    const modal = await this.modalController.create({
      component: TaskFormModalComponent,
    });
    await modal.present();
  }

  async editTask(task: Task): Promise<void> {
    const modal = await this.modalController.create({
      component: TaskFormModalComponent,
      componentProps: {
        task,
      },
    });
    await modal.present();
  }
  async deleteTask(task: Task): Promise<void> {
    await this.taskService.delete(task.id);
  }
  onStatusChange(value: unknown): void {
    switch (value) {
      case 'PENDING':
      case 'COMPLETED':
      case 'ALL':
        this.selectedStatus.set(value);
        break;
      default:
        this.selectedStatus.set('ALL');
    }
  }

}
