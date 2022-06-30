# xstate-test-playwright-error-repro

When using @xstate/test@alpha with Playwright, if assertion errors are thrown, additional information from @xstate/test won't be logged by Playwright (the state in which the assertion failed, the events sent before the error occurred, etc.).

[Open test file](./tests/fail.spec.ts)

## Printed logs

![Screenshot](./CleanShot%202022-07-01%20at%2011.30.26.png)

## Expected behavior

I would expect information about visited states and sent events to be shown on the logs.

## Research about the bug

As noted in Node.js documentation (https://nodejs.org/api/errors.html#errormessage):

> changing [error.message] after the Error object is created may not change the first line of the stack trace
> (for example, when error.stack is read before this property is changed)

It seems that Playwright reads `error.stack` before @xstate/test overrides `error.message`, which does not update `error.stack`.

## Setup

```sh
npm install

npx playwright test
```
