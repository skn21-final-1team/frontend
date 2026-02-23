import { cva } from 'class-variance-authority';

export const triggerButton = cva(
  'w-fit justify-start gap-2 px-3 py-2.5 h-auto text-base font-semibold text-primary bg-card hover:bg-accent/50 border-border shadow-sm'
);

export const dropdownContent = cva(
  'w-80'
);

export const dropdownLabel = cva(
  'font-semibold text-base py-2 flex justify-between items-center'
);

export const keySection = cva(
  'p-3.5 flex flex-col gap-3'
);

export const keyRow = cva(
  'flex items-center justify-between gap-2'
);

export const keyLabel = cva(
  'text-sm text-muted-foreground whitespace-nowrap'
);

export const generateButton = cva(
  'h-8 px-3.5 text-sm'
);

export const keyContainer = cva(
  'mt-2'
);

export const infoSection = cva(
  'p-3.5 bg-muted/20'
);

export const errorBox = cva(
  'rounded bg-destructive/10 p-2 text-sm text-destructive'
);
