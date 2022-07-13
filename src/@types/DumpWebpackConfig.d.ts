declare module 'laravel-mix/src/components/DumpWebpackConfig' {
  import type Mix from 'laravel-mix';

  declare class DumpWebpackConfig {
    constructor(mix: Mix.Api): this;
    circularStringify: (config: Record<string, unknown>) => string;
  }

  export = DumpWebpackConfig;
}
