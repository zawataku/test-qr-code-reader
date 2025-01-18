"use client";

import React, { useRef, useState, useEffect, FC, useCallback } from 'react';
import jsQR from 'jsqr';

type Props = Record<string, never>;

const QrCodeScanner: FC<Props> = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isScanningRef = useRef(true);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const scanQrCode = useCallback(() => {
        if (!isScanningRef.current) return;

        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (canvas && video) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const qrCodeData = jsQR(imageData.data, imageData.width, imageData.height);

                if (qrCodeData) {
                    if (qrCodeData.data !== 'https://www.kanazawa-it.ac.jp/') {
                        setError('対応していないQRコードです');
                        setTimeout(scanQrCode, 100); // スキャンを再試行
                        return;
                    }
                    setError('');
                    setResult(qrCodeData.data);

                    // 成功メッセージを設定
                    setSuccessMessage('QRコードが正常にスキャンされました！');

                    // 成功メッセージ表示後、リダイレクト
                    setTimeout(() => {
                        window.location.href = qrCodeData.data;
                    }, 2000); // 2秒後にリダイレクト
                    return;
                }
                setTimeout(scanQrCode, 100); // スキャンを再試行
            }
        }
    }, []);

    useEffect(() => {
        const constraints = {
            video: {
                facingMode: 'environment',
                width: { ideal: 300 },
                height: { ideal: 300 },
            },
        };

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    scanQrCode(); // スキャンの開始
                }
            })
            .catch((err) => console.error('Failed to access the camera:', err));

        const currentVideoRef = videoRef.current;

        return () => {
            isScanningRef.current = false; // アンマウントされたらスキャンを終了
            if (currentVideoRef && currentVideoRef.srcObject) {
                const stream = currentVideoRef.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, [scanQrCode]); // scanQrCodeを依存関係として追加する

    return (
        <div>
            {!result && (
                <div className="flex justify-center">
                    <div className="relative h-[200px] w-[200px] ">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="absolute left-0 top-0 h-[200px] w-[200px]"
                        />
                        <canvas
                            ref={canvasRef}
                            width="200"
                            height="200"
                            className="absolute left-0 top-0"
                        />
                    </div>
                </div>
            )}
            {successMessage && (
                <div className="text-center text-green-500">
                    <p>{successMessage}</p>
                </div>
            )}
            {error && <p className="text-center text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default QrCodeScanner;
