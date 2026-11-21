import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";


export class FilterPage extends BasePage{
    readonly page: Page
    readonly main: Locator
    readonly todoItem: Locator
    readonly itemCountSpan: Locator
    readonly completeButtonOnFirstItem: Locator
    readonly allFilter:Locator
    readonly activeFilter:Locator
    readonly completedFilter:Locator
    readonly clearCompleted:Locator
    readonly removeItemBtn: Locator

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.main = page.getByTestId('main');
        this.todoItem = this.main.getByTestId('todo-item');
        this.itemCountSpan = page.locator('.todo-count');
        this.completeButtonOnFirstItem = this.todoItem.first().getByTestId('todo-item-toggle');
        this.allFilter = this.page.getByRole("link", {name: 'All'});
        this.activeFilter = this.page.getByRole("link", {name: 'Active'});
        this.completedFilter = this.page.getByRole("link", {name: 'Completed'});
        this.clearCompleted = page.locator('.clear-completed');
        this.removeItemBtn = this.todoItem.getByTestId('todo-item-button');
    }


    async itemIsVisible(numberTodoItem: number): Promise<void> {
        await expect(this.todoItem).toHaveCount(numberTodoItem)

        if (numberTodoItem === 1) {
            await expect(this.todoItem).toBeVisible();
        }

        if (numberTodoItem > 1) {
            const todoItemsAll:Locator[]  = await this.todoItem.all();
            let item = this.main.getByTestId('todo-item');
            for (item of todoItemsAll) {
                await expect(item).toBeVisible();
            }
        }
    }


    async itemNotVisible(): Promise<void> {
        await expect(this.todoItem).not.toBeVisible();
        await expect(this.itemCountSpan).not.toBeVisible();
    }

    async itemVisible(numberItemCountSpan: number): Promise<void> {
        await expect(this.itemCountSpan).toBeVisible();
        expect(await this.itemCountSpan.innerText()).toContain(String(numberItemCountSpan));
    }

    async todoItemCount(numberItemCountSpan: number, numberTodoItem:number): Promise<void> {
        expect(await this.todoItem.count()).toBe(numberTodoItem);
        expect(await this.itemCountSpan.innerText()).toContain(String(numberItemCountSpan));
    }

    async completeItem(numberItemCountSpan: number, numberTodoItem:number): Promise<void> {
        await this.completeButtonOnFirstItem.click();
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

    async allItemsFilter(allItemsNumber: number):Promise<void> {
        await this.allFilter.click();
        expect(await this.todoItem.count()).toBe(allItemsNumber);
    }

    async removeItem(): Promise<void> {
        await this.todoItem.hover();
        await this.removeItemBtn.hover();
        await this.removeItemBtn.click();
    }
}
