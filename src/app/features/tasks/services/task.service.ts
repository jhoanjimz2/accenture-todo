import { Injectable, signal } from '@angular/core';

import { StorageService }     from '../../../core/services/storage.service';
import { STORAGE_KEYS }       from '../../../core/constants/storage-keys';

import { Task }               from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  readonly tasks = signal<Task[]>([]);

  constructor(
    private readonly storageService: StorageService
  ) {}

  async load(): Promise<void> {
    const tasks = await this.storageService.get<Task[]>(
      STORAGE_KEYS.TASKS
    );

    this.tasks.set(tasks ?? []);
  }

  async add(task: Task): Promise<void> {
    this.tasks.update(tasks => [
      ...tasks,
      task,
    ]);

    await this.persist();
  }

  async update(task: Task): Promise<void> {
    this.tasks.update(tasks =>
      tasks.map(current =>
        current.id === task.id
          ? task
          : current
      )
    );

    await this.persist();
  }

  async delete(id: string): Promise<void> {
    this.tasks.update(tasks =>
      tasks.filter(task => task.id !== id)
    );

    await this.persist();
  }

  async toggleCompleted(id: string): Promise<void> {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );

    await this.persist();
  }

  private async persist(): Promise<void> {
    await this.storageService.set(
      STORAGE_KEYS.TASKS,
      this.tasks(),
    );
  }

}
