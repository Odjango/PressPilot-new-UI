export function AmbientBackground() {
  return (
    <div className="ambient" aria-label="Ambient background" aria-hidden="true">
      <span className="ambient__haze" />
      <span className="ambient__plane ambient__plane--one" />
      <span className="ambient__plane ambient__plane--two" />
      <span className="ambient__star" />
      <span className="ambient__mask" />
    </div>
  );
}
