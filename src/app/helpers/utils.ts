import { Observable, defer, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

export const startBy = <T>(callback: () => void) => {
  return (source: Observable<T>): Observable<T> => defer(() => {
    callback();
    return source;
  });
}

export const indicate = <T>(indicator: Subject<boolean>) => {
  return (source: Observable<T>): Observable<T> => source.pipe(
    startBy(() => indicator.next(true)),
    finalize(() => indicator.next(false))
  )
}