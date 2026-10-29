const PhotoSlideshow = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background image layer placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 to-muted/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/75 to-background/80" />
    </div>
  );
};

export default PhotoSlideshow;
