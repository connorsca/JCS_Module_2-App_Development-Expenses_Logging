import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { ExpensesService } from '../expenses/expenses.service';
import { Expenses } from '../expenses/expenses.model';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
	loadedExpenses: Expenses[];
	private expensesSub: Subscription;
	totExpenses: number;

	constructor(private router: Router, private expensesService: ExpensesService) {}

	addExpense() {
		this.router.navigate(['add-expense']);
	}

	ngOnInit() {
		this.expensesSub = this.expensesService.expenses.subscribe(expenses => {
			this.loadedExpenses = expenses;
			this.totExpenses = 0.0;
			this.loadedExpenses.forEach(expense => {
				this.totExpenses += expense.amount;
			});
		});
	}

	ngOnDestroy() {
		if (this.expensesSub) {
			this.expensesSub.unsubscribe();
		}
	}

	onDelete(expenseId: string, slidingMenu: IonItemSliding) {
		slidingMenu.close();
		this.expensesService.deleteExpense(expenseId).subscribe();
	}
}