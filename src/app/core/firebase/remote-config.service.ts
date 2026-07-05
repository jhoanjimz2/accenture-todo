import { Injectable, signal } from '@angular/core';

import {
  RemoteConfig,
  fetchAndActivate,
  getBoolean,
} from '@angular/fire/remote-config';

import { FEATURE_FLAGS } from '../constants/feature-flags';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {

  readonly loading = signal(true);

  readonly enableCategories = signal(true);

  constructor(
    private readonly remoteConfig: RemoteConfig,
  ) {}

  async load(): Promise<void> {

    try {

      this.remoteConfig.settings = {
        minimumFetchIntervalMillis: 0,
        fetchTimeoutMillis: 10000,
      };

      this.remoteConfig.defaultConfig = {
        [FEATURE_FLAGS.ENABLE_CATEGORIES]: true,
      };

      await fetchAndActivate(this.remoteConfig);

      this.enableCategories.set(
        getBoolean(
          this.remoteConfig,
          FEATURE_FLAGS.ENABLE_CATEGORIES,
        ),
      );

    } catch (error) {

      console.error('Error loading Remote Config', error);

    } finally {

      this.loading.set(false);

    }

  }

}
