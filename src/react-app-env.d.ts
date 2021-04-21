/// <reference types="react-scripts" />

// FIXME: specify
declare type Component<P = any> = (props?: P) => import("react").ReactNode;

declare type Callback = () => void;

declare type Nullable<T> = T | null;
