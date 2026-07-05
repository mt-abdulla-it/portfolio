export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/50 py-8 relative">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple">AT.</span>
          <span>© 2026 Abdulla Thaslim. All rights reserved.</span>
        </div>
        <div>
          Full Stack Developer
        </div>
      </div>
    </footer>
  );
}
