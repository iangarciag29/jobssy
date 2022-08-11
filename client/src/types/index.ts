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
  className?: string;
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
  USER_CREATED = "USER_CREATED",
  OFFERER_CREATED = "OFFERER_CREATED",
  STARTED = "STARTED",
  DENIED_BY_USER = "DENIED_BY_USER",
  DENIED_BY_OFFERER = "DENIED_BY_OFFERER",
  OFFERER_APPROVED = "OFFERER_APPROVED",
  USER_APPROVED = "USER_APPROVED",
  PENDING_START = "PENDING_START",
  USER_CHANGES = "USER_CHANGES",
  OFFERER_CHANGES = "OFFERER_CHANGES",
  WORKING = "WORKING",
  FINISHED = "FINISHED",
  CANCELLED = "CANCELLED",
}
