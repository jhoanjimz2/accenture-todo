import { Component, OnInit }                                     from '@angular/core';

import {
  AlertController,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';

import { addOutline, closeOutline, createOutline, trashOutline } from 'ionicons/icons';
import { addIcons }                                              from 'ionicons';

import { Category }                                              from '../../models/category.model';
import { CategoryService }                                       from '../../services/category.service';
import { CategoryFormModalComponent }                            from '../category-form-modal/category-form-modal.component';

@Component({
  selector: 'app-category-manager-modal',
  standalone: true,
  templateUrl: './category-manager-modal.component.html',
  styleUrls: ['./category-manager-modal.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon
  ],
})
export class CategoryManagerModalComponent implements OnInit {

  constructor(
    public readonly categoryService: CategoryService,
    private readonly modalController: ModalController,
    private readonly alertController: AlertController,
  ) {

    addIcons({
      addOutline,
      closeOutline,
      createOutline,
      trashOutline,
    });

  }

  async ngOnInit(): Promise<void> {
    await this.categoryService.load();
  }

  async close(): Promise<void> {
    await this.modalController.dismiss();
  }

  async openForm(category?: Category): Promise<void> {

    const modal = await this.modalController.create({
      component: CategoryFormModalComponent,
      componentProps: {
        category,
      },
    });

    await modal.present();

  }

  async delete(category: Category): Promise<void> {

    const alert = await this.alertController.create({
      header: 'Eliminar categoría',
      message: `¿Desea eliminar "${category.name}"?`,
      buttons: [
        'Cancelar',
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.categoryService.delete(category.id);
          },
        },
      ],
    });

    await alert.present();

  }

}
