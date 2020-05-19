import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ExpensesService } from '../expenses/expenses.service';

@Component({
	selector: 'app-add-expense',
	templateUrl: './add-expense.page.html',
	styleUrls: ['./add-expense.page.scss']
})
export class AddExpensePage implements OnInit {
	form: FormGroup;

	constructor(private addExpensesService: ExpensesService, private router: Router) {}

	ngOnInit() {
		this.form = new FormGroup({
			image: new FormControl(null),
			dateOfExpense: new FormControl(null, {
				updateOn: 'blur',
				validators: [Validators.required]
			}),
			amount: new FormControl(null, {
				updateOn: 'blur',
				validators: [Validators.required, Validators.min(0.1)]
			})
		});
	}

	onAddExpense() {
		if (!this.form.valid || !this.form.get('image').value) {
			return;
		}
		this.addExpensesService.addExpense(
			this.form.value.image,
			this.form.value.dateOfExpense,
			+this.form.value.amount
		);
		this.form.reset();
		this.router.navigate(['/']);
	}

	onImagePicked(imageData: string) {
		this.form.patchValue({ image: imageData });
	}
}