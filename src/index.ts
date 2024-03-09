import React from "react";

import type { InferProps } from "prop-types";
export * as PropType from "prop-types";

interface OverrideForwardRef<TSchema extends Record<never, never>> {
  propTypes?: TSchema;
  displayName?: string;
  /**
   * @danger for functional component users
   * @warning for class component users
   *
   * @see {@link https://github.com/facebook/react/pull/16210}
   */
  defaultProps?: InferProps<TSchema>;
  supressWarning?: boolean;
}

/**
 * @description
 *  **Note**: please use `ref` prop from component if you using react 19
 *
 * still implement but i prefer you using the old one with caution
 */
export function createForwardRef<
  TTag extends
    | keyof React.JSX.IntrinsicElements
    | React.ForwardRefExoticComponent<any>
    | React.ComponentType<any>,
  TSchema extends Record<never, never>
>(
  tag: TTag,
  render: React.ForwardRefRenderFunction<
    React.ElementRef<TTag>,
    Omit<React.ComponentPropsWithoutRef<TTag>, keyof InferProps<TSchema>> &
      InferProps<TSchema>
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
          typeof tag.displayName === "undefined"
            ? tag.name
            : tag.displayName.includes("_forwarded(")
            ? tag.displayName.replace(/^_forwarded\(/s, "").replace(/\)$/s, "")
            : tag.displayName
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
