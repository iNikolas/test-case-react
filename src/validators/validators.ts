export function required(value: string) {
  return value ? undefined : "This field is required";
}

export function minLength(min: number) {
  return function (value: string) {
    value = value ?? "";
    return value.length > min
      ? undefined
      : `Min. length for this Field at least ${min} char.`;
  };
}
