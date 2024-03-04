import { staled__createForwardRef, PropType } from "../src";
import { render } from "@testing-library/react";

describe("that how the new implement", () => {
  it("should using with only tag string", async () => {
    const Component = staled__createForwardRef("div", (props, ref) => {
      return <div {...props} ref={ref} data-testid="display" />;
    });

    const screen = render(<Component />);

    const display = await screen.findByTestId("display");

    expect(display).toBeTruthy();
    expect(display).toBeInTheDocument();
    expect(Component.displayName).toBe(`_forwarded(div)`);
    expect(Component.defaultProps).toStrictEqual({});
    expect(Component.propTypes).toStrictEqual({});
  });

  it("should using with only tag string and some custom props using propTypes", async () => {
    const Component = staled__createForwardRef(
      "div",
      ({ connection, ...props }, ref) => {
        return (
          <div
            {...props}
            ref={ref}
            data-connection={connection}
            data-testid="display"
          />
        );
      },
      {
        propTypes: {
          connection: PropType.string.isRequired,
        },
      }
    );

    const screen = render(<Component connection="http://localhost:12345" />);

    const display = await screen.findByTestId("display");

    expect(display).toBeTruthy();
    expect(display).toBeInTheDocument();
    expect(Component.displayName).toBe(`_forwarded(div)`);
    expect(Component.defaultProps).toStrictEqual({});
    expect(Component.propTypes).toStrictEqual({
      connection: PropType.string.isRequired,
    });
  });

  it("should using with only tag string and some custom props using propTypes and custom injection", async () => {
    const Component = staled__createForwardRef(
      "div",
      ({ connection, ...props }, ref) => {
        return (
          <div
            {...props}
            ref={ref}
            data-connection={connection}
            data-testid="display"
          />
        );
      },
      {
        propTypes: {
          connection: PropType.string,
        },
        defaultProps: {
          connection: "http://localhost:12345",
        },
      }
    );

    const screen = render(<Component connection="http://localhost:123456" />);

    const display = await screen.findByTestId("display");

    expect(display.dataset.connection).toBe("http://localhost:123456");
    expect(display).toBeTruthy();
    expect(display).toBeInTheDocument();
    expect(Component.displayName).toBe(`_forwarded(div)`);
    expect(Component.defaultProps).toStrictEqual({
      connection: "http://localhost:12345",
    });
    expect(Component.propTypes).toStrictEqual({
      connection: PropType.string,
    });
  });

  it("should using with only tag string and some custom props using propTypes and custom injection", async () => {
    const Component = staled__createForwardRef(
      "div",
      ({ connection, ...props }, ref) => {
        return (
          <div
            {...props}
            ref={ref}
            data-connection={connection}
            data-testid="display"
          />
        );
      },
      {
        propTypes: {
          connection: PropType.string,
        },
        defaultProps: {
          connection: "http://localhost:12345",
        },
        displayName: "Component",
      }
    );

    const screen = render(<Component connection="http://localhost:123456" />);

    const display = await screen.findByTestId("display");

    expect(display.dataset.connection).toBe("http://localhost:123456");
    expect(display).toBeTruthy();
    expect(display).toBeInTheDocument();
    expect(Component.displayName).toBe(`_forwarded(Component)`);
    expect(Component.defaultProps).toStrictEqual({
      connection: "http://localhost:12345",
    });
    expect(Component.propTypes).toStrictEqual({
      connection: PropType.string,
    });
  });

  it("should extract from other component", async () => {
    const BaseComponent: React.FC<React.ComponentPropsWithRef<"div">> = (
      props
    ) => {
      return <div {...props} />;
    };

    const Component = staled__createForwardRef(BaseComponent, (props, ref) => {
      return <BaseComponent {...props} ref={ref} data-testid="display" />;
    });

    const screen = render(<Component />);

    const display = await screen.findByTestId("display");

    expect(display).toBeTruthy();
    expect(display).toBeInTheDocument();
    expect(Component.displayName).toBe(`_forwarded(BaseComponent)`);
    expect(Component.defaultProps).toStrictEqual({});
    expect(Component.propTypes).toStrictEqual({});
  });

  it("should working with other forwarded ref", async () => {
    const BaseComponent = staled__createForwardRef(
      "div",
      (props, ref) => {
        return <div {...props} ref={ref} data-testid="display" />;
      },
      {
        displayName: "BaseComponent",
      }
    );

    const Component = staled__createForwardRef(BaseComponent, (props, ref) => {
      return <BaseComponent {...props} ref={ref} />;
    });

    const screen = render(<Component />);

    const display = await screen.findByTestId("display");

    expect(display).toBeTruthy();
    expect(display).toBeInTheDocument();
    expect(Component.displayName).toBe(`_forwarded(BaseComponent)`);
    expect(Component.defaultProps).toStrictEqual({});
    expect(Component.propTypes).toStrictEqual({});
  });
});
