import React from "react";

export * as PropType from "prop-types";

/**
 * @deprecated seem it has little functionality and not so convenient for using
 */
export function deprecate_createForwardRef<
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
    "this function soon maybe next minor version is going to remove around",
    "`0.2.0`",
    "and this creation is deprecated"
  );

  console.log(
    "this function is going to deleted soon i give you until Wednesday April 3 2024",
    "i will update to 0.2.0 any breaking changes i do not warrent by any means so i warn you from today"
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
  supressWarning?: boolean;
}

/**
 * @description
 *
 * still implement but i prefer you using the old one with caution
 */
export function staled__createForwardRef<
  TTag extends
    | keyof React.JSX.IntrinsicElements
    | React.ForwardRefExoticComponent<any>
    | React.ComponentType<any>,
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
  override: OverrideForwardRef<TSchema> = {}
) {
  const defaultOverride = {
    defaultProps: override.defaultProps ? { ...override.defaultProps } : {},
    propTypes: override.propTypes ? { ...override.propTypes } : {},
    supressWarning: override.supressWarning ?? true,
    displayName: override.displayName
      ? `_forwarded(${override.displayName})`
      : typeof tag === "string"
      ? `_forwarded(${tag})`
      : `_forwarded(${
          typeof tag.displayName === "undefined" ? tag.name : tag.displayName
        })`,
  };

  const Forwarded = React.forwardRef(render);

  Forwarded.displayName = defaultOverride.displayName;

  if (defaultOverride.defaultProps) {
    if (defaultOverride.supressWarning === false) {
      console.log(
        "Warn: for functional components please remove it from your component if you using class Component just ignore"
      );
    }

    Forwarded.defaultProps =
      defaultOverride.defaultProps as unknown as typeof Forwarded.defaultProps;
  }

  if (defaultOverride.propTypes) {
    Forwarded.propTypes = defaultOverride.propTypes;
  }

  return Forwarded;
}

export { deprecate_createForwardRef as createForwardRef };
