// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GradientBackground = ({ children }:any) => {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        background:"#5e5e5e",
        // background: 'radial-gradient(117.43% 146.46% at 42.15% -6.74%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)',
        
        backgroundClip: 'padding-box',
        position: 'relative',
        backdropFilter: 'blur(43px)',
        WebkitBackdropFilter: 'blur(43px)', // For Safari support
      }}
    >
     
      {children}
    </div>
  );
};
export default GradientBackground