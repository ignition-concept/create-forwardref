import PropTypes from "prop-types";

/**
 * just hack around
 */
export const override = <T>(item: any): T => item;

/**
 * support tag can be forward
 */
export type AdvanceTag =
  | keyof React.JSX.IntrinsicElements
  | React.ForwardRefExoticComponent<any>
  | React.ComponentType<any>
  | (new (props: any) => React.Component<any, {}, any>)
  | ((props: any, context?: any) => React.ReactNode);

/**
 * an props validation in react
 */
export type AdvanceProps<
  TPropTypes extends object | undefined,
  TTag extends AdvanceTag,
  TExcludePropsTypes extends object | undefined,
  TExtendsProps extends object = {}
> = TPropTypes extends object
  ? TExcludePropsTypes extends object
    ? Omit<
        React.ComponentPropsWithoutRef<TTag>,
        | keyof PropTypes.InferProps<TPropTypes>
        | keyof PropTypes.InferProps<TExcludePropsTypes>
        | keyof TExcludePropsTypes
      > &
        PropTypes.InferProps<TPropTypes> &
        TExtendsProps
    : Omit<
        React.ComponentPropsWithoutRef<TTag>,
        keyof PropTypes.InferProps<TPropTypes> | keyof TExcludePropsTypes
      > &
        PropTypes.InferProps<TPropTypes> &
        TExtendsProps
  : React.ComponentPropsWithoutRef<TTag>;

/**
 * advance component tag
 */
export interface AdvanceComponent<
  TPropTypes extends object | undefined,
  TTag extends AdvanceTag,
  TExcludePropsTypes extends object | undefined
> {
  propTypes?: TPropTypes;
  defaultProps?: PropTypes.InferProps<TPropTypes>;
  displayName?: string;
  excludeProps?: TExcludePropsTypes;
  tag: TTag;
}
