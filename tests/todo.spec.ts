import { test, expect } from '@playwright/test';
import {FilterPage} from "../pom/pages/FilterPage";

test.describe("ToDo app tests", () => {
    let filterPage: FilterPage
    test.beforeEach(async ({ page }) => {
        filterPage = new FilterPage(page)
        await page.goto('/');


    })

    test('TL-19-1 Create one Todo item', async ({ page }) => {
        await filterPage.textFill('test todo item');
        await filterPage.itemIsVisible(1);
    });

    test('TL-19-2 Create two Todo items', async ({ page }) => {
        await filterPage.itemNotVisible();
        await filterPage.textFill('test todo item');
        await filterPage.textFill('test todo item 2');
        await filterPage.itemIsVisible(2);
        await filterPage.itemVisible(2);

    });

    test('TL-19-3 Create two Todo items -> activate 1 -> click "clear completed"', async ({ page }) => {
        await filterPage.itemNotVisible();
        await filterPage.textFill('test todo item 1');
        await filterPage.textFill('test todo item 2');
        await filterPage.todoItemCount(2, 2)
        await filterPage.completeItem(1, 2)
        await filterPage.clearItem(1)

    });

    test('TL-19-4 Create two Todo items -> set active filter -> activate 1 -> check 1 on completed filter', async ({ page }) => {
        await filterPage.itemNotVisible();
        await filterPage.textFill('activated');
        await filterPage.textFill('not activated')
        await filterPage.completeItem(1, 2);
        await filterPage.activateItemFilter(1, 1, 'not activated');
        await filterPage.completedItemFilter(1, 'activated')
    });

    test('TL-19-5 Create one Todo item -> activate it', async ({ page }) => {
        await filterPage.itemNotVisible();
        await filterPage.textFill('test todo item');
        await filterPage.completeItem(0, 1)

    });

    test('TL-19-6 Create one Todo item -> delete it', async ({ page }) => {
        await filterPage.itemNotVisible();
        await filterPage.textFill('test todo item');
        await filterPage.removeItem();
        await filterPage.itemNotVisible()

    });

    test('TL-19_7 Test All, active and completed filters', async ({page})=>{
        await filterPage.itemNotVisible();
        await filterPage.textFill('test todo item');
        await filterPage.textFill('test todo item 2');
        await filterPage.itemIsVisible(2);
        await filterPage.itemVisible(2);
        await filterPage.completeItem(1, 2)
        await filterPage.completedItemFilter(1, 'test todo item')
        await filterPage.activateItemFilter(1,1, 'test todo item 2')
        await filterPage.allItemsFilter(2)
        await filterPage.itemIsVisible(2)

    });
});


