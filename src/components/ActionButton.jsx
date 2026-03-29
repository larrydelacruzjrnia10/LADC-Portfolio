function ActionButton({ href, children, variant = 'primary', className = '', ...props }) {
  const baseClass = variant === 'secondary' ? 'button-secondary' : 'button-primary';

  return (
    <a className={`${baseClass} ${className}`.trim()} href={href} {...props}>
      {children}
    </a>
  );
}

export default ActionButton;
