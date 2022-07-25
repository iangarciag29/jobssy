import { ExoticComponent, LazyExoticComponent } from "react";

// TYPES

export type iRoute = {
  path: string;
  component: ExoticComponent | LazyExoticComponent<any>;
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

export enum JOB_STATE {
  USER_CREATED,
  OFFERER_CREATED,
  STARTED,
  DENIED_BY_USER,
  DENIED_BY_OFFERER,
  OFFERER_APPROVED,
  USER_APPROVED,
  PENDING_START,
  USER_CHANGES,
  OFFERER_CHANGES,
}
