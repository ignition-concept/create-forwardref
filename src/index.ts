import React from "react";

export function createForwardRef<
  TProps extends Record<never, never>,
  TTag extends
    | keyof React.JSX.IntrinsicElements
    | React.ForwardRefExoticComponent<any>
    | React.ComponentType<any>
>(
  tag: TTag,
  render: React.ForwardRefRenderFunction<
    React.ElementRef<TTag>,
    Omit<React.ComponentPropsWithoutRef<TTag>, keyof TProps> & TProps
  >,
  exactName: string | undefined = undefined
) {
  const Forwarded = React.forwardRef(render);

  if (exactName) {
    Forwarded.displayName = exactName;

    return Forwarded;
  }

  if (typeof tag === "function") {
    Forwarded.displayName = `ignitorForwardedComponent(${tag.displayName})`;

    return Forwarded;
  }

  Forwarded.displayName = `ignitorForwardedTag(${
    tag as keyof React.JSX.IntrinsicElements
  })`;

  return Forwarded;
}
