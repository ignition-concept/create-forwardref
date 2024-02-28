# React Event Composer

## Installation

```bash
# for npm
npm i ignitor.create-composed-event-handler

# for yarn
yarn add ignitor.create-composed-event-handler

# for pnpm
pnpm install ignitor.create-composed-event-handler
```

## Usage

```tsx
import { createComposedEventHandler } from "ignitor.create-composed-event-handler";

export default function MyButtonNeedMultipleFunctionHandler() {
  return (
    <button
      onClick={createComposedEventHandler(
        (_, next) => {
          console.log("my first function!!!!!!!!");

          next(["log", "hello am i too loud?"]);
          // next(["warn", "hello am i too loud?"]);
          // next(["info", "hello am i too loud?"]);
          // next(["error", "hello am i too loud?"]);
        },
        (event) => {
          console.log(event.target.tagName);
        }
      )}
    >
      My Button
    </button>
  );
}
```

## Features

- easy debug each function
- can be chain multiple function
- you can log when the current function end
