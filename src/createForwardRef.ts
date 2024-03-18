import {
  forwardRef,
  type ElementRef,
  type ForwardRefRenderFunction,
} from "react";
import { AdvanceComponent, AdvanceProps, AdvanceTag, override } from "./utils";

export function createForwardRef<
  TTag extends AdvanceTag,
  TPropTypes extends object | undefined,
  TExcludePropsTypes extends object | undefined
>(
  component: AdvanceComponent<TPropTypes, TTag, TExcludePropsTypes> | TTag,
  render: ForwardRefRenderFunction<
    ElementRef<TTag>,
    AdvanceProps<TPropTypes, TTag, TExcludePropsTypes>
  >
) {
  const Forwarded = forwardRef<
    ElementRef<TTag>,
    AdvanceProps<TPropTypes, TTag, TExcludePropsTypes>
  >((props, ref) => {
    return render(props, ref);
  });

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
