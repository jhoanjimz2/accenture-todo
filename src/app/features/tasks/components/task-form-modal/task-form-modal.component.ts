import { ChangeDetectionStrategy, Component, Input, OnInit }             from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';

import { addIcons }                                                      from 'ionicons';
import { checkmarkOutline, chevronBackOutline }                          from 'ionicons/icons';

import { CategoryService }                                               from '../../../categories/services/category.service';
import { TaskService }                                                   from '../../services/task.service';

import { Task }                                                          from '../../models/task.model';

@Component({
  selector: 'app-task-form-modal',
  standalone: true,
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonItem,
    IonInput,
    IonTextarea,
    IonLabel,
    IonSelect,
    IonSelectOption,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormModalComponent implements OnInit {

  @Input() task?: Task;

  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(80),
      ],
    }),

    description: new FormControl('', {
      nonNullable: true,
    }),

    categoryId: new FormControl<string | null>(null),
  });

  constructor(
    private readonly modalController: ModalController,
    private readonly taskService: TaskService,
    public readonly categoryService: CategoryService,
  ) {
    addIcons({
      chevronBackOutline,
      checkmarkOutline,
    });
  }

  async ngOnInit(): Promise<void> {

    await this.categoryService.load();

    if (!this.task) {
      return;
    }

    this.form.patchValue({
      title: this.task.title,
      description: this.task.description ?? '',
      categoryId: this.task.categoryId,
    });

  }

  async close(): Promise<void> {
    await this.modalController.dismiss();
  }

  async save(): Promise<void> {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const now = new Date().toISOString();

    const task: Task = {
      id: this.task?.id ?? crypto.randomUUID(),
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      completed: this.task?.completed ?? false,
      categoryId: this.form.controls.categoryId.value,
      createdAt: this.task?.createdAt ?? now,
      updatedAt: now,
    };

    if (this.task) {
      await this.taskService.update(task);
    } else {
      await this.taskService.add(task);
    }

    await this.modalController.dismiss();
  }

}
