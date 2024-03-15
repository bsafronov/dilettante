export {};

declare global {
  type ID = number;

  export type Result<
    FnType extends (...args: any) => any,
    IsNullable extends boolean = false
  > = IsNullable extends true
    ? Awaited<ReturnType<FnType>>
    : NonNullable<Awaited<ReturnType<FnType>>>;

  export type FindManyCommon = {
    page?: number;
    take?: number;
  };
}
