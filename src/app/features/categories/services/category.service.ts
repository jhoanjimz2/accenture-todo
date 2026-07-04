import { Injectable, signal } from "@angular/core";

import { StorageService }     from "../../../core/services/storage.service";
import { STORAGE_KEYS }       from '../../../core/constants/storage-keys';

import { Category }           from "../models/category.model";

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  readonly categories = signal<Category[]>([]);

  constructor(
    private readonly storageService: StorageService
  ) {}

  async load(): Promise<void> {
    const categories = await this.storageService.get<Category[]>(
      STORAGE_KEYS.CATEGORIES
    );

    this.categories.set(categories ?? []);
  }

  async add(category: Category): Promise<void> {
    this.categories.update(categories => [
      ...categories,
      category,
    ]);

    await this.persist();
  }

  async update(category: Category): Promise<void> {
    this.categories.update(categories =>
      categories.map(current =>
        current.id === category.id
          ? category
          : current
      )
    );
    await this.persist();
  }

  async delete(id: string): Promise<void> {
    this.categories.update(categories =>
      categories.filter(category => category.id !== id)
    );
    await this.persist();
  }

  private async persist(): Promise<void> {
    await this.storageService.set(
      STORAGE_KEYS.CATEGORIES,
      this.categories(),
    );
  }

}
