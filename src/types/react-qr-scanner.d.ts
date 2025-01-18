declare module 'react-qr-scanner' {
    import * as React from 'react';

    interface QrScannerProps {
        delay?: number;
        onScan: (data: { text: string } | null) => void;  // 型指定を明示
        onError: (error: Error) => void;
        style?: React.CSSProperties;
    }

    const QrScanner: React.FC<QrScannerProps>;
    export default QrScanner;
}
