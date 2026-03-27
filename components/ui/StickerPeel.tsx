import Image from "next/image";
import { SCRIBBLES_FIRST_STICKER } from "@/lib/assets";

export default function StickerPeel() {
  return (
    <div style={{ width: 199, height: 63 }}>
      <Image
        src={SCRIBBLES_FIRST_STICKER}
        alt="#ScribbleFirst"
        width={199}
        height={63}
        unoptimized
      />
    </div>
  );
}
