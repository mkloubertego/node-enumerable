/**
 * Describes a function that aggregates items to one value.
 *
 * @param {any} result The current result value.
 * @param {T} item The current item.
 * @param {IItemContext<T>} ctx The item context.
 *
 * @return {U} The new aggregated value.
 */
export declare type Aggregator<T, U> = (result: any, item: T, ctx: IItemContext<T>) => U;
/**
 * Describes an action.
 *
 * @param {T} item The underlying item.
 * @param {IItemContext<T>} ctx The context.
 */
export declare type Action<T> = (item: T, ctx: IItemContext<T>) => void;
/**
 * Describes a function for sorting elements.
 *
 * @param {T} x The current / left item.
 * @param {any} y The other / right item.
 *
 * @return {number} The sort value.
 */
export declare type Comparer<T> = (x: T, y: any) => number;
/**
 * Describes a predicate that checks for the equality of two items.
 *
 * @param {T} x The current / left item.
 * @param {any} y The other / right item.
 *
 * @return {boolean} Are equal or not.
 */
export declare type EqualityComparer<T> = (x: T, y: any) => boolean;
/**
 * Describes a key selector.
 *
 * @param {K} k The original key.
 * @param {T} item The current item.
 * @param {IItemContext<T>} ctx The item context.
 *
 * @return {U} The "new" key.
 */
export declare type KeySelector<K, T, U> = (key: K, item: T, ctx: IItemContext<T>) => U;
/**
 * Describes a selector that projects items to a list of new items.
 *
 * @param {T} item The underlying item.
 * @param {IItemContext<T>} ctx The context.
 *
 * @return {Sequence<U>} The new items.
 */
export declare type ManySelector<T, U> = (item: T, ctx: IItemContext<T>) => Sequence<U>;
/**
 * Describes a predicate.
 *
 * @param {T} item The underlying item.
 * @param {IItemContext<T>} ctx The context.
 *
 * @return {boolean} Item does match conditions or not.
 */
export declare type Predciate<T> = (item: T, ctx: IItemContext<T>) => boolean;
/**
 * Describes a selector.
 *
 * @param {T} item The underlying item.
 * @param {IItemContext<T>} ctx The context.
 *
 * @return {U} The new item.
 */
export declare type Selector<T, U> = (item: T, ctx: IItemContext<T>) => U;
/**
 * A sequence.
 */
export declare type Sequence<T> = ArrayLike<T> | Iterator<T>;
/**
 * Describes a function that "zips" two elements.
 *
 * @param {T} item1 The first item.
 * @param {U} item2 The second item.
 * @param {IItemContext<T>} ctx1 The context of item1.
 * @param {IItemContext<U>} ctx2 The context of item2.
 *
 * @return {V} The zipped value.
 */
export declare type Zipper<T, U, V> = (item1: T, item2: U, ctx1: IItemContext<T>, ctx2: IItemContext<U>) => V;
/**
 * Describes a sequence.
 */
