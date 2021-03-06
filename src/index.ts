import mix from 'laravel-mix';
import type WebpackDomain from 'webpack';
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

  public mix() {
    const originalDumpRegistrationFunc =
      this.context.api.dumpWebpackConfig.bind(this.context.api);

    const dumpOverride: any = (callback: WebpackConfigCallback) => {
      originalDumpRegistrationFunc();
      if (callback) {
        this.register(callback);
      }
    };

    const overrideObj: Record<string, any> = {};

    dumpWebpackConfigComponent.name().forEach((name) => {
      overrideObj[name] = dumpOverride;
    });

    return overrideObj;
  }
}

mix.extend('getWebpackConfig', WebpackConfig as any);
