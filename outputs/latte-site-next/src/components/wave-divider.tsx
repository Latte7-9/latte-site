export default function WaveDivider({ flip = false, color = "text-[#e8e0d6]" }: { flip?: boolean; color?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}>
      <svg
        className="block h-5 w-full sm:h-7"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Main wave — 模仿奶泡的柔和曲线 */}
        <path
          d="M0 30 C 120 10, 240 50, 360 30 S 600 10, 720 30 S 960 50, 1080 30 S 1320 10, 1440 30 L 1440 60 L 0 60Z"
          className={`${color} fill-current opacity-40`}
        />
        {/* Secondary wave — 更浅的层次 */}
        <path
          d="M0 35 C 160 18, 320 52, 480 35 S 800 18, 960 35 S 1280 52, 1440 35 L 1440 60 L 0 60Z"
          className={`${color} fill-current opacity-20`}
        />
      </svg>
    </div>
  );
}