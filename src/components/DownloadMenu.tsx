export default function DownloadMenu({ image }: any) {
  return (
    <div className="flex gap-2 mt-2">
      <a href={image.src.small} download>Small</a>
      <a href={image.src.medium} download>Medium</a>
      <a href={image.src.large} download>Large</a>
      <a href={image.src.original} download>Original</a>
    </div>
  );
}