'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getWebViewAppName, EnvironmentInfo } from '../utils/downloadUtils';

interface WebViewDownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    webViewApp?: EnvironmentInfo['webViewApp'];
}

/**
 * Modal to guide users to open the page in a browser when in WebView
 */
export default function WebViewDownloadModal({
    isOpen,
    onClose,
    webViewApp,
}: WebViewDownloadModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => setMounted(true), 0);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    const appName = getWebViewAppName(webViewApp);

    // Button style - inherited from NeumorphicConfirmationModal
    const btnClass =
        'flex-1 flex items-center justify-center rounded-xl py-3 text-sm font-bold transition-all duration-300 ' +
        'bg-[#f8fafc] active:scale-95 text-indigo-600 hover:text-indigo-700 ' +
        'shadow-[6px_6px_12px_rgba(148,163,184,0.2),-6px_-6px_12px_rgba(255,255,255,0.9)] ' +
        'hover:shadow-[8px_8px_16px_rgba(148,163,184,0.25),-8px_-8px_16px_rgba(255,255,255,0.95)]';

    const content = (
        <div className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center bg-slate-200/20 p-4 backdrop-blur-[2px] transition-all duration-300">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Card - Neumorphic style */}
            <div
                className="animate-in zoom-in-95 relative w-full max-w-sm overflow-hidden rounded-[2rem] bg-[#f8fafc] p-6 text-center duration-200"
                style={{
                    boxShadow:
                        '20px 20px 60px rgba(148,163,184,0.2), -20px -20px 60px rgba(255,255,255,0.8)',
                }}
            >
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f8fafc] shadow-[inset_4px_4px_8px_rgba(148,163,184,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]">
                    <span className="text-4xl">🌐</span>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                    请在浏览器中打开
                </h3>

                {/* Content */}
                <div className="mb-8 px-2 text-sm leading-relaxed text-gray-500">
                    <p className="mb-3">
                        {appName}内无法直接保存图片，请按以下步骤操作：
                    </p>
                    <div className="mx-auto max-w-xs rounded-xl bg-gray-50 p-4 text-left shadow-[inset_2px_2px_4px_rgba(148,163,184,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                                1
                            </span>
                            <span>点击右上角 「···」 或 「分享」</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                                2
                            </span>
                            <span>选择「Safari 打开」或「浏览器打开」</span>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <div className="flex gap-4">
                    <button onClick={onClose} className={btnClass}>
                        我知道了
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(content, document.body);
}
