export function createValueArrayFromProps<T extends object>(props: T) {
  const valuesArray: string[] = Object.values(props).filter(
    (value) => value !== undefined && value !== null,
  );

  return valuesArray;
}
