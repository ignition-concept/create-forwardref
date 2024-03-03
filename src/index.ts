import React from "react";

export * as PropType from "prop-types";

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
  console.log(
    "`exactName` argument soon maybe next minor version is going to remove around",
    "`0.2.0`"
  );

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

import PropType from "prop-types";

interface OverrideForwardRef<TSchema extends Record<never, never>> {
  propTypes?: TSchema;
  displayName?: string;
  /**
   * @danger for functional component users
   * @warning for class component users
   *
   * @see {@link https://github.com/facebook/react/pull/16210}
   */
  defaultProps?: PropType.InferProps<TSchema>;
}

/**
 * @description
 *
 * still implement but i prefer you using the old one with caution
 */
export function unsafe_createForwardRef<
  TTag extends
    | keyof React.JSX.IntrinsicElements
    | React.ForwardRefExoticComponent<any>
    | (new (props: any) => React.Component<any, {}, any>)
    | ((props: any, context?: any) => React.ReactNode),
  TSchema extends Record<never, never>
>(
  tag: TTag,
  render: React.ForwardRefRenderFunction<
    React.ElementRef<TTag>,
    Omit<
      React.ComponentPropsWithoutRef<TTag>,
      keyof PropType.InferProps<TSchema>
    > &
      PropType.InferProps<TSchema>
  >,
  override: OverrideForwardRef<TSchema>
) {
  const defaultOverride = {
    ...override,
    displayName: override.displayName
      ? override.displayName
      : `_forwarded(${tag})`,
  };

  const Forwarded = React.forwardRef(render);

  Forwarded.displayName = defaultOverride.displayName;

  if (defaultOverride.defaultProps) {
    console.log(
      "Warn: for functional components please remove it from your component if you using class Component just ignore"
    );

    Forwarded.defaultProps =
      defaultOverride.defaultProps as unknown as typeof Forwarded.defaultProps;
  }

  if (defaultOverride.propTypes) {
    Forwarded.propTypes = defaultOverride.propTypes;
  }

  return Forwarded;
}
