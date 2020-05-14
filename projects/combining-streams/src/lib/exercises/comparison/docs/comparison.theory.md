# Combination Operators Comparison

As we did quite a lot od technical stuff it's time to relax and do some playful stuff.
Let's see how the combination operators compare to each other. :)
 
In this exercise we compare the different operators:
- `combineLatest`
- `combineLatestWith`
- `zip`
- `zipWith`
- `withLatestFrom`

We exclude `forkJoin` as we will process ongoing streams.

Also, the operators `zipAll` as well as `combineAll` are left out.
We will discuss `All` operators in a different chapter.

Let's take a closer look to the used RxJs functions.
We have 2 different types, operators and creators functions.

The operators of the listed functions always have the following signature:
`(Observable<T>) => (Observable<R>) => Observable<[T, R]>` 

In version 7 of RxJS there was a refactoring.

