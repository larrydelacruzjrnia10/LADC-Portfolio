function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-3xl xl:max-w-4xl';

  return (
    <div className={alignment}>
      {eyebrow ? <span className="section-tag">{eyebrow}</span> : null}
      <h2 className="mt-5 font-display text-3xl leading-tight text-white sm:text-4xl lg:text-[2.85rem]">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{description}</p> : null}
    </div>
  );
}

export default SectionHeader;
