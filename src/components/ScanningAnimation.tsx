import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ScanningAnimation() {
  return (
    <div className="w-[400px] h-[400px]">
      {" "}
      {/* Customize the size */}
      <DotLottieReact
        src="https://lottie.host/93c6404a-8797-404c-93ed-474977d744be/YQGm05EYMB.lottie"
        loop
        autoplay
      />
    </div>
  );
}
