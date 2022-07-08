
interface IfProps {
  condition: boolean | any,
  children: JSX.Element[] | JSX.Element
}

export function If({ condition, children }: IfProps) {
  return condition ? <>{children}</> : null;
}

interface IfElseProps {
  condition: boolean | any,
  ifChildren: JSX.Element[] | JSX.Element,
  elseChildren: JSX.Element[] | JSX.Element
}

export function IfElse({ condition, ifChildren, elseChildren }: IfElseProps) {
  return condition ? <>{ifChildren}</> : <>{elseChildren}</>;
}
