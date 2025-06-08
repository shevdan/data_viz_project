import type { JSX } from 'react';

type RegionProps = {
  id: number;
  d: string;
  isSelected?: boolean;
  color?: string;
  name: string;
  onClick: (region: string) => void;
};

export function Region({
  id,
  d,
  isSelected,
  color,
  name,
  onClick,
}: RegionProps): JSX.Element {
  const handleClick = (): void => {
    onClick(name);
  };

  return (
    <path
      className="stroke-black stroke-opacity-50 cursor-pointer hover:opacity-80"
      strokeWidth={isSelected ? 2 : 0.5}
      id={id.toString()}
      fill={color || 'none'}
      d={d}
      onClick={handleClick}
    />
  );
}
