import { test, expect } from "@playwright/test";
import { createMachine } from "xstate";
import { createTestModel } from "@xstate/test";

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgGUAHMAYwDoAFAQxgAIAbLa3CfEIrWASwBdusGdgA9EAZgBs6AJ6IJABnIBOJfIAcEgOwAmJQFYlYlRORoQxMu049+gkYgCM2mYgC0T8vK-efPzadMgA */
  createMachine({
    initial: "Page loaded",
    states: {
      "Page loaded": {},
    },
    id: "Spec",
  });

const model = createTestModel(machine);

model.getPaths().forEach((path) => {
  test(path.description, async ({ page }) => {
    try {
      await page.goto("https://xstate.js.org/");

    await path.test({
      states: {
        "Page loaded": async () => {
          // 👇 Will throw an error, which will be logged without information about
          // the state in which it occured.
          await expect(page.locator('text="Invalid text"')).toBeVisible();
        },
      },
    });
    } catch (err) {
      // 👇 Uncomment to regenerate err.stack before throwing.
      // Error will include the message updated by @xstate/test,
      // but will lose the stack of the error itself.

      // delete err.stack

      throw err
    }
  });
});
