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

export const Component = createForwardRef("div", (props, ref) => {
  return <div {...props} ref={ref} />;
});

export const ForwardedComponent = createForwardRef(Component, (props, ref) => {
  return <Component {...props} ref={ref} />;
});

// or you want exact name for component
export const ForwardedExactComponent = createForwardRef(
  Component,
  (props, ref) => {
    return <Component {...props} ref={ref} />;
  },
  {
    displayName: "YourExactNameGoesHere",
  }
);

// or you waant to extends props over the component
export const ForwardedComponentNext = createForwardRef(
  Component,
  ({ yourProps, ...props }, ref) => {
    const test = doingWithYourProps(yourProps); // something like that

    return <Component {...props} ref={ref} />;
  },
  {
    propTypes: {
      yourProps: PropTypes.bool,
    },
    displayName: "YourExactNameGoesHereNext",
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