export interface IEnumerable<T> extends Iterator<T> {
    /**
     * Aggregates all itms of the sequence to one item.
     *
     * @param {(result: any, item: T, ctx: IItemContext<T>) => U | string} The aggregator.
     * @param {V} [defaultValue] The value to return if sequence is empty.
     *
     * @return {U | V} The aggregated value or the default value.
     */
    aggregate<U, V>(aggregator: Aggregator<T, U> | string, defaultValue?: V): U | V;
    /**
     * Checks if ALL items do match a condition.
     *
     * @param {Predciate<T> | string} predicate The predicate to use.
     *
     * @return {boolean} All do match or not.
     */
    all(predicate: Predciate<T> | string): boolean;
    /**
     * Checks if ANY items do match a condition.
     *
     * @param {Predciate<T> | string} [predicate] The predicate to use.
     *                                            If not defined, the method checks if that sequence contains at least one item.
     *
     * @return {boolean} At least one does match or not.
     */
    any(predicate?: Predciate<T> | string): boolean;
    /**
     * Computes the average of that sequence.
     *
     * @param {U} [defaultValue] The custom value that is returned if sequence has no items.
     *
     * @return {number | U} The average of the sequence or the default value.
     */
    average<U>(defaultValue?: U): number | U;
    /**
     * Gets if the sequence can be resetted or not.
     */
    readonly canReset: boolean;
    /**
     * Casts the items of that sequence to a new type.
     *
     * @return {IEnumerable<U>} The new sequence.
     */
    cast<U>(): IEnumerable<U>;
    /**
     * Concats the items of that sequence with another.
     *
     * @param {Sequence<T>} other The other sequence.
     *
     * @return {IEnumerable<U>} The new sequence.
     */
    concat(other: Sequence<T>): IEnumerable<T>;
    /**
     * Joins the elements of that sequence to one string.
     *
     * @param {string} [defaultValue] The value to return if sequence is empty. Default: ''
     *
     * @return {string} The string.
     */
    concatToString(defaultValue?: string): string;
    /**
     * Checks if that sequence contains an item.
     *
     * @param {any} item The item to search for.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     *
     * @return {boolean} Does contain item or not.
     */
    contains(item: any, comparer?: EqualityComparer<T> | string | true): boolean;
    /**
     * Counts the elements of that sequence.
     *
     * @param {Predciate<T> | string} [predicate] The custom predicate to use.
     *
     * @return {Number} The number of elements.
     */
    count(predicate?: Predciate<T> | string): number;
    /**
     * Gets the current item / element.
     */
    readonly current: T;
    /**
     * Returns the elements of the sequence or a sequence with default values if the current sequence is empty.
     *
     * @param {T} ...args One or more element for a "default sequence",
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    defaultIfEmpty(...args: T[]): IEnumerable<T>;
    /**
     * Removes duplicates.
     *
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    distinct(comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /**
     * Iterates over the tems.
     *
     * @param {Action<T>} The action to invoke.
     */
    each(action: Action<T>): void;
    /**
     * Returns an element at a specific position.
     *
     * @param {number} index The zero based index.
     *
     * @return {T} The item.
     *
     * @throws Sequence has no matching item.
     */
    elementAt(index: number): T;
    /**
     * Tries to return an element at a specific position.
     *
     * @param {number} index The zero based index.
     * @param {U} [defaultValue] The value to return if no element has been found.
     *
     * @return {T | U} The item or the default value.
     *
     * @throws Sequence has no matching item.
     */
    elementAtOrDefault<U>(index: number, defaultValue?: U): T | U;
    /**
     * Produces the difference between that sequence and another.
     *
     * @param {Sequence<T>} other The items to except.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     *
     * {IEnumerable<T>} The new sequence.
     */
    except(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /**
     * Returns the first item of the sequence.
     *
     * @param {Predciate<T> | string} [predicate] The custom predicate to use.
     *
     * @return {T} The item.
     *
     * @throws Sequence has no matching item.
     */
    first(predicate?: Predciate<T> | string): T;
    /**
     * Tries to return the first item of the sequence.
     *
     * @param {Predciate<T> | string | U} [predicateOrDefaultValue] The custom predicate to use.
     *                                                              If there are less than 2 arguments and the first argument is NOT a function,
     *                                                              it is used as default value.
     *
     * @return {T | U} The item or the default value.
     */
    firstOrDefault<U>(predicateOrDefaultValue?: Predciate<T> | string | U, defaultValue?: U): T | U;
    /**
     * Alias for 'each()' method.
     */
    forEach(action: Action<T>): void;
    /**
     * Groups the elements of the sequence.
     *
     * @param {Selector<T, U> | string} keySelector The function that provides the key for an element.
     * @param {EqualityComparer<U> | string} [keyEqualityComparer] The optional equality comparer for the keys.
     *
     * @return {IEnumerable<IGrouping<T, U>>} The list of groupings.
     */
    groupBy<U>(keySelector: Selector<T, U> | string, keyEqualityComparer?: EqualityComparer<U> | string): IEnumerable<IGrouping<T, U>>;
    /**
     * Produces the set intersection of that sequence and another.
     *
     * @param {Sequence<T>} other The other sequence.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     *
     * {IEnumerable<T>} The new sequence.
     */
    intersect(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /**
     * Gets if the 'moveNext()' can be called or not.
     */
    readonly isValid: boolean;
    /**
     * Correlates the elements of that sequence and another based on matching keys.
     *
     * @param {Sequence<TInner>} inner The other sequence.
     * @param {Selector<T, TKey> | string} outerKeySelector The key selector for the items of that sequence.
     * @param {Selector<TInner, TKey> | string} innerKeySelector The key selector for the items of the other sequence.
     * @param {Zipper<T, TInner, TResult> | string} resultSelector 	The function that provides the result value for two matching elements.
     * @param {EqualityComparer<TKey> | string} [comparer] The custom key comparer.
     *
     * @return {IEnumerable<TResult>} The sequence with the joined items.
     */
    join<TInner, TKey, TResult>(inner: Sequence<TInner>, outerKeySelector: Selector<T, TKey> | string, innerKeySelector: Selector<TInner, TKey> | string, resultSelector: Zipper<T, TInner, TResult> | string, comparer?: EqualityComparer<TKey> | string): IEnumerable<TResult>;
    /**
     * Joins the elements of that sequence to one string.
     *
     * @param {string} separator The separator to use. Default: ''
     * @param {string} [defaultValue] The value to return if sequence is empty. Default: ''
     *
     * @return {string} The string.
     */
    joinToString(separator: string, defaultValue?: string): string;
    /**
     * Gets the current key.
     */
    readonly key: any;
    /**
     * Returns the last item of the sequence.
     *
     * @param {Predciate<T> | string} [predicate] The custom predicate to use.
     *
     * @return {T} The item.
     *
     * @throws Sequence has no matching item.
     */
    last(predicate?: Predciate<T> | string): T;
    /**
     * Tries to return the last item of the sequence.
     *
     * @param {Predciate<T> | string | U} [predicateOrDefaultValue] The custom predicate to use.
     *                                                              If there are less than 2 arguments and the first argument is NOT a function,
     *                                                              it is used as default value.
     *
     * @return {T | U} The item or the default value.
     */
    lastOrDefault<U>(predicateOrDefaultValue?: Predciate<T> | string | U, defaultValue?: U): T | U;
    /**
     * Returns the "biggest" item of that sequence.
     *
     * @param {V} [defaultValue] The value to return if sequence is empty.
     *
     * @return {U | V} The "biggest" value or the default value.
     */
    max<U>(defaultValue?: U): T | U;
    /**
     * Returns the "smallest" item of that sequence.
     *
     * @param {V} [defaultValue] The value to return if sequence is empty.
     *
     * @return {U | V} The "smallest" value or the default value.
     */
    min<U>(defaultValue?: U): T | U;
    /**
     * Moves to the next element.
     *
     * @return New element is available or not.
     */
    moveNext(): boolean;
    /**
     * Removes all non-empty items.
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    notEmpty(): IEnumerable<T>;
    /**
     * Sorts the elements of that sequence in ascending order by using the values itself as keys.
     *
     * @param {Comparer<T> | string} [comparer] The custom key comparer to use.
     *
     * @throws The comparer is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    order(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
    /**
     * Sorts the elements of that sequence in ascending order.
     *
     * @param {Selector<T, U> | string} selector The key selector.
     * @param {Comparer<U> | string} [comparer] The custom key comparer to use.
     *
     * @throws At least one argument is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    orderBy<U>(selector: Selector<T, U> | string, comparer?: Comparer<U> | string): IOrderedEnumerable<T>;
    /**
     * Sorts the elements of that sequence in descending order.
     *
     * @param {Selector<T, U> | string} selector The key selector.
     * @param {Comparer<U> | string} [comparer] The custom key comparer to use.
     *
     * @throws At least one argument is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    orderByDescending<U>(selector: Selector<T, U> | string, comparer?: Comparer<U> | string): IOrderedEnumerable<T>;
    /**
     * Sorts the elements of that sequence in descending order by using the values as keys.
     *
     * @param {Comparer<T> | string} [comparer] The custom key comparer to use.
     *
     * @throws The comparer is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    orderDescending(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
    /**
     * Resets the sequence.
     *
     * @chainable.
     */
    reset(): IEnumerable<T>;
    /**
     * Projects the items of that sequence to new items.
     *
     * @param {Selector<T, U> | string} The selector to use.
     *
     * @return {IEnumerable<U>} The new sequence.
     */
    select<U>(selector: Selector<T, U> | string): IEnumerable<U>;
    /**
     * Projects each item to a list of new items and flattens them to a new sequence.
     *
     * @param {ManySelector<T, U> | string} The selector to use.
     *
     * @return {IEnumerable<U>} The new sequence.
     */
    selectMany<U>(selector: ManySelector<T, U> | string): IEnumerable<U>;
    /**
     * Checks if that sequence has the same items as onther sequence.
     *
     * @param {Sequence<T>} other The other sequence.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     * @param {EqualityComparer<any> | string | true} [keyComparer] The custom key comparer to use.
     *                                                              If (true), the methods also checks for matching data type (=== operator).
     *
     * @return {boolean} Both sequences are the same or not.
     */
    sequenceEqual(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true, keyComparer?: EqualityComparer<any> | string | true): boolean;
    /**
     * Returns the one and only item of the sequence.
     *
     * @param {Predciate<T> | string} [predicate] The custom predicate to use.
     *
     * @return {T} The item.
     *
     * @throws No item found or sequence contains more than one machting element.
     */
    single(predicate?: Predciate<T> | string): T;
    /**
     * Tries to return the one and only item of the sequence.
     *
     * @param {Predciate<T> | string | U} [predicateOrDefaultValue] The custom predicate to use.
     *                                                              If there are less than 2 arguments and the first argument is NOT a function,
     *                                                              it is used as default value.
     *
     * @return {T | U} The item or the default value.
     *
     * @throws Sequence contains more than one machting element.
     */
    singleOrDefault<U>(predicateOrDefaultValue?: Predciate<T> | string | U, defaultValue?: U): T | U;
    /**
     * Skips a number of items.
     *
     * @param {number} cnt The number of items to skip.
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    skip(cnt: number): IEnumerable<T>;
    /**
     * Skips items while a condition matches.
     *
     * @param {Predciate<T> | string} predicate The predicate to use.
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    skipWhile(predicate: Predciate<T> | string): IEnumerable<T>;
    /**
     * Calculates the sum of all items.
     *
     * @param {U} [defaultValue] The custom value that is returned if sequence has no items.
     *
     * @return {number | U} The sum or the default value.
     */
    sum<U>(defaultValue?: U): number | U;
    /**
     * Takes a number of items.
     *
     * @param {number} cnt The number of items to take.
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    take(cnt: number): IEnumerable<T>;
    /**
     * Takes items while a condition matches.
     *
     * @param {Predciate<T> | string} predicate The predicate to use.
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    takeWhile(predicate: Predciate<T> | string): IEnumerable<T>;
    /**
     * Converts the items of that sequence to a new array.
     *
     * @param {KeySelector<any, T, number> | string} [keySelector] The custom index / key selector.
     *                                                             If (true), the value from 'key' property is used as index.
     *
     * @return {ArrayLike<T>} The new array.
     */
    toArray(keySelector?: KeySelector<any, T, number> | string | true): ArrayLike<T>;
    /**
     * Produces the set union of that sequence and another.
     *
     * @param {Sequence<T>} other The other sequence.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    union(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /**
     * Filters the items of that sequence.
     *
     * @param {Predciate<T> | string} predicate The predicate to use.
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    where(predicate: Predciate<T> | string): IEnumerable<T>;
    /**
     * Applies a specified function to the corresponding elements of that sequence and another,
     * producing a sequence of the results.
     *
     * @param {Sequence<T>} other The other sequence.
     * @param {Zipper<T, U>} zipper The selector for the combined result items of the elements of the two sequences.
     *
     * @return IEnumerable<U> The new sequence.
     */
    zip<U>(other: Sequence<T>, zipper: Zipper<T, T, U>): IEnumerable<U>;
}
/**
 * A grouping of items.
 */
export interface IGrouping<T, U> extends IEnumerable<T> {
    /**
     * Gets the value that represents the group.
     */
    readonly group: U;
}
/**
 * Describes the context of an item.
 */
export interface IItemContext<T> {
    /**
     * Cancel operation or not.
     */
    cancel: boolean;
    /**
     * Gets the current zero-based index.
     */
    readonly index: number;
    /**
     * Gets if the that item is the first one or not.
     */
    readonly isFirst: boolean;
    /**
     * Gets the item.
     */
    readonly item: T;
    /**
     * Gets the current key.
     */
    readonly key: any;
    /**
     * Gets or sets the value for the next item.
     */
    nextValue: any;
    /**
     * Gets the value of the previous item.
     */
    readonly previousValue: any;
    /**
     * Gets the underlying sequence.
     */
    readonly sequence: IEnumerable<T>;
    /**
     * Gets or sets the value for the current item and the upcoming ones.
     */
    value: any;
}
/**
 * Describes an ordered sequence.
 */
export interface IOrderedEnumerable<T> extends IEnumerable<T> {
    /**
     * Performs a subsequent ordering of the elements in that sequence in ascending order,
     * using the values itself as keys.
     *
     * @param {Comparer<T> | string} [comparer] The custom key comparer to use.
     *
     * @throws The comparer is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    then(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
    /**
     * Performs a subsequent ordering of the elements in that sequence in ascending order, according to a key.
     *
     * @param {Selector<T, U> | string} selector The key selector.
     * @param {Comparer<U> | string} [comparer] The custom comparer to use.
     *
     * @throws At least one argument is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    thenBy<U>(selector: Selector<T, U> | string, comparer?: Comparer<U> | string): IOrderedEnumerable<T>;
    /**
     * Performs a subsequent ordering of the elements in that sequence in descending order, according to a key.
     *
     * @param {Selector<T, U> | string} selector The key selector.
     * @param {Comparer<U> | string} [comparer] The custom comparer to use.
     *
     * @throws At least one argument is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    thenByDescending<U>(selector: Selector<T, U> | string, comparer?: Comparer<U> | string): IOrderedEnumerable<T>;
    /**
     * Performs a subsequent ordering of the elements in that sequence in descending order,
     * using the values as keys.
     *
     * @param {Comparer<T> | string} [comparer] The custom key comparer to use.
     *
     * @throws The comparer is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    thenDescending(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
}
/**
 * A basic sequence.
 */
export declare class Enumerable<T> implements IEnumerable<T> {
    /**
     * The current item
     */
    protected _current: IteratorResult<T>;
    /**
     * The current zero based index.
     */
    protected _index: number;
    /**
     * The underyling iterator.
     */
    protected _iterator: Iterator<T>;
    /**
     * Initializes a new instance of that class.
     *
     * @param {Iterator<T>} [iterator] The underyling iterator.
     */
    constructor(iterator?: Iterator<T>);
    /** @inheritdoc */
    aggregate<U, V>(aggregator: Aggregator<T, U> | string, defaultValue?: V): U | V;
    /** @inheritdoc */
    all(predicate: Predciate<T> | string): boolean;
    /** @inheritdoc */
    any(predicate?: Predciate<T> | string): boolean;
    /** @inheritdoc */
    average<U>(defaultValue?: U): number | U;
    /** @inheritdoc */
    readonly canReset: boolean;
    /** @inheritdoc */
    cast<U>(): IEnumerable<U>;
    /** @inheritdoc */
    concat(other: Sequence<T>): IEnumerable<T>;
    /** @inheritdoc */
    concatToString(defaultValue?: string): string;
    /**
     * The logic for the 'concat()' method.
     *
     * @param {Iterator<T>} other The other sequence.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected concatInner(other: Iterator<T>): Iterator<T>;
    /** @inheritdoc */
    contains(item: any, comparer?: EqualityComparer<T> | string | true): boolean;
    /** @inheritdoc */
    count(predicate?: Predciate<T> | string): number;
    /** @inheritdoc */
    readonly current: T;
    /** @inheritdoc */
    defaultIfEmpty(...args: T[]): IEnumerable<T>;
    /**
     * The logic for the 'defaultIfEmpty()' method.
     *
     * @param {T[]} args The arguments for the "default" sequence.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected defaultIfEmptyInner(args: T[]): Iterator<T>;
    /** @inheritdoc */
    distinct(comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /**
     * The logic for the 'distinct()' method.
     *
     * @param {EqualityComparer<T>} comparer The equality comparer.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected distinctInner(comparer: EqualityComparer<T>): Iterator<T>;
    /** @inheritdoc */
    each(action: Action<T>): void;
    /** @inheritdoc */
    elementAt(index: number): T;
    /** @inheritdoc */
    elementAtOrDefault<U>(index: number, defaultValue?: U): T | U;
    /** @inheritdoc */
    except(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /**
     * The logic for the 'except()' method.
     *
     * @param {ArrayLike<T>} itemsToExcept The items to except.
     * @param {EqualityComparer<T>} equalityComparer The equality comparer.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected exceptInner(itemsToExcept: ArrayLike<T>, equalityComparer: EqualityComparer<T>): Iterator<T>;
    /** @inheritdoc */
    first(predicate?: Predciate<T> | string): T;
    /** @inheritdoc */
    firstOrDefault<U>(predicateOrDefaultValue?: Predciate<T> | string | U, defaultValue?: U): T | U;
    /** @inheritdoc */
    forEach(action: Action<T>): void;
    /** @inheritdoc */
    groupBy<U>(keySelector: Selector<T, U> | string, keyEqualityComparer?: EqualityComparer<U> | string): IEnumerable<IGrouping<T, U>>;
    /** @inheritdoc */
    intersect(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /**
     * The logic for the 'intersect()' method.
     *
     * @param {T[]} other The other items.
     * @param {IEnumerable<T>} equalityComparer The equality comparer.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected intersectInner(other: IEnumerable<T>, equalityComparer: EqualityComparer<T>): Iterator<T>;
    /** @inheritdoc */
    readonly isValid: boolean;
    /** @inheritdoc */
    join<TInner, TKey, TResult>(inner: Sequence<TInner>, outerKeySelector: Selector<T, TKey> | string, innerKeySelector: Selector<TInner, TKey> | string, resultSelector: Zipper<T, TInner, TResult> | string, comparer?: EqualityComparer<TKey> | string): IEnumerable<TResult>;
    protected joinInner<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: Selector<T, TKey>, innerKeySelector: Selector<TInner, TKey>, resultSelector: Zipper<T, TInner, TResult>, keyEqualityComparer?: EqualityComparer<TKey>): Iterator<TResult>;
    /** @inheritdoc */
    joinToString(separator: string, defaultValue?: string): string;
    /** @inheritdoc */
    readonly key: number;
    /** @inheritdoc */
    last(predicate?: Predciate<T> | string): T;
    /** @inheritdoc */
    lastOrDefault<U>(predicateOrDefaultValue?: Predciate<T> | string | U, defaultValue?: U): T | U;
    /** @inheritdoc */
    max<U>(defaultValue?: U): T | U;
    /** @inheritdoc */
    min<U>(defaultValue?: U): T | U;
    /** @inheritdoc */
    moveNext(): boolean;
    /** @inheritdoc */
    next(): IteratorResult<T>;
    /** @inheritdoc */
    notEmpty(): IEnumerable<T>;
    /** @inheritdoc */
    order(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
    /** @inheritdoc */
    orderBy<U>(selector: Selector<T, U> | string, comparer?: Comparer<U> | string): IOrderedEnumerable<T>;
    /** @inheritdoc */
    orderByDescending<U>(selector: Selector<T, U> | string, comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
    /** @inheritdoc */
    orderDescending(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
    /** @inheritdoc */
    reset(): IEnumerable<T>;
    /** @inheritdoc */
    select<U>(selector: Selector<T, U> | string): IEnumerable<U>;
    /**
     * The logic for the 'select()' method.
     *
     * @param {Selector<T, U>} selector The selector.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected selectInner<U>(selector: Selector<T, U>): Iterator<U>;
    /** @inheritdoc */
    selectMany<U>(selector: ManySelector<T, U> | string): IEnumerable<U>;
    /**
     * The logic for the 'selectMany()' method.
     *
     * @param {ManySelector<T, U>} selector The selector.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected selectManyInner<U>(selector: ManySelector<T, U>): Iterator<U>;
    /** @inheritdoc */
    sequenceEqual(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true, keyComparer?: EqualityComparer<any> | string | true): boolean;
    /** @inheritdoc */
    single(predicate?: Predciate<T> | string): T;
    /** @inheritdoc */
    singleOrDefault<U>(predicateOrDefaultValue?: Predciate<T> | string | U, defaultValue?: U): T | U;
    /** @inheritdoc */
    skip(cnt: number): IEnumerable<T>;
    /** @inheritdoc */
    skipWhile(predicate: Predciate<T> | string): IEnumerable<T>;
    /**
     * The logic for the 'skipWhile()' method.
     *
     * @param {Predciate<T>} predicate The predicate.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected skipWhileInner(predicate: Predciate<T>): Iterator<T>;
    /** @inheritdoc */
    sum<U>(defaultValue?: U): number | U;
    /** @inheritdoc */
    take(cnt: number): IEnumerable<T>;
    /** @inheritdoc */
    takeWhile(predicate: Predciate<T> | string): IEnumerable<T>;
    /**
     * The logic for the 'skipWhile()' method.
     *
     * @param {Predciate<T>} predicate The predicate.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected takeWhileInner(predicate: Predciate<T>): Iterator<T>;
    /** @inheritdoc */
    toArray(keySelector?: KeySelector<number, T, number> | string | true): ArrayLike<T>;
    /** @inheritdoc */
    union(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /** @inheritdoc */
    where(predicate: Predciate<T> | string): IEnumerable<T>;
    /**
     * The logic for the 'where()' method.
     *
     * @param {Predciate<T>} predicate The predicate.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected whereInner(predicate: Predciate<T>): Iterator<T>;
    /** @inheritdoc */
    zip<U>(other: Sequence<T>, zipper: Zipper<T, T, U>): IEnumerable<U>;
    /**
     * The logic for the 'zip()' method.
     *
     * @param {Iterator<T>} other The other sequence.
     * @param {Zipper<T, U>} zipper The "zipper".
     *
     * @return {Iterator<U>} The iterator.
     */
    protected zipInner<U>(other: IEnumerable<T>, zipper: Zipper<T, T, U>): Iterator<U>;
}
/**
 * A sequence based on an "array like" object.
 */
export declare class ArrayEnumerable<T> extends Enumerable<T> {
    /**
     * The underlying "array".
     */
    protected _arr: ArrayLike<T>;
    /**
     * Initializes a new instance of that class.
     *
     * @param {ArrayLike<T>} [arr] The underlying "array".
     */
    constructor(arr?: ArrayLike<T>);
    /** @inheritdoc */
    readonly canReset: boolean;
    /** @inheritdoc */
    reset(): IEnumerable<T>;
}
/**
 * An ordered sequence.
 */
export declare class OrderedEnumerable<T, U> extends Enumerable<T> implements IOrderedEnumerable<T> {
    /**
     * Stores the array of items in original order.
     */
    protected readonly _ORIGINAL_ITEMS: T[];
    /**
     * Stores the comparer for the sort operation.
     */
    protected readonly _ORDER_COMPARER: Comparer<U>;
    /**
     * Stores the sort value selector.
     */
    protected readonly _ORDER_SELECTOR: Selector<T, U>;
    /**
     * Initializes a new instance of that class.
     *
     * @param {IEnumerable<T>} seq The source sequence.
     * @param {Selector<T, U> | string} selector The selector for the sort values.
     * @param {Comparer<U> | string} comparer The comparer to use.
     */
    constructor(seq: IEnumerable<T>, selector: Selector<T, U> | string, comparer: Comparer<U> | string);
    /**
     * Gets the comparer.
     */
    readonly comparer: Comparer<U>;
    /**
     * Gets the selector.
     */
    readonly selector: Selector<T, U>;
    /** @inheritdoc */
    then(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
    /** @inheritdoc */
    thenBy<V>(selector: Selector<T, V> | string, comparer?: Comparer<V> | string): IOrderedEnumerable<T>;
    /** @inheritdoc */
    thenByDescending<V>(selector: Selector<T, V> | string, comparer?: Comparer<V> | string): IOrderedEnumerable<T>;
    /** @inheritdoc */
    thenDescending(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
}
/**
 * A grouping of elements.
 */
export declare class Grouping<T, U> extends Enumerable<T> implements IGrouping<T, U> {
    /**
     * Stores the "group" value.
     */
    protected _group: U;
    /**
     * Initializes a new instance of that class.
     *
     * @param {U} grp The value that represents the group.
     * @param {IEnumerable<T>} seq The sequence with the elements.
     */
    constructor(grp: U, seq: IEnumerable<T>);
    /** @inheritdoc */
    readonly group: U;
}
/**
 * Returns a value as function.
 *
 * @param any v The value to convert. Can be a function or a string that is handled as lambda expression.
 * @param {Boolean} [throwException] Throw an exception if value is no valid function or not.
 *
 * @throws Value is no valid function / lambda expression.
 *
 * @return {Function} Value as function or (false) if value is invalid.
 *
 * @throws Input value is invalid.
 */
export declare function asFunc(v: any, throwException?: boolean): Function | boolean;
/**
 * Returns a value as "comparer".
 *
 * @param {any} [val] The input value.
 *
 * @return {Comparer<T>} The output value.
 *
 * @throw val is invalid.
 */
export declare function toComparerSafe<T>(val?: any): Comparer<T>;
/**
 * Returns a value as "equality comparer".
 *
 * @param {any} [val] The input value.
 *
 * @return {EqualityComparer<T>} The output value.
 *
 * @throw val is invalid.
 */
export declare function toEqualityComparerSafe<T>(val?: any): EqualityComparer<T>;
/**
 * Returns a value as "many item selector".
 *
 * @param {any} [val] The input value.
 *
 * @return {ManySelector<T, U>} The output value.
 *
 * @throw val is invalid.
 */
export declare function toManySelectorSafe<T, U>(val?: any): ManySelector<T, U>;
/**
 * Returns a value as "predicate".
 *
 * @param {any} [val] The input value.
 *
 * @return {Predciate<T>} The output value.
 *
 * @throw val is invalid.
 */
export declare function toPredicateSafe<T>(val?: any): Predciate<T>;
/**
 * Returns a value as "item selector".
 *
 * @param {any} [val] The input value.
 *
 * @return {Selector<T, U>} The output value.
 *
 * @throw val is invalid.
 */
export declare function toSelectorSafe<T, U>(val?: any): Selector<T, U>;
/**
 * Creates a new sequence.
 *
 * @param {ArrayLike<T> | Iterator} [items] The underlying items.
 *
 * @return {IEnumerable<T>} The new sequence.
 */
export declare function from<T>(items?: Sequence<T>): IEnumerable<T>;
