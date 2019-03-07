/**
 * @license
 * Copyright © 2017-2019 Moov Corporation.  All rights reserved.
 */
/**
 * Returns `true` when the app is running in lighthouse, otherwise false.
 * Note that lighthouse cannot be accurately detected until the app's root component
 * mounts, so this function should be called in `componentDidMount`, and not during script
 * evaluation.
 */
export default function isLighthouse() {
  // Make sure we are on the client
  if (typeof window === 'undefined') return false;
  // Checks for renamed properties on the `window` scope that Lighthouse applies
  return !!(window.__nativeURL || window.__nativePromise || window.__nativeError);
}
