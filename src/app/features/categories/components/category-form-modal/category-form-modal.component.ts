import { Component, Input, OnInit }             from '@angular/core';
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
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';

import { chevronBackOutline, checkmarkOutline } from 'ionicons/icons';
import { addIcons }                             from 'ionicons';

import { Category }                             from '../../models/category.model';
import { CategoryService }                      from '../../services/category.service';

@Component({
  selector: 'app-category-form-modal',
  standalone: true,
  templateUrl: './category-form-modal.component.html',
  styleUrls: ['./category-form-modal.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonInput,
    IonIcon,
    ReactiveFormsModule,
  ],
})
export class CategoryFormModalComponent implements OnInit {

  @Input() category?: Category;

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(30)],
    }),
    color: new FormControl('#3B82F6', {
      nonNullable: true,
    }),
  });

  constructor(
    private readonly modalController: ModalController,
    private readonly categoryService: CategoryService,
  ) {

    addIcons({
      chevronBackOutline,
      checkmarkOutline,
    });

  }

  ngOnInit(): void {

    if (!this.category) {
      return;
    }

    this.form.patchValue({
      name: this.category.name,
      color: this.category.color,
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

    const category: Category = {
      id: this.category?.id ?? crypto.randomUUID(),
      name: this.form.controls.name.value,
      color: this.form.controls.color.value,
    };

    if (this.category) {
      await this.categoryService.update(category);
    } else {
      await this.categoryService.add(category);
    }

    await this.modalController.dismiss();

  }

}
