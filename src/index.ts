import mix from 'laravel-mix';
import WebpackDomain from 'webpack';
import { Component } from 'laravel-mix/src/components/Component';
import DumpWebpackConfig from 'laravel-mix/src/components/DumpWebpackConfig';

const dumpWebpackConfigComponent = new DumpWebpackConfig(mix);

type WebpackConfigCallback = (
  webpackConfig: WebpackDomain.Configuration,
  stringify: DumpWebpackConfig['circularStringify'],
) => void;

class WebpackConfig extends Component {
  public name(): string[] {
    return ['getWebpackConfig', 'lwc', 'listenWebpackConfig'];
  }

  public register(callback: WebpackConfigCallback): void {
    this.context.listen(
      'configReadyForUser',
      (config: WebpackDomain.Configuration) => {
        callback(config, dumpWebpackConfigComponent.circularStringify);
      },
    );
  }
}

mix.extend('getWebpackConfig', WebpackConfig as any);
