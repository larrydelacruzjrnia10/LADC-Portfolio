function PortraitFrame({ src, alt, className = '', imageClassName = '' }) {
  return (
    <div className={`relative mx-auto aspect-[0.92] w-full max-w-[360px] ${className}`.trim()}>
      <div className="absolute inset-[8%] -z-20 rounded-full bg-brand-500/30 blur-[80px]" />
      <div className="absolute inset-[4%] -z-10 rounded-full bg-mint-500/20 blur-[90px]" />

      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand-400 via-brand-500 to-mint-500 opacity-95 portrait-hex shadow-[0_0_45px_rgba(34,211,238,0.38)]" />
      <div className="absolute inset-[8px] rounded-[1.7rem] bg-[#1f2634] portrait-hex" />

      <div className="absolute inset-[18px] overflow-hidden rounded-[1.45rem] bg-[#0f1723] portrait-hex">
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover object-center ${imageClassName}`.trim()}
        />
      </div>
    </div>
  );
}

export default PortraitFrame;
