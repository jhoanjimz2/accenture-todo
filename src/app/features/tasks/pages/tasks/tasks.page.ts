import { Component, OnInit }                                                       from '@angular/core';
import { CommonModule }                                                            from '@angular/common';
import { FormsModule }                                                             from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { CategoryManagerModalComponent }                                           from 'src/app/features/categories/components/category-manager-modal/category-manager-modal.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton
  ]
})
export class TasksPage implements OnInit {

  constructor(
    private readonly modalController: ModalController
  ) {}

  ngOnInit() {
  }

  async openCategoryManager(): Promise<void> {
    const modal = await this.modalController.create({
      component: CategoryManagerModalComponent,
    });

    await modal.present();
  }
}
