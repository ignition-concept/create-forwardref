# Create ForwardedRef

## Installation

```bash
# for npm
npm i @ignition-concept/create-forwardref

# for yarn
yarn add @ignition-concept/create-forwardref

# for pnpm
pnpm install @ignition-concept/create-forwardref
```

## Usage

```tsx
import {
  createForwardRef,
  PropTypes,
} from "@ignition-concept/create-forwardref";
import { useId } from "react";

function OtherComponent({ title }) {
  return <div>{title}</div>;
}

const Button = createForwardRef("button", function (props, ref) {
  return <button {...props} ref={ref} />;
});

const ExtendsOtherComponent = createForwardRef(
  OtherComponent,
  function ({ title }) {
    const id = useId();
    const $title = `${title}_id-${id}`;

    return <OtherComponent title={$title} />;
  }
);

const AdvancePropTypesButton = createForwardRef(
  {
    tag: "button",
    propTypes: {
      trigger: PropTypes.bool,
    },
    defaultProps: {
      trigger: false,
    },
    displayName: "TriggerButton",
  },
  function ({ trigger, ...props }, ref) {
    return (
      <button
        {...props}
        onClick={function (event) {
          if (trigger) {
            console.log("trigger has start");
          }
          props.onClick?.(event);
        }}
        ref={ref}
        data-trigger={trigger}
      />
    );
  }
);
```

## Features

- it can forward other component
- it has validation and its validate props by using `prop-types`
- it has already export what need to using with `react`

**Note**: if you using react@19 please using new react api.

**Note**: if you get message when you using pnpm:

> The inferred type of '(something)' cannot be named without a reference to '(location)'. This is likely not portable. A type annotation is necessary.

do this following:

1.  create `.npmrc` at root folder
2.  copy this `node-linker=hoisted` in rcfile
3.  and run `pnpm install` again and done.

**warn**: The Package Is Not For Using Outside of `Ignition-Concept` any change may not be notice.
