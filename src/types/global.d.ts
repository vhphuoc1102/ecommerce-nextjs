declare global {
  declare type Nullable<T> = T | null
  declare type Recordable<T = never, K = string> = Record<K extends null | undefined ? string : K, T>
}
