import Image from "next/image";
import QRCodeReader from "@/components/QrCodeReader";

export default function Home() {
  return (
    <>
      <h1>QR Code Reader</h1>
      <QRCodeReader />
      <Image src="/qr-code.png" width={300} height={300} alt="QR Code" />
    </>
  );
}
