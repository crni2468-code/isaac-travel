J3VzZSBjbGllbnQnCgppbXBvcnQgdHlwZSB7IENvbXBvbmVudFByb3BzLCBDU1NQcm9wZXJ0aWVzLCBNdXRhYmxlUmVmT2JqZWN0LCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCcKaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JwppbXBvcnQgeyB1c2VJblZpZXcgfSBmcm9tICcuLi91dGlscy91c2UtaW4tdmlldy50cycKaW1wb3J0IHsgY3ggfSBmcm9tICcuLi91dGlscy9jeC50cycKCi8qKgogKiBNZWRpYSDigJQgYSBwdXJlLXF1YW50YSBwcmVzZW50YXRpb25hbCBzdXJmYWNlIGZvciBpbWFnZXMgJiB2aWRlb3MgaGVsZCBhdCBhCiAqIGZpeGVkIGFzcGVjdCByYXRpby4gSXQgaXMgdGhlIGJ1aWxkaW5nIGJsb2NrIGZvciBtZWRpYSBncmlkcywgdmlkZW8gY2FyZHMsIGFuZAogKiBjb3ZlciB0aWxlczogYSBjbGlwcGVkIGBhc3BlY3QtcmF0aW8gYm94IHlvdSBmaWxsIHdpdGggYW4gSW1hZ2UvVmlkZW8uCiAqLwoKZXhwb3J0IHR5cGUgTWVkaWFSYXRpbyA9ICd square' | 'video' | 'portrait' | 'wide' | 'auto'
export type MediaFit = 'cover' | 'contain'
export type MediaRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type MediaOverlayPlacement = 'fill' | 'top' | 'bottom' | 'center'
const RATIO_CLASS = { square: 'aspect-square', video: 'aspect-video', portrait: 'q-media-portrait', wide: 'q-media-wide', auto: '' } satisfies Record<MediaRatio, string>
const FIT_CLASS = { cover: 'object-cover', contain: 'object-contain' } satisfies Record<MediaFit, string>
const ROUNDED_CLASS = { none: 'rounded-q-0', sm: 'rounded-q-150', md: 'rounded-q-300', lg: 'rounded-q-500', full: 'rounded-q-full' } satisfies Record<MediaRounded, string>
const OVERLAY_PLACEMENT_CLASS = { fill: 'q-media-overlay-fill', top: 'q-media-overlay-top', bottom: 'q-media-overlay-bottom', center: 'q-media-overlay-center' } satisfies Record<MediaOverlayPlacement, string>
export type MediaRootProps = Omit<ComponentProps<'div'>, 'children'> & { ratio?: MediaRatio | number; rounded?: MediaRounded; children?: ReactNode }
function Root({ ratio = 'video', rounded = 'md', className, style, children, ...props }: MediaRootProps) {
 const numeric = typeof ratio === 'number'
 return <div className={cx('q-media', numeric ? undefined : RATIO_CLASS[ratio], ROUNDED_CLASS[rounded], className)} style={numeric ? ({ '--q-media-ratio': ratio, ...style } as CSSProperties) : style} {...props}>{children}</div>
}
export type MediaImageProps = Omit<ComponentProps<'img'>, 'children'> & { fit?: MediaFit }
function Image({ fit = 'cover', loading = 'lazy', decoding = 'async', className, alt = '', ...props }: MediaImageProps) { return <img alt={alt} loading={loading} decoding={decoding} className={cx('q-media-fill', FIT_CLASS[fit], className)} {...props} /> }
export type MediaVideoProps = Omit<ComponentProps<'video'>, 'children'> & { fit?: MediaFit; autoPlayInView?: boolean; inViewThreshold?: number }
function Video({ fit = 'cover', autoPlayInView = false, inViewThreshold = 0.5, muted, playsInline, preload, className, ref: forwardedRef, ...props }: MediaVideoProps) {
 const { ref: inViewRef, inView } = useInView<HTMLVideoElement>({ threshold: inViewThreshold })
 const videoRef = useRef<HTMLVideoElement | null>(null)
 const setRef = useCallback((node: HTMLVideoElement | null) => { videoRef.current = node; inViewRef(node); if (typeof forwardedRef === 'function') forwardedRef(node); else if (forwardedRef != null) (forwardedRef as MutableRefObject<HTMLVideoElement | null>).current = node }, [inViewRef, forwardedRef])
 useEffect(() => { if (!autoPlayInView || !videoRef.current) return; if (inView) void videoRef.current.play().catch(() => {}); else videoRef.current.pause() }, [autoPlayInView, inView])
 return <video ref={autoPlayInView ? setRef : forwardedRef} className={cx('q-media-fill', FIT_CLASS[fit], className)} muted={autoPlayInView ? true : muted} playsInline={autoPlayInView ? true : playsInline} preload={preload ?? (autoPlayInView ? 'metadata' : undefined)} {...props} />
}
export type MediaFallbackProps = ComponentProps<'div'>
function Fallback({ className, ...props }: MediaFallbackProps) { return <div className={cx('q-media-fallback', className)} {...props} /> }
export type MediaOverlayProps = ComponentProps<'div'> & { placement?: MediaOverlayPlacement }
function Overlay({ placement = 'fill', className, ...props }: MediaOverlayProps) { return <div className={cx('q-media-overlay', OVERLAY_PLACEMENT_CLASS[placement], className)} {...props} /> }
export type MediaCaptionProps = ComponentProps<'div'>
function Caption({ className, ...props }: MediaCaptionProps) { return <div className={cx('q-media-caption', className)} {...props} /> }
export const Media = Object.assign(Root, { Root, Image, Video, Fallback, Overlay, Caption })
export function useMediaFallback() { const [failed, setFailed] = useState(false); return { failed, onError: () => setFailed(true), reset: () => setFailed(false) } }
