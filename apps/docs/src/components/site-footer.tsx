import { Heart } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-border/70 bg-muted/20 border-t">
      <div className="text-muted-foreground mx-auto flex min-h-20 w-full max-w-7xl items-center justify-center gap-1.5 px-6 py-6 text-center text-sm">
        <span>Crafted with</span>
        <Heart aria-label="love" className="text-primary size-4 fill-current" strokeWidth={1.75} />
        <span>by</span>
        <a
          href="https://pompeitech.com"
          target="_blank"
          rel="noreferrer"
          className="text-foreground font-medium underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          PompeiTech
        </a>
      </div>
    </footer>
  )
}
