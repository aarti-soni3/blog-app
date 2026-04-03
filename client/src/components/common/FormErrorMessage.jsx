export default function FormErrorMessage({ error }) {
  if (!error) return null;
  return <div className="invalid-feedback">{error.message}</div>;
}
