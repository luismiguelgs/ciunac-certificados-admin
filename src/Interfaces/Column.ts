interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'left' | 'right';
    format?: (value: number) => string;
  }
  