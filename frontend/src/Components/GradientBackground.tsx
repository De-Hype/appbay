// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GradientBackground = ({ children }:any) => {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        background:"#5e5e5e",        
        backgroundClip: 'padding-box',
        position: 'relative',
        backdropFilter: 'blur(43px)',
        WebkitBackdropFilter: 'blur(43px)',
      }}
    >
     
      {children}
    </div>
  );
};
export default GradientBackground