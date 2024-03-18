import { createForwardRef, PropTypes } from "../src";
import { act, render, screen } from "@testing-library/react";

describe("that how the new implement", () => {
  const TEXT_CONTENT = "Hello World";

  const logger = vi
    .spyOn(console, "log")
    .mockImplementation((message, ...args) => undefined);

  afterEach(() => {
    logger.mockReset();
  });

  it("can be pass string tag", async () => {
    const Button = createForwardRef("button", (props, ref) => {
      return (
        <button
          {...props}
          onClick={(evt) => {
            console.log("hello world");
            props.onClick?.(evt);
          }}
          ref={ref}
        />
      );
    });

    render(<Button data-testid="button">{TEXT_CONTENT}</Button>);

    const button = await screen.findByTestId<HTMLButtonElement>("button");

    act(() => {
      button.click();
    });

    expect(logger).toHaveBeenCalledOnce();
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe(TEXT_CONTENT);
  });

  it("can be pass Function/Classes tag", async () => {
    const Test: React.ComponentType<{
      title: string;
      ref?: React.Ref<HTMLDivElement>;
    }> = ({ title, ref }) => {
      return (
        <h1 ref={ref} data-testid="h1">
          {title}
        </h1>
      );
    };

    const ForwardedTest = createForwardRef(Test, (props, ref) => {
      return <Test {...props} ref={ref} />;
    });

    render(<ForwardedTest title={TEXT_CONTENT} />);

    const h1 = await screen.findByTestId<HTMLHeadElement>("h1");

    expect(h1.textContent).toBe(TEXT_CONTENT);
  });

  it("can be pass advance option `prop-types`", async () => {
    const Button = createForwardRef(
      {
        tag: "button",
        propTypes: {
          trigger: PropTypes.bool.isRequired,
        },
      },
      ({ trigger, ...props }, ref) => {
        return (
          <button
            {...props}
            onClick={(evt) => {
              if (trigger) {
                console.log("hello world 2");
              }
              props.onClick?.(evt);
            }}
            ref={ref}
            data-trigger-element={trigger}
          />
        );
      }
    );

    render(
      <Button data-testid="button" trigger>
        {TEXT_CONTENT}
      </Button>
    );

    const button = await screen.findByTestId("button");

    act(() => {
      button.click();
    });

    expect(logger).toHaveBeenCalledOnce();
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe(TEXT_CONTENT);
    expect("propTypes" in Button).toBeTruthy();
    expect(Button.propTypes).toStrictEqual({
      trigger: PropTypes.bool.isRequired,
    });
  });

  it("can be pass advance option `displayName`", async () => {
    const Button = createForwardRef(
      {
        tag: "button",
        displayName: "ButtonNext",
      },
      (props, ref) => {
        return (
          <button
            {...props}
            onClick={(evt) => {
              console.log("hello world 3");
              props.onClick?.(evt);
            }}
            ref={ref}
          />
        );
      }
    );

    render(<Button data-testid="button">{TEXT_CONTENT}</Button>);

    const button = await screen.findByTestId("button");

    act(() => {
      button.click();
    });

    expect(logger).toHaveBeenCalledOnce();
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe(TEXT_CONTENT);
    expect("displayName" in Button).toBeTruthy();
    expect(Button.displayName).toBe("ButtonNext");
  });

  it("can be pass advance option `defaultProps`", async () => {
    const Button = createForwardRef(
      {
        tag: "button",
        propTypes: {
          trigger: PropTypes.bool,
        },
        defaultProps: {
          trigger: true,
        },
      },
      ({ trigger, ...props }, ref) => {
        return (
          <button
            {...props}
            onClick={(evt) => {
              if (trigger) {
                console.log("hello world 4");
              }
              props.onClick?.(evt);
            }}
            ref={ref}
          />
        );
      }
    );

    render(<Button data-testid="button">{TEXT_CONTENT}</Button>);

    const button = await screen.findByTestId("button");

    act(() => {
      button.click();
    });

    expect(logger).toHaveBeenCalledOnce();
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe(TEXT_CONTENT);
    expect("propTypes" in Button).toBeTruthy();
    expect(Button.propTypes).toStrictEqual({
      trigger: PropTypes.bool,
    });
    expect("defaultProps" in Button).toBeTruthy();
    expect(Button.defaultProps).toStrictEqual({
      trigger: true,
    });
  });

  it("can pass advance `excludeProps`", async () => {
    createForwardRef(
      {
        tag: "button",
        propTypes: {
          trigger: PropTypes.bool,
        },
        defaultProps: {
          trigger: true,
        },
        excludeProps: {
          onClick: PropTypes.func,
        },
      },
      ({ trigger, ...props }, ref) => {
        return (
          <button
            {...props}
            onClick={() => {
              if (trigger) {
                console.log("hello world 5");
              }
            }}
            ref={ref}
          />
        );
      }
    );

    console.log("this property just for types not for checking");
  });
});
