import { ReactNode } from 'react';

interface BoxOptions {
  defaultPadding?: string;
  defaultMargin?: string;
}

export interface BoxProps {
  m?: number;
  mx?: number;
  my?: number;
  ml?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  p?: number;
  px?: number;
  py?: number;
  pl?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  gap?: number;
  gx?: number;
  gy?: number;
}

interface BoxComponentProps extends BoxProps {
  as?: keyof JSX.IntrinsicElements;
  options?: BoxOptions;
  children?: ReactNode;
  className?: string;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export function mapToClassName(boxProps: BoxProps, options: BoxOptions = {}) {
  const classes = [];

  const specificPadding = hasPadding(boxProps);
  const specificMargin = hasMargin(boxProps);

  // Apply default margin if no specific margin props are provided
  if (!specificMargin && options.defaultMargin) {
    classes.push(options.defaultMargin);
  }

  // Mapping for margins
  if (boxProps.m !== undefined) classes.push(`m-${boxProps.m}`);
  if (boxProps.mx !== undefined) classes.push(`mx-${boxProps.mx}`);
  if (boxProps.my !== undefined) classes.push(`my-${boxProps.my}`);
  if (boxProps.ml !== undefined) classes.push(`ml-${boxProps.ml}`);
  if (boxProps.mt !== undefined) classes.push(`mt-${boxProps.mt}`);
  if (boxProps.mr !== undefined) classes.push(`mr-${boxProps.mr}`);
  if (boxProps.mb !== undefined) classes.push(`mb-${boxProps.mb}`);

  // Apply default padding if no specific padding props are provided
  if (!specificPadding && options.defaultPadding) {
    classes.push(options.defaultPadding);
  }

  // Mapping for padding
  if (boxProps.p !== undefined) classes.push(`p-${boxProps.p}`);
  if (boxProps.px !== undefined) classes.push(`px-${boxProps.px}`);
  if (boxProps.py !== undefined) classes.push(`py-${boxProps.py}`);
  if (boxProps.pt !== undefined) classes.push(`pt-${boxProps.pt}`);
  if (boxProps.pr !== undefined) classes.push(`pr-${boxProps.pr}`);
  if (boxProps.pb !== undefined) classes.push(`pb-${boxProps.pb}`);
  if (boxProps.pl !== undefined) classes.push(`pl-${boxProps.pl}`);

  // Mapping for gap
  if (boxProps.gap !== undefined) classes.push(`gap-${boxProps.gap}`);
  if (boxProps.gx !== undefined) classes.push(`gap-x-${boxProps.gx}`);
  if (boxProps.gy !== undefined) classes.push(`gap-y-${boxProps.gy}`);

  return classes.join(' ');
}

export function hasPadding(boxProps: BoxProps): boolean {
  return (
    boxProps.p !== undefined ||
    boxProps.px !== undefined ||
    boxProps.py !== undefined ||
    boxProps.pl !== undefined ||
    boxProps.pt !== undefined ||
    boxProps.pr !== undefined ||
    boxProps.pb !== undefined
  );
}

export function hasMargin(boxProps: BoxProps): boolean {
  return (
    boxProps.m !== undefined ||
    boxProps.mx !== undefined ||
    boxProps.my !== undefined ||
    boxProps.ml !== undefined ||
    boxProps.mt !== undefined ||
    boxProps.mr !== undefined ||
    boxProps.mb !== undefined
  );
}

export const Box: React.FC<BoxComponentProps> = ({
  as: Component = 'div',
  className,
  options,
  ...props
}) => {
  className += mapToClassName(props, options);
  return <Component className={className} {...props} />;
};
