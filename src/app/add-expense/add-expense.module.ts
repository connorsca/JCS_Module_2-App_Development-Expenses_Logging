import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddExpensePage } from './add-expense.page';
import { ImagePickerComponent } from './image-picker/image-picker.component';

const routes: Routes = [
	{
		path: '',
		component: AddExpensePage
	}
];

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, IonicModule, RouterModule.forChild(routes)],
	exports: [ImagePickerComponent],
	declarations: [AddExpensePage, ImagePickerComponent]
})
export class AddExpensePageModule {}