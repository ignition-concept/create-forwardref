import React from "react";
import PropTypes from "prop-types";

export { PropTypes };

/**
 * just hack around
 */
const override = <T>(item: any): T => item;

type Tag =
  | keyof React.JSX.IntrinsicElements
  | React.ForwardRefExoticComponent<any>
  | (new (props: any) => React.Component<any, {}, any>)
  | ((props: any, context?: any) => React.ReactNode);

interface Component<TPropTypes, TTag extends Tag> {
  propTypes?: TPropTypes;
  defaultProps?: PropTypes.InferProps<TPropTypes>;
  displayName?: string;
  tag: TTag;
}

export function createForwardRef<TTag extends Tag, TPropTypes>(
  component: Component<TPropTypes, TTag> | TTag,
  render: React.ForwardRefRenderFunction<
    React.ElementRef<TTag>,
    React.ComponentPropsWithoutRef<TTag> & PropTypes.InferProps<TPropTypes>
  >
) {
  const Forwarded = React.forwardRef(render);

  if (typeof component === "string") {
    Forwarded.displayName = component;

    return Forwarded;
  }

  if (typeof component === "function") {
    Forwarded.displayName = component.name;

    return Forwarded;
  }

  if (component.displayName) {
    Forwarded.displayName = component.displayName;
  }

  if (component.defaultProps) {
    Forwarded.defaultProps = override<typeof Forwarded.defaultProps>(
      component.defaultProps
    );
  }

  if (component.propTypes) {
    Forwarded.propTypes = override<typeof Forwarded.propTypes>(
      component.propTypes
    );
  }

  return Forwarded;
}

export default createForwardRef;
