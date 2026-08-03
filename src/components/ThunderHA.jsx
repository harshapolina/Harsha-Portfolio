/**
 * Final HA — matched height, sharp lightning gap (lemon shows through).
 */
export default function ThunderHA({ className = "" }) {
  return (
    <svg
      viewBox="0 0 204 200"
      className={className}
      aria-hidden
      fill="currentColor"
      fillRule="evenodd"
    >
      {/* H — full height 0→200 */}
      <path d="
        M0 0
        H36 V76 H68 V0
        H100
        L130 46
        L102 54
        L136 108
        L104 116
        L122 200
        H68 V120 H36 V200 H0 Z
      " />
      {/* A — same height; bolt-cut left edge */}
      <path d="
        M110 0
        L140 46
        L112 54
        L146 108
        L114 116
        L132 200
        H204
        L162 0
        H110 Z
        M146 106
        H182
        L172 76
        H156 Z
      " />
    </svg>
  );
}
