import { ExoticComponent } from "react";

// TYPES

export type iRoute = {
  path: string;
  component: ExoticComponent;
};

export type iSidebarRoute = {
  path: string;
  display: string;
  enabled: boolean;
  icon: any;
};

export type ChildrenElement = {
  children: JSX.Element | JSX.Element[];
};

// ENUMS

export enum BTN_SIZE {
  LARGE,
  MEDIUM,
  SMALL,
  EXTRA_SMALL,
}
