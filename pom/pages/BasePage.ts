import {expect, Locator, Page} from "@playwright/test";


export abstract class BasePage {
    readonly todoInput: Locator
    readonly main: Locator


    protected constructor(page: Page) {
        this.todoInput = page.getByTestId('text-input')
        this.main = page.getByTestId('main');
    }

    async textFill(text:string): Promise<void> {
        await expect(this.todoInput).toBeVisible();
        await this.todoInput.fill(text);
        await this.todoInput.press('Enter');
    }

}
