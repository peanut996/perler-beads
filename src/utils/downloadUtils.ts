/**
 * Download utilities for environment detection and data conversion
 */

export interface EnvironmentInfo {
  /** iOS Safari browser (not in WebView) */
  isIOSSafari: boolean;
  /** Running inside an App WebView */
  isWebView: boolean;
  /** Desktop browser */
  isDesktop: boolean;
  /** Mobile device (iOS or Android) */
  isMobile: boolean;
  /** Detected WebView app name */
  webViewApp?: 'wechat' | 'douyin' | 'xiaohongshu' | 'weibo' | 'qq' | 'unknown';
}

/**
 * Detect current browser environment
 */
export function detectEnvironment(): EnvironmentInfo {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      isIOSSafari: false,
      isWebView: false,
      isDesktop: true,
      isMobile: false,
    };
  }

  const ua = navigator.userAgent;

  // Mobile detection
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);

  // WebView detection patterns
  const webViewPatterns: Record<string, EnvironmentInfo['webViewApp']> = {
    MicroMessenger: 'wechat',
    BytedanceWebview: 'douyin',
    Aweme: 'douyin',
    xhsdiscover: 'xiaohongshu',
    discover: 'xiaohongshu',
    Weibo: 'weibo',
    QQ: 'qq',
  };

  let webViewApp: EnvironmentInfo['webViewApp'] | undefined;

  for (const [pattern, app] of Object.entries(webViewPatterns)) {
    if (ua.includes(pattern)) {
      webViewApp = app;
      break;
    }
  }

  // Generic WebView detection (for unknown apps)
  const isGenericWebView =
    !webViewApp &&
    isMobile &&
    (/\bwv\b/i.test(ua) || // Android WebView
      /WebView/i.test(ua) || // Generic WebView
      (isIOS && !/Safari/i.test(ua))); // iOS without Safari = WebView

  if (isGenericWebView) {
    webViewApp = 'unknown';
  }

  const isWebView = !!webViewApp;

  // iOS Safari detection (must be iOS, have Safari, and NOT be in any other browser or WebView)
  const isIOSSafari =
    isIOS &&
    /Safari/i.test(ua) &&
    !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua) && // Not Chrome/Firefox/Edge/Opera on iOS
    !isWebView;

  const isDesktop = !isMobile;

  return {
    isIOSSafari,
    isWebView,
    isDesktop,
    isMobile,
    webViewApp,
  };
}

/**
 * Get friendly name for WebView app
 */
export function getWebViewAppName(app?: EnvironmentInfo['webViewApp']): string {
  const names: Record<NonNullable<EnvironmentInfo['webViewApp']>, string> = {
    wechat: '微信',
    douyin: '抖音',
    xiaohongshu: '小红书',
    weibo: '微博',
    qq: 'QQ',
    unknown: '当前应用',
  };
  return app ? names[app] : '当前应用';
}
