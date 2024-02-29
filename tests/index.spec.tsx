import { createForwardRef } from "../src/index";

describe("test should works", () => {
  const ForwardedDiv = createForwardRef("div", (props, ref) => {
    return <div {...props} ref={ref} />;
  });

  const ForwardedComponent = createForwardRef(ForwardedDiv, (props, ref) => {
    return <ForwardedDiv {...props} ref={ref} />;
  });

  const ForwardedExactName = createForwardRef(
    ForwardedDiv,
    (props, ref) => {
      return <ForwardedDiv {...props} ref={ref} />;
    },
    "ExactName"
  );

  it("forwarded only jsx string tag", () => {
    expect(ForwardedDiv).toBeTruthy();
  });

  it("forwarded only jsx function tag", () => {
    expect(ForwardedComponent).toBeTruthy();
  });

  it("forwarded and pass name", () => {
    expect(ForwardedExactName).toBeTruthy();
    expect(ForwardedExactName.displayName).toBe("ExactName");
  });
});
