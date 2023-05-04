import mitt  from 'mitt'
type Events = {
  updateTitle: string;
  bar?: number;
};

export const emitter = mitt<Events>()
