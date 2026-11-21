import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";


export class FilterPage extends BasePage{
    readonly page: Page
    readonly main: Locator
    readonly todoItem: Locator
    readonly itemCountSpan: Locator
    readonly activateButtonOnFirstItem: Locator
    readonly allFilter:Locator
    readonly activeFilter:Locator
    readonly completedFilter:Locator
    readonly clearCompleted:Locator

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.main = page.getByTestId('main');
        this.todoItem = this.main.getByTestId('todo-item');
        this.itemCountSpan = page.locator('.todo-count');
        this.activateButtonOnFirstItem = this.todoItem.first().getByTestId('todo-item-toggle');
        this.allFilter = this.page.getByRole("link", {name: 'All'});
        this.activeFilter = this.page.getByRole("link", {name: 'Active'});
        this.completedFilter = this.page.getByRole("link", {name: 'Completed'});
        this.clearCompleted = page.locator('.clear-completed');
    }


    async itemIsVisible(): Promise<void> {
        let todoItemsAll: Promise<Locator[]> =this.todoItem.all()
        let item = this.main.getByTestId('todo-item');
        for(item of await todoItemsAll){
            await expect(item).toBeVisible();
        }
    }


    async itemNotVisible(): Promise<void> {
        await expect(this.todoItem).not.toBeVisible();
        await expect(this.itemCountSpan).not.toBeVisible();
    }

    async itemVisible(count: string): Promise<void> {
        await expect(this.itemCountSpan).toBeVisible();
        expect(await this.itemCountSpan.innerText()).toContain(count);
    }

    async todoItemCount(numberItemCountSpan: number, numberTodoItem:number): Promise<void> {
        expect(await this.todoItem.count()).toBe(numberTodoItem);
        expect(await this.itemCountSpan.innerText()).toContain(String(numberItemCountSpan));
    }

    async activateItem(numberItemCountSpan: number, numberTodoItem:number): Promise<void> {
        await this.activateButtonOnFirstItem.click();
        expect(await this.itemCountSpan.innerText()).toContain(String(numberItemCountSpan));
        expect(await this.todoItem.count()).toBe(numberTodoItem);
    }

    async clearItem(numberTodoItem:number): Promise<void> {
        await this.clearCompleted.click();
        expect(await this.todoItem.count()).toBe(numberTodoItem);
    }

    async activateItemFilter(numberItemCountSpan: number, numberTodoItem:number, text: string): Promise<void> {
        await this.activeFilter.click();
        await expect(this.todoItem).toBeVisible();
        expect(await this.todoItem.count()).toBe(numberTodoItem);
        expect(await this.itemCountSpan.innerText()).toContain(String(numberItemCountSpan));
        expect(await this.todoItem.innerText()).toBe(text);

    }

    async completedItemFilter(numberTodoItem:number, text: string): Promise<void> {
        await this.completedFilter.click();
        expect(await this.todoItem.count()).toBe(numberTodoItem);
        expect(await this.todoItem.innerText()).toBe(text);
    }
}
