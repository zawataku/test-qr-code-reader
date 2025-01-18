"use client";

import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-scanner';

const QrCodeReader: React.FC = () => {
    const [data, setData] = useState<string>(''); // スキャン結果を格納するため、string型を指定
    const [isClient, setIsClient] = useState<boolean>(false); // クライアントサイドかどうかのフラグ

    useEffect(() => {
        setIsClient(true); // クライアントサイドで実行されていることを確認
    }, []);

    // スキャン時に呼ばれる関数
    const handleScan = (scanData: { text: string } | null) => {
        if (scanData) {
            setData(scanData.text); // scanDataがnullでない場合、stateにセット
        }
    };

    // エラー時に呼ばれる関数
    const handleError = (error: Error) => {
        console.error(error); // エラーをコンソールに表示
    };

    if (!isClient) {
        return <div>Loading...</div>; // クライアントサイドでない場合はローディング表示
    }

    return (
        <div>
            <h1>QR Code Scanner</h1>
            {/* QRコードスキャナーコンポーネント */}
            <QrReader
                delay={300} // スキャンの遅延時間設定（ミリ秒）
                style={{ width: '100%' }} // スキャナーのスタイル
                onError={handleError} // エラーハンドラ
                onScan={handleScan} // スキャン結果を受け取る関数
                constraints={{
                    video: {
                        facingMode: "environment", // 背面カメラを指定
                    },
                }}
            />
            <div>
                {/* スキャンしたデータが表示される部分 */}
                <p>{data ? `スキャン結果: ${data}` : 'QRコードをスキャンしてください'}</p>
            </div>
        </div>
    );
};

export default QrCodeReader;
