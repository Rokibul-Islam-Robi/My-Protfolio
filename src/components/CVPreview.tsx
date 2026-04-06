import { cvLinks } from '../data/cv';

interface CVPreviewProps {
  type: 'cv' | 'resume';
  children: React.ReactNode;
}

const CVPreview = ({ type, children }: CVPreviewProps) => {
  const link = type === 'cv' ? cvLinks.cv : cvLinks.resume;
  const title = type === 'cv' ? 'Curriculum Vitae' : 'Resume';
  
  return (
    <div className="group relative">
      {children}
      
      {/* Preview Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
        <div className="glass-card p-4 rounded-lg shadow-lg border border-neon-blue/30 min-w-[300px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-neon-blue">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-text-primary font-semibold">{title}</h4>
              <p className="text-text-secondary text-xs">Click to view</p>
            </div>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-text-secondary">Format:</span>
              <span className="text-neon-blue">Google Docs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Access:</span>
              <span className="text-neon-green">Public</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Updated:</span>
              <span className="text-text-primary">Recent</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-glass-border/30">
            <p className="text-text-secondary text-xs">
              Professional {type === 'cv' ? 'curriculum vitae' : 'resume'} with detailed experience, skills, and achievements.
            </p>
          </div>
        </div>
        
        {/* Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-glass-border/30"></div>
        </div>
      </div>
    </div>
  );
};

export default CVPreview; 