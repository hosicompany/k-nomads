'use client';

import { useEffect } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  callback: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 입력 요소에서는 단축키 비활성화 (Esc는 예외)
      const target = event.target as HTMLElement;
      const isInputElement =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      for (const shortcut of shortcuts) {
        const keyMatches = event.key === shortcut.key;
        const ctrlMatches = shortcut.ctrlKey
          ? event.ctrlKey || event.metaKey
          : !event.ctrlKey && !event.metaKey;
        const shiftMatches = shortcut.shiftKey
          ? event.shiftKey
          : !event.shiftKey;

        if (keyMatches && ctrlMatches && shiftMatches) {
          // Esc는 입력 요소에서도 작동
          if (event.key === 'Escape' || !isInputElement) {
            if (shortcut.preventDefault) {
              event.preventDefault();
            }
            shortcut.callback(event);
            break;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
