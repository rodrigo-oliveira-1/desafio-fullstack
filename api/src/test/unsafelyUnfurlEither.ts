import { Either } from "@core/logic/Either";


export function unsafelyUnfurlEither<T, U>(either: Either<T, U>): U | never {
    if (either.isLeft()) {
      throw new Error('Either did not contain a value!');
    } else {
      return either.value;
    }
  }